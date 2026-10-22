/**
 * Data API privileges on a REAL, freshly migrated Postgres — what migration 037 promises.
 *
 * The expected matrix below is the reference, written out a second time on purpose (it is not read
 * from the migration), so a wrong edit to either one shows up as a difference. It was derived from
 * what the application does: see the header of supabase/migrations/037_data_api_grants.sql.
 *
 * Skipped unless DB_GRANTS_TEST_URL is set, e.g. for a local Supabase CLI stack:
 *   npx supabase start
 *   DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres MIGRATE_SSL=false node scripts/migrate.js
 *   DB_GRANTS_TEST_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres npm test
 * The URL must point at a loopback host (the idempotency check re-runs 037 inside a transaction that
 * is rolled back; nothing is ever committed), and the database must already be migrated.
 */

'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const URL_ = process.env.DB_GRANTS_TEST_URL
const skip = !URL_ ? 'set DB_GRANTS_TEST_URL to run against a local database' : false

const ROLES = ['anon', 'authenticated', 'service_role']
const TABLE_PRIVS = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'REFERENCES', 'TRIGGER']

// S select, I insert, U update, D delete — anything not listed (TRUNCATE, REFERENCES, TRIGGER, MAINTAIN) is NOT granted.
// Order of columns: anon, authenticated, service_role.
const TABLES = {
  appointments:        ['', 'SIUD', 'SIUD'],
  business_hours:      ['', 'SIU', 'SIUD'],
  businesses:          ['', 'SU', 'SIUD'],
  clients:             ['', 'SIUD', 'SIUD'],
  employees:           ['', 'SIUD', 'SIUD'],
  inventory_items:     ['', 'SIUD', 'SIUD'],
  inventory_movements: ['', 'SI', 'SIUD'],
  notification_log:    ['', '', 'SIUD'],
  schema_migrations:   ['', '', ''],
  services:            ['', 'SIUD', 'SIUD'],
  transactions:        ['', 'SIU', 'SIUD'],
}

// EXECUTE: anon, authenticated, service_role
const FUNCTIONS = {
  'check_slot_availability()':           [false, false, false],
  'get_booked_slots(uuid,date)':         [false, false, false],
  'get_booked_slots(uuid,date,uuid)':    [true, true, true],
  'get_tx_ids_by_item_name(uuid,text)':  [false, false, false],
  'my_business_ids()':                   [false, true, false],
  'set_receipt_number()':                [false, false, false],
  'set_updated_at()':                    [false, false, false],
  'update_client_stats()':               [false, false, false],
}

// nextval() needs USAGE; SELECT/UPDATE are not granted.
const SEQUENCES = { receipt_seq: [false, true, true] }

test('Data API privileges — live local Postgres', { skip }, async (t) => {
  const { Client } = require('pg')
  assert.match(URL_, /@(127\.0\.0\.1|localhost|\[::1\])[:/]/, 'refusing to run against a non-loopback DB_GRANTS_TEST_URL')
  const pg = new Client({ connectionString: URL_ })
  await pg.connect()
  t.after(() => pg.end())

  const q = async (sql, params) => (await pg.query(sql, params)).rows

  await t.test('every table in public (not owned by an extension) is in the reference and has Row Level Security on', async () => {
    const rows = await q(`SELECT c.relname, c.relrowsecurity AS rls
                            FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
                           WHERE n.nspname = 'public' AND c.relkind IN ('r', 'p')
                             AND NOT EXISTS (SELECT 1 FROM pg_depend d WHERE d.classid = 'pg_class'::regclass AND d.objid = c.oid AND d.deptype = 'e')
                           ORDER BY 1`)
    assert.deepEqual(rows.map((r) => r.relname), Object.keys(TABLES).sort(),
      'a table exists that is not in the reference (or the reference lists one that does not exist) — update both 037-style migration and this list')
    assert.deepEqual(rows.filter((r) => !r.rls).map((r) => r.relname), [])
  })

  await t.test('table privileges equal the reference, role by role', async () => {
    const diffs = []
    const letter = { SELECT: 'S', INSERT: 'I', UPDATE: 'U', DELETE: 'D' }
    for (const [table, profiles] of Object.entries(TABLES)) {
      for (let i = 0; i < ROLES.length; i++) {
        for (const priv of TABLE_PRIVS) {
          const [{ ok }] = await q('SELECT has_table_privilege($1, $2::regclass, $3) AS ok', [ROLES[i], `public.${table}`, priv])
          const want = priv in letter && profiles[i].includes(letter[priv])
          if (ok !== want) diffs.push(`${ROLES[i]} ${priv} ${table}: has ${ok}, reference ${want}`)
        }
      }
    }
    assert.deepEqual(diffs, [])
  })

  await t.test('function EXECUTE equals the reference, and every function in public (not owned by an extension) is listed', async () => {
    const listed = await q(`SELECT p.oid::regprocedure::text AS sig
                              FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
                             WHERE n.nspname = 'public'
                               AND NOT EXISTS (SELECT 1 FROM pg_depend d WHERE d.classid = 'pg_proc'::regclass AND d.objid = p.oid AND d.deptype = 'e')
                             ORDER BY 1`)
    // regprocedure prints "public.name(args)" only when public is not in the search_path
    const norm = (s) => s.replace(/^public\./, '')
    assert.deepEqual(listed.map((r) => norm(r.sig)).sort(), Object.keys(FUNCTIONS).sort())
    const diffs = []
    for (const [sig, want] of Object.entries(FUNCTIONS)) {
      for (let i = 0; i < ROLES.length; i++) {
        const [{ ok }] = await q('SELECT has_function_privilege($1, $2::regprocedure, $3) AS ok', [ROLES[i], `public.${sig}`, 'EXECUTE'])
        if (ok !== want[i]) diffs.push(`${ROLES[i]} EXECUTE ${sig}: has ${ok}, reference ${want[i]}`)
      }
    }
    assert.deepEqual(diffs, [])
  })

  await t.test('sequence privileges equal the reference', async () => {
    const diffs = []
    for (const [seq, want] of Object.entries(SEQUENCES)) {
      for (let i = 0; i < ROLES.length; i++) {
        for (const priv of ['USAGE', 'SELECT', 'UPDATE']) {
          const [{ ok }] = await q('SELECT has_sequence_privilege($1, $2::regclass, $3) AS ok', [ROLES[i], `public.${seq}`, priv])
          const wantPriv = priv === 'USAGE' && want[i]
          if (ok !== wantPriv) diffs.push(`${ROLES[i]} ${priv} ${seq}: has ${ok}, reference ${wantPriv}`)
        }
      }
    }
    assert.deepEqual(diffs, [])
  })

  await t.test('re-running 037 on the migrated database executes no GRANT or REVOKE', async () => {
    const sql = fs.readFileSync(path.join(__dirname, '..', 'supabase', 'migrations', '037_data_api_grants.sql'), 'utf8')
    const notices = []
    const onNotice = (n) => { if (n.message) notices.push(n.message) }
    pg.on('notice', onNotice)
    try {
      await pg.query('BEGIN')
      await pg.query(sql)
    } finally {
      await pg.query('ROLLBACK')
      pg.off('notice', onNotice)
    }
    assert.deepEqual(notices.filter((m) => m.startsWith('037_data_api_grants')), ['037_data_api_grants: 0 GRANT/REVOKE statement(s) executed'])
  })
})
