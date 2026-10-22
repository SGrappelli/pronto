/**
 * Pronto — read-only snapshot of Data API privileges in schema `public`.
 *
 * Writes one sorted, diff-friendly text line per fact about what the roles
 * anon / authenticated / service_role (and PUBLIC) can do with tables, views,
 * sequences and functions, plus schema ACL and default privileges. Run it
 * against two databases (or against one before/after a migration) and `diff`
 * the two files: an empty diff means identical privileges.
 *
 * Usage:
 *   DATABASE_URL=postgresql://... [MIGRATE_SSL=false] node scripts/db-grants-snapshot.js <out-file>
 *
 * Safe by construction: the whole run is one `BEGIN READ ONLY` transaction —
 * Postgres itself rejects any write. Needs no service key, only DATABASE_URL.
 *
 * Line formats (fields separated by " | "):
 *   OBJ  | <kind> | <schema.name(args)> | owner=<role> | ext=<bool>
 *   ACL  | <kind> | <schema.name(args)> | <grantee> | <PRIVILEGE> [WITH GRANT OPTION]
 *   COL  | <schema.table>.<column> | <grantee> | <PRIVILEGE>
 *   EFF  | <kind> | <schema.name(args)> | <role> | <PRIVILEGE>   (what the role can really do, incl. via PUBLIC)
 *   NSP  | public | <grantee> | <PRIVILEGE>
 *   DEF  | owner=<role> | schema=<schema|*> | objtype=<table|sequence|function|type|schema> | <grantee> | <PRIVILEGE>
 *   kind: r table, p partitioned table, v view, m matview, f foreign table, S sequence, fn function
 *
 * ACL lines come from the stored ACL, with `acldefault()` standing in when the
 * object has never been granted anything (NULL ACL = owner + PUBLIC EXECUTE
 * for functions).
 */

'use strict'

const { Client } = require('pg')
const fs = require('fs')
const path = require('path')

const ROLES = ['anon', 'authenticated', 'service_role']
const TABLE_PRIVS = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'REFERENCES', 'TRIGGER']
const SEQ_PRIVS = ['USAGE', 'SELECT', 'UPDATE']
const OBJTYPE = { r: 'table', S: 'sequence', f: 'function', T: 'type', n: 'schema' }

const GRANTEE = `CASE WHEN x.grantee = 0 THEN 'PUBLIC' ELSE pg_get_userbyid(x.grantee) END`
const EXT_REL = `EXISTS (SELECT 1 FROM pg_depend d WHERE d.classid = 'pg_class'::regclass AND d.objid = c.oid AND d.deptype = 'e')`
const EXT_FN = `EXISTS (SELECT 1 FROM pg_depend d WHERE d.classid = 'pg_proc'::regclass AND d.objid = p.oid AND d.deptype = 'e')`

async function main() {
  const out = process.argv[2]
  if (!out) {
    console.error('usage: node scripts/db-grants-snapshot.js <out-file>')
    process.exit(1)
  }
  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL is not set.')
    process.exit(1)
  }

  const sslDisabled = process.env.MIGRATE_SSL === 'false'
  const caPath = path.join(__dirname, '..', 'certs', 'supabase-ca.crt')
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: sslDisabled ? false : { rejectUnauthorized: true, ca: fs.readFileSync(caPath, 'utf8') },
  })
  await client.connect()

  const lines = []
  const q = async (sql, params) => (await client.query(sql, params)).rows
  const grant = (g) => `${g.privilege_type}${g.is_grantable ? ' WITH GRANT OPTION' : ''}`

  try {
    await client.query('BEGIN READ ONLY')

    // One set-based query per section: a remote round trip per object is far too slow.

    // ── Relations ────────────────────────────────────────────────────────
    for (const r of await q(`
      SELECT c.relkind, c.relname, pg_get_userbyid(c.relowner) AS owner, ${EXT_REL} AS ext
        FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
       WHERE n.nspname = 'public' AND c.relkind IN ('r','p','v','m','f','S')`)) {
      lines.push(`OBJ | ${r.relkind} | public.${r.relname} | owner=${r.owner} | ext=${r.ext}`)
    }

    for (const g of await q(`
      SELECT c.relkind, c.relname, ${GRANTEE} AS grantee, x.privilege_type, x.is_grantable
        FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace,
             LATERAL aclexplode(coalesce(c.relacl,
               acldefault((CASE WHEN c.relkind = 'S' THEN 's' ELSE 'r' END)::"char", c.relowner))) x
       WHERE n.nspname = 'public' AND c.relkind IN ('r','p','v','m','f','S')`)) {
      lines.push(`ACL | ${g.relkind} | public.${g.relname} | ${g.grantee} | ${grant(g)}`)
    }

    for (const e of await q(`
      SELECT c.relkind, c.relname, r.role, p.priv
        FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
        CROSS JOIN unnest($1::text[]) AS r(role)
        CROSS JOIN unnest($2::text[]) AS p(priv)
       WHERE n.nspname = 'public' AND c.relkind IN ('r','p','v','m','f') AND has_table_privilege(r.role, c.oid, p.priv)
      UNION ALL
      SELECT c.relkind, c.relname, r.role, p.priv
        FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
        CROSS JOIN unnest($1::text[]) AS r(role)
        CROSS JOIN unnest($3::text[]) AS p(priv)
       WHERE n.nspname = 'public' AND c.relkind = 'S' AND has_sequence_privilege(r.role, c.oid, p.priv)`,
    [ROLES, TABLE_PRIVS, SEQ_PRIVS])) {
      lines.push(`EFF | ${e.relkind} | public.${e.relname} | ${e.role} | ${e.priv}`)
    }

    // ── Column-level grants ──────────────────────────────────────────────
    for (const c of await q(`
      SELECT c.relname, a.attname, ${GRANTEE} AS grantee, x.privilege_type
        FROM pg_attribute a
        JOIN pg_class c ON c.oid = a.attrelid
        JOIN pg_namespace n ON n.oid = c.relnamespace,
             LATERAL aclexplode(a.attacl) x
       WHERE n.nspname = 'public' AND a.attacl IS NOT NULL AND NOT a.attisdropped`)) {
      lines.push(`COL | public.${c.relname}.${c.attname} | ${c.grantee} | ${c.privilege_type}`)
    }

    // ── Functions ────────────────────────────────────────────────────────
    for (const f of await q(`
      SELECT p.proname, pg_get_function_identity_arguments(p.oid) AS args,
             pg_get_userbyid(p.proowner) AS owner, ${EXT_FN} AS ext
        FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public'`)) {
      lines.push(`OBJ | fn | public.${f.proname}(${f.args}) | owner=${f.owner} | ext=${f.ext}`)
    }

    for (const g of await q(`
      SELECT p.proname, pg_get_function_identity_arguments(p.oid) AS args,
             ${GRANTEE} AS grantee, x.privilege_type, x.is_grantable
        FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace,
             LATERAL aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) x
       WHERE n.nspname = 'public'`)) {
      lines.push(`ACL | fn | public.${g.proname}(${g.args}) | ${g.grantee} | ${grant(g)}`)
    }

    for (const e of await q(`
      SELECT p.proname, pg_get_function_identity_arguments(p.oid) AS args, r.role
        FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
        CROSS JOIN unnest($1::text[]) AS r(role)
       WHERE n.nspname = 'public' AND has_function_privilege(r.role, p.oid, 'EXECUTE')`, [ROLES])) {
      lines.push(`EFF | fn | public.${e.proname}(${e.args}) | ${e.role} | EXECUTE`)
    }

    // ── Schema ACL ───────────────────────────────────────────────────────
    for (const n of await q(`
      SELECT ${GRANTEE} AS grantee, x.privilege_type
        FROM pg_namespace s, LATERAL aclexplode(coalesce(s.nspacl, acldefault('n', s.nspowner))) x
       WHERE s.nspname = 'public'`)) {
      lines.push(`NSP | public | ${n.grantee} | ${n.privilege_type}`)
    }

    // ── Default privileges (pg_default_acl) ──────────────────────────────
    for (const d of await q(`
      SELECT pg_get_userbyid(d.defaclrole) AS owner,
             coalesce(n.nspname, '*') AS schema,
             d.defaclobjtype AS objtype,
             ${GRANTEE} AS grantee,
             x.privilege_type
        FROM pg_default_acl d
        LEFT JOIN pg_namespace n ON n.oid = d.defaclnamespace,
             LATERAL aclexplode(d.defaclacl) x`)) {
      lines.push(`DEF | owner=${d.owner} | schema=${d.schema} | objtype=${OBJTYPE[d.objtype] || d.objtype} | ${d.grantee} | ${d.privilege_type}`)
    }

    await client.query('ROLLBACK')
  } finally {
    await client.end().catch(() => {})
  }

  lines.sort()
  fs.writeFileSync(out, lines.join('\n') + '\n')
  const count = (p) => lines.filter((l) => l.startsWith(p)).length
  console.log(`wrote ${lines.length} lines to ${out} (OBJ ${count('OBJ')}, ACL ${count('ACL')}, EFF ${count('EFF')}, COL ${count('COL')}, DEF ${count('DEF')}, NSP ${count('NSP')})`)
}

main().catch((err) => {
  console.error('Unexpected error:', err.message)
  process.exit(1)
})
