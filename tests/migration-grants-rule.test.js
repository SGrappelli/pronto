/**
 * The grants rule of CONTRIBUTING.md ("Database (Supabase + RLS)"), checked mechanically.
 *
 * Since 2026-10-30 Supabase no longer grants anon / authenticated / service_role anything on a new
 * object in `public`. So every migration that creates a table or view there must say, in the SAME
 * file, who may touch it and switch Row Level Security on:
 *
 *  - table  : ALTER TABLE ... ENABLE ROW LEVEL SECURITY and a GRANT naming the table;
 *  - view   : WITH (security_invoker = true) (a view runs with its owner's rights otherwise and
 *             walks around RLS) and a GRANT naming the view;
 *  - anon   : any GRANT to anon carries a `-- anon: <what the public page reads>` comment;
 *  - never  : ALTER DEFAULT PRIVILEGES ... GRANT (it would hand out privileges to objects that do not
 *             exist yet — exactly what the rule exists to stop).
 *
 * Migrations up to 037 predate the rule; 037_data_api_grants.sql brings them to the explicit list.
 * Run with: npm test   (node's built-in test runner, no extra dependency)
 */

'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const FIRST_CHECKED_MIGRATION = 38

function stripComments(sql) {
  return sql.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/--[^\n]*/g, ' ')
}

/** Problems a migration has against the rule; empty = fine. */
function grantsRuleProblems(sql) {
  const code = stripComments(sql)
  const problems = []
  const NAME = '(?:public\\.)?"?([a-z0-9_]+)"?'

  for (const m of code.matchAll(new RegExp(`create\\s+table\\s+(?:if\\s+not\\s+exists\\s+)?${NAME}`, 'gi'))) {
    const name = m[1]
    const rls = new RegExp(`alter\\s+table\\s+(?:only\\s+)?(?:public\\.)?"?${name}"?\\s+enable\\s+row\\s+level\\s+security`, 'i')
    const grant = new RegExp(`grant\\s+[^;]*\\bon\\s+(?:table\\s+)?(?:public\\.)?"?${name}"?\\b[^;]*\\bto\\b`, 'i')
    if (!rls.test(code)) problems.push(`table ${name}: no ALTER TABLE ... ENABLE ROW LEVEL SECURITY in the same file`)
    if (!grant.test(code)) problems.push(`table ${name}: no GRANT naming it in the same file`)
  }

  for (const m of code.matchAll(new RegExp(`create\\s+(?:or\\s+replace\\s+)?(?:materialized\\s+)?view\\s+${NAME}`, 'gi'))) {
    const name = m[1]
    const grant = new RegExp(`grant\\s+[^;]*\\bon\\s+(?:table\\s+)?(?:public\\.)?"?${name}"?\\b[^;]*\\bto\\b`, 'i')
    if (!grant.test(code)) problems.push(`view ${name}: no GRANT naming it in the same file`)
    if (!/security_invoker\s*=\s*(true|on)\b/i.test(code)) problems.push(`view ${name}: no security_invoker = true`)
  }

  if (/grant\s[^;]*\bto\b[^;]*\banon\b/i.test(code) && !/--\s*anon:\s*\S/i.test(sql)) {
    problems.push('GRANT to anon without a "-- anon: <what the public page reads>" comment')
  }
  if (/alter\s+default\s+privileges[^;]*\bgrant\b/i.test(code)) {
    problems.push('ALTER DEFAULT PRIVILEGES ... GRANT is not allowed (grant per object instead)')
  }
  return problems
}

test('grantsRuleProblems (the checker itself)', async (t) => {
  const GOOD = `
    create table public.widgets (id uuid primary key);
    alter table public.widgets enable row level security;
    grant select, insert, update, delete on table public.widgets to authenticated, service_role;
  `
  await t.test('accepts a table with RLS and an explicit grant', () => {
    assert.deepEqual(grantsRuleProblems(GOOD), [])
  })
  await t.test('accepts a service-role-only table with no anon', () => {
    assert.deepEqual(grantsRuleProblems(`
      create table if not exists widgets (id int);
      alter table widgets enable row level security;
      grant all on table widgets to service_role;
    `), [])
  })
  await t.test('flags a table without RLS', () => {
    assert.deepEqual(
      grantsRuleProblems('create table widgets (id int); grant all on table widgets to service_role;'),
      ['table widgets: no ALTER TABLE ... ENABLE ROW LEVEL SECURITY in the same file'],
    )
  })
  await t.test('flags a table without a grant', () => {
    assert.deepEqual(
      grantsRuleProblems('create table public.widgets (id int); alter table public.widgets enable row level security;'),
      ['table widgets: no GRANT naming it in the same file'],
    )
  })
  await t.test('does not count a commented-out grant or RLS statement', () => {
    const p = grantsRuleProblems(`
      create table widgets (id int);
      -- alter table widgets enable row level security;
      /* grant all on table widgets to service_role; */
    `)
    assert.equal(p.length, 2)
  })
  await t.test('does not accept a grant that names a different table', () => {
    assert.deepEqual(grantsRuleProblems(`
      create table widgets (id int);
      alter table widgets enable row level security;
      grant all on table gadgets to service_role;
    `), ['table widgets: no GRANT naming it in the same file'])
  })
  await t.test('requires security_invoker on a view and a grant', () => {
    assert.deepEqual(grantsRuleProblems('create view public.v as select 1;'), [
      'view v: no GRANT naming it in the same file',
      'view v: no security_invoker = true',
    ])
    assert.deepEqual(grantsRuleProblems(`
      create view public.v with (security_invoker = true) as select 1;
      grant select on public.v to authenticated;
    `), [])
  })
  await t.test('requires a reason comment for any grant to anon', () => {
    const bare = `${GOOD}\n grant select on table public.widgets to anon;`
    const msg = 'GRANT to anon without a "-- anon: <what the public page reads>" comment'
    assert.deepEqual(grantsRuleProblems(bare), [msg])
    assert.deepEqual(grantsRuleProblems(`${bare}\n -- anon: booking page lists widgets`), [])
    assert.equal(grantsRuleProblems(`${bare}\n -- anon:`).length, 1)
  })
  await t.test('forbids default privileges', () => {
    assert.ok(
      grantsRuleProblems('alter default privileges in schema public grant all on tables to anon;')
        .includes('ALTER DEFAULT PRIVILEGES ... GRANT is not allowed (grant per object instead)'),
    )
  })
})

const dir = path.join(__dirname, '..', 'supabase', 'migrations')

test(`migrations from ${FIRST_CHECKED_MIGRATION} on follow the grants rule`, async (t) => {
  assert.ok(fs.existsSync(dir), 'supabase/migrations exists')
  assert.ok(fs.existsSync(path.join(dir, '037_data_api_grants.sql')), '037_data_api_grants.sql is the baseline the rule builds on')

  const files = fs.readdirSync(dir)
    .filter((f) => f.endsWith('.sql') && parseInt(f, 10) >= FIRST_CHECKED_MIGRATION)
    .sort()
  for (const f of files) {
    await t.test(f, () => {
      assert.deepEqual(grantsRuleProblems(fs.readFileSync(path.join(dir, f), 'utf8')), [])
    })
  }
})
