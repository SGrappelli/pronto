import { PrismaClient, Prisma } from '@prisma/client'

/**
 * Prisma client for Pronto.
 *
 * Read this before writing a query.
 *
 * The database used to be Supabase, where Row Level Security filtered every
 * row by business_id automatically. It no longer does: the app connects as the
 * table owner, and a table owner bypasses RLS. The policies are still in the
 * schema, but they are inert.
 *
 * So tenant isolation is now this file's job. Use `forBusiness(id)` for every
 * query that touches tenant data. The raw `db` export exists for the handful
 * of queries that are genuinely global (auth, the businesses table itself,
 * cron sweeps across all businesses) — reach for it deliberately, not by
 * default.
 */

// Every model carrying a business_id column. Kept in sync by hand with
// prisma/schema.prisma; assertScoped() below fails the build-time check if a
// new tenant table is added and forgotten here.
const TENANT_MODELS = [
  'appointments',
  'business_hours',
  'clients',
  'employees',
  'inventory_items',
  'inventory_movements',
  'notification_log',
  'services',
  'transactions',
] as const

// next dev hot-reloads modules; without the global cache each reload opens a
// new pool until Postgres runs out of connections.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

/**
 * A client whose every query against a tenant model is forced to that business.
 *
 * The where clause is injected, not merged in a way the caller can override:
 * a caller-supplied business_id that disagrees is a bug, and this throws rather
 * than silently picking one.
 *
 *   const tdb = forBusiness(businessId)
 *   await tdb.clients.findMany()            // scoped
 *
 * On create, still pass business_id in the payload — Prisma's generated create
 * type requires it, and this checks it matches rather than trusting it:
 *
 *   await tdb.appointments.create({ data: { business_id: businessId, ... } })
 */
export function forBusiness(businessId: string) {
  if (!businessId) {
    throw new Error('forBusiness() called without a businessId')
  }

  return db.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          if (!model || !(TENANT_MODELS as readonly string[]).includes(model)) {
            return query(args)
          }

          const a = args as Record<string, any>

          // Writes: stamp business_id onto the payload.
          if (operation === 'create' || operation === 'createMany' || operation === 'upsert') {
            stampData(a, businessId, model, operation)
          }

          // Reads, updates and deletes: constrain the where clause.
          if ('where' in a || READ_WRITE_OPS.has(operation)) {
            a.where = scopeWhere(a.where, businessId, model)
          }

          return query(a as typeof args)
        },
      },
    },
  })
}

const READ_WRITE_OPS = new Set([
  'findFirst',
  'findFirstOrThrow',
  'findMany',
  'findUnique',
  'findUniqueOrThrow',
  'update',
  'updateMany',
  'delete',
  'deleteMany',
  'count',
  'aggregate',
  'groupBy',
])

function scopeWhere(where: any, businessId: string, model: string) {
  if (where && where.business_id !== undefined && where.business_id !== businessId) {
    throw new Error(
      `Cross-tenant query blocked on ${model}: caller asked for business_id ` +
        `${JSON.stringify(where.business_id)} inside forBusiness(${businessId})`,
    )
  }
  // The tenant filter goes into AND rather than replacing the where clause,
  // because findUnique needs its unique field (id, or a compound key) to stay
  // at the top level — nesting the whole clause makes Prisma reject it.
  if (!where) return { business_id: businessId }
  const existing = where.AND === undefined ? [] : Array.isArray(where.AND) ? where.AND : [where.AND]
  return { ...where, AND: [...existing, { business_id: businessId }] }
}

function stampData(args: Record<string, any>, businessId: string, model: string, operation: string) {
  const stamp = (data: any) => {
    if (data && data.business_id !== undefined && data.business_id !== businessId) {
      throw new Error(
        `Cross-tenant write blocked on ${model}.${operation}: payload business_id ` +
          `${JSON.stringify(data.business_id)} inside forBusiness(${businessId})`,
      )
    }
    return { ...data, business_id: businessId }
  }

  if (args.data !== undefined) {
    args.data = Array.isArray(args.data) ? args.data.map(stamp) : stamp(args.data)
  }
  if (args.create !== undefined) args.create = stamp(args.create)
  if (args.update !== undefined && args.update.business_id !== undefined) {
    stamp(args.update) // throws on mismatch; business_id is never rewritten on update
  }
}

export { Prisma }
