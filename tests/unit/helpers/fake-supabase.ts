/**
 * Minimal in-memory Supabase client fake for unit-testing API route handlers
 * without a database. Supports only the query shapes the payments / booking
 * routes actually use:
 *
 *   .from(t).select(cols).eq(col,val)[.eq(...)][.neq(...)][.or(...)][.contains(col,arr)][.in(...)][.lt(...)][.lte(...)][.gt(...)][.gte(...)][.not(col,'is',null)].maybeSingle()
 *   .from(t).select('id', { count: 'exact', head: true }).eq(...)  // awaited → { data: null, count: N }
 *   .from(t).select(cols)....                              // awaited directly → { data: rows[] }
 *   .from(t).update(obj).eq(col,val)[.eq(...)]             // awaited directly
 *   .from(t).insert(obj)                                   // awaited directly
 *   .from(t).insert(obj).select(cols).single()             // → { data: insertedRow }
 *   .from(t).delete().eq(col,val)[.eq(...)]                // awaited directly
 *   .auth.getUser()
 *
 * Not a general Supabase emulator — do not reach for it elsewhere.
 */

import { randomUUID } from 'node:crypto'

export type Row = Record<string, unknown>

interface FakeConfig {
  tables?: Record<string, Row[]>
  user?: Row | null
  /** force this error object out of every .update() */
  updateError?: { message: string; code?: string } | null
  /** restrict updateError to these tables (default: every table) */
  updateErrorTables?: string[]
  /** PostgREST-style row cap: a plain select (and a .range() wider than this) never returns more rows than this */
  maxRows?: number
}

type Result = { data: unknown; error: unknown; count?: number | null }

export interface FakeSupabase {
  auth: { getUser: () => Promise<{ data: { user: Row | null } }> }
  from: (table: string) => QueryBuilder
  rpc: (name: string, args?: unknown) => Promise<Result>
  _tables: Record<string, Row[]>
  _maxRows: number | null
  _updates: { table: string; patch: Row }[]
  _inserts: { table: string; row: Row }[]
  _deletes: { table: string; rows: Row[] }[]
}

// Column lookup that understands PostgREST embedded-resource filters ('inventory_items.low_stock_threshold'
// reads row.inventory_items.low_stock_threshold); plain columns behave exactly as before.
function pick(row: Row, col: string): unknown {
  if (col in row || !col.includes('.')) return row[col]
  return col.split('.').reduce<unknown>((acc, key) => (acc && typeof acc === 'object' ? (acc as Row)[key] : undefined), row)
}

class QueryBuilder implements PromiseLike<Result> {
  private op: 'select' | 'update' | 'insert' | 'delete' | null = null
  private payload: Row = {}
  private filters: Array<(r: Row) => boolean> = []
  private lastInserted: Row | null = null
  private headCount = false

  constructor(
    private table: string,
    private store: Record<string, Row[]>,
    private sink: FakeSupabase,
    private updateError: { message: string; code?: string } | null,
  ) {}

  private wantsReturning = false

  select(_cols?: string, opts?: { count?: 'exact' | 'planned' | 'estimated'; head?: boolean }) {
    // .select() after .update()/.insert() is a RETURNING clause, not a new op.
    if (this.op === null) this.op = 'select'
    else this.wantsReturning = true
    if (opts?.head || opts?.count) this.headCount = true
    return this
  }
  update(patch: Row) { this.op = 'update'; this.payload = patch; return this }
  insert(row: Row) { this.op = 'insert'; this.payload = row; return this }
  delete() { this.op = 'delete'; return this }

  eq(col: string, val: unknown) { this.filters.push((r) => pick(r, col) === val); return this }
  // SQL LIKE (% and _). clients.phone_digits is a generated column in Postgres: here it is derived from phone.
  like(col: string, pattern: string) {
    const re = new RegExp('^' + pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*').replace(/_/g, '.') + '$')
    this.filters.push((r) => {
      const v = pick(r, col) ?? (col === 'phone_digits' ? String(pick(r, 'phone') ?? '').replace(/\D/g, '') || null : null)
      return typeof v === 'string' && re.test(v)
    })
    return this
  }
  is(col: string, val: null) { this.filters.push((r) => (val === null ? pick(r, col) === null || pick(r, col) === undefined : pick(r, col) === val)); return this }
  neq(col: string, val: unknown) { this.filters.push((r) => pick(r, col) !== val); return this }
  in(col: string, vals: unknown[]) { this.filters.push((r) => vals.includes(pick(r, col))); return this }
  lt(col: string, val: unknown) { this.filters.push((r) => (pick(r, col) as never) < (val as never)); return this }
  lte(col: string, val: unknown) { this.filters.push((r) => (pick(r, col) as never) <= (val as never)); return this }
  gt(col: string, val: unknown) { this.filters.push((r) => (pick(r, col) as never) > (val as never)); return this }
  gte(col: string, val: unknown) { this.filters.push((r) => (pick(r, col) as never) >= (val as never)); return this }
  not(col: string, op: string, val: unknown) {
    if (op === 'is' && val === null) this.filters.push((r) => pick(r, col) !== null && pick(r, col) !== undefined)
    return this
  }
  contains(col: string, vals: unknown[]) {
    this.filters.push((r) => Array.isArray(pick(r, col)) && vals.every((v) => (pick(r, col) as unknown[]).includes(v)))
    return this
  }
  or(_filter: string) { return this } // filter string ignored — tests set up data so the .or() is a pass-through

  // Chained .order() calls are a multi-key sort (first = primary), like PostgREST.
  private orderBy: { col: string; ascending: boolean }[] = []
  private limitN: number | null = null
  order(col: string, opts?: { ascending?: boolean }) {
    this.orderBy.push({ col, ascending: opts?.ascending !== false })
    return this
  }
  limit(n: number) { this.limitN = n; return this }
  // PostgREST .range(from, to) — inclusive on both ends, applied after filters and order.
  private rangeFrom = 0
  private rangeTo: number | null = null
  range(from: number, to: number) { this.rangeFrom = from; this.rangeTo = to; return this }

  private rows(): Row[] {
    let rows = this.store[this.table] ?? []
    for (const f of this.filters) rows = rows.filter(f)
    if (this.orderBy.length) {
      rows = [...rows].sort((a, b) => {
        for (const { col, ascending } of this.orderBy) {
          const av = a[col] as never, bv = b[col] as never
          if (av === bv) continue
          return (av < bv ? -1 : 1) * (ascending ? 1 : -1)
        }
        return 0
      })
    }
    if (this.rangeTo != null) rows = rows.slice(this.rangeFrom, this.rangeTo + 1)
    if (this.limitN != null) rows = rows.slice(0, this.limitN)
    return rows
  }

  private runInsert(): Result {
    this.sink._inserts.push({ table: this.table, row: this.payload })
    const list = (this.store[this.table] ??= [])
    if (
      this.table === 'stripe_webhook_events' &&
      list.some((r) => r.stripe_event_id === this.payload.stripe_event_id)
    ) {
      return { data: null, error: { code: '23505', message: 'duplicate key value violates unique constraint' } }
    }
    // notification_log dedup — unique (ref_id, type, channel), see project_notifications
    if (
      this.table === 'notification_log' &&
      list.some(
        (r) =>
          r.ref_id === this.payload.ref_id &&
          r.type === this.payload.type &&
          r.channel === this.payload.channel,
      )
    ) {
      return { data: null, error: { code: '23505', message: 'duplicate key value violates unique constraint' } }
    }
    const inserted: Row = { id: randomUUID(), ...this.payload }
    list.push(inserted)
    this.lastInserted = inserted
    return { data: inserted, error: null }
  }

  private runUpdate(): Result {
    this.sink._updates.push({ table: this.table, patch: this.payload })
    if (this.updateError) return { data: null, error: this.updateError }
    // Capture the matched rows BEFORE mutating — a `.select()` RETURNING clause
    // must reflect what the UPDATE hit, and the mutation can change values the
    // filters keyed on (e.g. `.eq('voided', false)` while setting voided=true).
    const matched = this.rows()
    for (const r of matched) Object.assign(r, this.payload)
    return { data: this.wantsReturning ? matched : null, error: null }
  }

  private runDelete(): Result {
    const matched = this.rows()
    this.sink._deletes.push({ table: this.table, rows: matched })
    const list = this.store[this.table] ?? []
    this.store[this.table] = list.filter((r) => !matched.includes(r))
    return { data: null, error: null }
  }

  async single(): Promise<Result> {
    if (this.op === 'insert') {
      const res = this.runInsert()
      return res.error ? { data: null, error: res.error } : { data: this.lastInserted, error: null }
    }
    if (this.op === 'update') {
      const res = this.runUpdate()
      if (res.error) return { data: null, error: res.error }
      const arr = (res.data as Row[] | null) ?? []
      return { data: arr[0] ?? null, error: arr.length ? null : { code: 'PGRST116', message: 'no rows' } }
    }
    const r = this.rows()[0] ?? null
    return { data: r, error: r ? null : { code: 'PGRST116', message: 'no rows' } }
  }

  async maybeSingle(): Promise<Result> {
    if (this.op === 'insert') {
      const res = this.runInsert()
      return res.error ? { data: null, error: res.error } : { data: this.lastInserted, error: null }
    }
    if (this.op === 'update') {
      const res = this.runUpdate()
      if (res.error) return { data: null, error: res.error }
      return { data: ((res.data as Row[] | null) ?? [])[0] ?? null, error: null }
    }
    return { data: this.rows()[0] ?? null, error: null }
  }

  private resolve(): Result {
    if (this.op === 'update') return this.runUpdate()
    if (this.op === 'delete') return this.runDelete()
    if (this.op === 'insert') {
      const res = this.runInsert()
      return { data: null, error: res.error } // direct-await inserts don't read data
    }
    // head:true count query — supabase-js returns { data: null, count: N }
    if (this.headCount) return { data: null, error: null, count: this.rows().length }
    const all = this.rows()
    const cap = this.sink._maxRows
    return { data: cap != null ? all.slice(0, cap) : all, error: null }
  }

  then<T1 = Result, T2 = never>(
    onfulfilled?: ((value: Result) => T1 | PromiseLike<T1>) | null,
    onrejected?: ((reason: unknown) => T2 | PromiseLike<T2>) | null,
  ): PromiseLike<T1 | T2> {
    return Promise.resolve(this.resolve()).then(onfulfilled, onrejected)
  }
}

export function makeFakeSupabase(cfg: FakeConfig = {}): FakeSupabase {
  const store: Record<string, Row[]> = {}
  for (const [k, v] of Object.entries(cfg.tables ?? {})) store[k] = v.map((r) => ({ ...r }))

  const fake: FakeSupabase = {
    _tables: store,
    _maxRows: cfg.maxRows ?? null,
    _updates: [],
    _inserts: [],
    _deletes: [],
    auth: {
      getUser: async () => ({ data: { user: cfg.user === undefined ? null : cfg.user } }),
    },
    rpc: async (name: string, args?: unknown) => {
      // Mirrors the SQL contract of ensure_primary_location (migration 100); the real thing is covered by
      // tests/unit/locations-primary-live-db.test.ts.
      if (name === 'ensure_primary_location') {
        const a = (args ?? {}) as { p_business_id: string; p_name: string; p_address: string | null }
        const rows = (store.locations ??= []).filter((l) => l.business_id === a.p_business_id)
        const byAge = (x: Row, y: Row) => String(x.created_at ?? '').localeCompare(String(y.created_at ?? ''))
        let hit: Row | undefined = rows.filter((l) => l.is_primary && l.is_active).sort(byAge)[0]
        if (!hit) hit = rows.filter((l) => l.is_active).sort(byAge)[0]
        if (!hit) {
          hit = { id: randomUUID(), business_id: a.p_business_id, name: a.p_name || 'Main', address: a.p_address, is_active: true, is_primary: true }
          store.locations.push(hit)
          fake._inserts.push({ table: 'locations', row: { ...hit } })
        }
        for (const l of rows) if (l !== hit && l.is_primary) l.is_primary = false
        hit.is_primary = true
        return { data: hit.id, error: null }
      }
      // change_business_timezone (migration 102): stores the zone; moving the appointments is covered by
      // tests/unit/change-business-timezone-live-db.test.ts against a real database.
      if (name === 'change_business_timezone') {
        const a = (args ?? {}) as { p_business_id: string; p_new_timezone: string }
        const biz = (store.businesses ?? []).find((b) => b.id === a.p_business_id)
        if (!biz) return { data: null, error: { message: 'business_not_found' } }
        biz.timezone = a.p_new_timezone
        return { data: 0, error: null }
      }
      return { data: [], error: null }
    },
    from(table: string) {
      const failsHere = !cfg.updateErrorTables || cfg.updateErrorTables.includes(table)
      return new QueryBuilder(table, store, fake, failsHere ? (cfg.updateError ?? null) : null)
    },
  }
  return fake
}
