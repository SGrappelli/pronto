import { NextResponse } from 'next/server'

// Catch-all for any request under /api/* that has no matching route handler.
// Without this, a non-GET request (POST especially) to an unknown /api path
// falls through to Next's HTML not-found render — and when that render fails it
// degrades to a bare "Internal Server Error". Exact and dynamic route matches
// always take precedence over this catch-all, so real endpoints are unaffected.
// (issue #15)

export const dynamic = 'force-dynamic'

function handler() {
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler
export const OPTIONS = handler
export const HEAD = handler
