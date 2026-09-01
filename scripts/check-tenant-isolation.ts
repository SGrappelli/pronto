/**
 * The one check standing between forBusiness() and a barber seeing another
 * barber's clients. Run it after touching lib/db.ts or after converting query
 * call sites off Supabase:
 *
 *   npm run check:tenant
 *
 * Creates two throwaway businesses with one client each, then asserts business
 * A cannot read, update or delete anything belonging to business B.
 */
import assert from 'node:assert/strict'
import { db, forBusiness } from '../lib/db'

const suffix = Date.now()

async function main() {
  const owner = await db.users.create({ data: { email: `iso-${suffix}@test.local` } })

  const a = await db.businesses.create({
    data: { name: `iso-a-${suffix}`, slug: `iso-a-${suffix}`, owner_id: owner.id },
  })
  const b = await db.businesses.create({
    data: { name: `iso-b-${suffix}`, slug: `iso-b-${suffix}`, owner_id: owner.id },
  })

  // business_id is deliberately left out of these payloads: the point is to
  // prove forBusiness() stamps it on. Prisma's create type still demands it,
  // hence the cast — app code passes it explicitly instead.
  const create = (id: string, name: string) =>
    forBusiness(id).clients.create({ data: { name } as any })

  const clientA = await create(a.id, 'Client A')
  const clientB = await create(b.id, 'Client B')

  const dbA = forBusiness(a.id)

  // Reads never cross the boundary.
  const visible = await dbA.clients.findMany()
  assert.deepEqual(
    visible.map(c => c.id),
    [clientA.id],
    'forBusiness(A).findMany() returned rows outside business A',
  )

  // Not even by primary key.
  assert.equal(
    await dbA.clients.findUnique({ where: { id: clientB.id } }),
    null,
    'forBusiness(A) read business B\'s client by id',
  )
  assert.equal(await dbA.clients.count(), 1, 'count() ignored the tenant filter')

  // Writes cannot reach across either.
  assert.equal(
    (await dbA.clients.updateMany({ where: { id: clientB.id }, data: { name: 'hacked' } })).count,
    0,
    'forBusiness(A) updated business B\'s client',
  )
  assert.equal(
    (await dbA.clients.deleteMany({ where: { id: clientB.id } })).count,
    0,
    'forBusiness(A) deleted business B\'s client',
  )
  assert.equal(
    (await db.clients.findUnique({ where: { id: clientB.id } }))!.name,
    'Client B',
    'business B\'s client was modified',
  )

  // An explicit contradictory business_id is a bug, not a silent override.
  await assert.rejects(
    () => dbA.clients.findMany({ where: { business_id: b.id } }),
    /Cross-tenant query blocked/,
    'a contradictory business_id in the where clause was accepted',
  )
  await assert.rejects(
    () => dbA.clients.create({ data: { name: 'X', business_id: b.id } as any }),
    /Cross-tenant write blocked/,
    'a contradictory business_id in a create payload was accepted',
  )

  // Every model with a business_id column must be listed in TENANT_MODELS,
  // otherwise it silently escapes the guard.
  const scoped: string[] = []
  for (const [model, fields] of Object.entries(
    (db as any)._runtimeDataModel.models as Record<string, { fields: { name: string }[] }>,
  )) {
    if (fields.fields.some(f => f.name === 'business_id')) scoped.push(model)
  }
  for (const model of scoped) {
    const rows = await (forBusiness(a.id) as any)[model].findMany({ take: 1 })
    assert.ok(
      rows.every((r: any) => r.business_id === a.id),
      `model ${model} has a business_id column but is not covered by TENANT_MODELS in lib/db.ts`,
    )
  }

  await db.businesses.deleteMany({ where: { id: { in: [a.id, b.id] } } })
  await db.users.delete({ where: { id: owner.id } })

  console.log(`✓ tenant isolation holds (${scoped.length} scoped models checked)`)
}

main()
  .catch(err => {
    console.error('✗', err.message)
    process.exitCode = 1
  })
  .finally(() => db.$disconnect())
