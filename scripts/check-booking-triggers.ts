/**
 * The booking route decides between "slot taken" (409) and "booking failed"
 * (500) by matching on the error message a database trigger raises. That is a
 * string match across a layer boundary, so it needs a check:
 *
 *   npm run check:booking
 *
 * Migrations 017/032 raise `slot_already_booked` on a double booking and 034
 * raises `no_staff_available` when nobody can take it. Prisma surfaces both as
 * a thrown PostgresError with code P0001 and the trigger's text in `message`,
 * which is what app/api/book/route.ts greps for.
 */
import assert from 'node:assert/strict'
import { db, forBusiness } from '../lib/db'

const suffix = Date.now()

async function main() {
  const owner = await db.users.create({ data: { email: `booking-${suffix}@test.local` } })
  const biz = await db.businesses.create({
    data: { name: `booking-${suffix}`, slug: `booking-${suffix}`, owner_id: owner.id },
  })
  const tdb = forBusiness(biz.id)
  const service = await tdb.services.create({
    data: { business_id: biz.id, name: 'Cut', duration_min: 30, price: 20 },
  })

  const starts_at = new Date(Date.now() + 86_400_000)
  const ends_at = new Date(starts_at.getTime() + 30 * 60_000)
  const book = () =>
    tdb.appointments.create({
      data: {
        business_id: biz.id,
        service_id: service.id,
        starts_at,
        ends_at,
        price: 20,
        status: 'confirmed',
        source: 'online',
      },
      select: { id: true },
    })

  // No employees yet: trigger 034 must say so rather than blaming the slot.
  await assert.rejects(
    book,
    /no_staff_available/,
    'booking with zero active employees did not raise no_staff_available',
  )

  await tdb.employees.create({ data: { business_id: biz.id, name: 'Owner', is_active: true } })

  await book() // first booking wins

  // Same slot again: trigger 017/032 must reject it, and the message must still
  // carry the code the route matches on.
  await assert.rejects(
    book,
    /slot_already_booked/,
    'double booking was accepted, or the trigger message no longer contains slot_already_booked',
  )

  await db.businesses.delete({ where: { id: biz.id } })
  await db.users.delete({ where: { id: owner.id } })

  console.log('✓ booking triggers still raise the codes /api/book matches on')
}

main()
  .catch(err => {
    console.error('✗', err.message)
    process.exitCode = 1
  })
  .finally(() => db.$disconnect())
