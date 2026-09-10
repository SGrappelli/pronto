import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { getBusinessForOwner } from '@/lib/business'

// Business logo upload for self-hosted installs.
//
// Storage backend is Supabase Storage — same convention as product photos
// (see app/api/inventory/[id]/photo/route.ts). The operator must create a
// public bucket named `logos` (Supabase Dashboard → Storage → New bucket);
// this is documented in README.md next to the `inventory` bucket step.

const BUCKET = 'logos'

const ALLOWED_TYPES: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
}
const MAX_SIZE = 2 * 1024 * 1024 // 2MB

// Recover the storage object key from a stored public URL so the previous
// file can be cleaned up. Public URLs look like
//   <base>/storage/v1/object/public/logos/<businessId>/<file>
function keyFromPublicUrl(url: string): string | null {
  const marker = `/storage/v1/object/public/${BUCKET}/`
  const i = url.indexOf(marker)
  if (i === -1) return null
  const key = url.slice(i + marker.length)
  return key.length > 0 ? key : null
}

// ── POST — upload logo ───────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const business = await getBusinessForOwner(user.id)
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    let formData: FormData
    try {
      formData = await req.formData()
    } catch {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    }

    const file = formData.get('logo')
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: 'No file provided (field name must be "logo")' },
        { status: 400 },
      )
    }

    const ext = ALLOWED_TYPES[file.type]
    if (!ext) {
      return NextResponse.json(
        { error: `Invalid file type "${file.type}". Allowed: PNG, JPG, WebP, SVG` },
        { status: 400 },
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 2MB' }, { status: 400 })
    }

    const admin = createServiceClient()
    const key = `${business.id}/${Date.now()}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())

    const { error: uploadError } = await admin.storage
      .from(BUCKET)
      .upload(key, buffer, { contentType: file.type, upsert: true })

    if (uploadError) {
      console.error('[business/logo POST] storage upload error:', uploadError.message)
      return NextResponse.json(
        {
          error:
            `Upload failed: ${uploadError.message}. ` +
            `Make sure a public Storage bucket named "${BUCKET}" exists in your Supabase project.`,
        },
        { status: 500 },
      )
    }

    const { data: { publicUrl } } = admin.storage.from(BUCKET).getPublicUrl(key)

    const { error: updateError } = await supabase
      .from('businesses')
      .update({ logo_url: publicUrl })
      .eq('id', business.id)

    if (updateError) {
      console.error('[business/logo POST] businesses update error:', updateError.message)
      return NextResponse.json({ error: `DB error: ${updateError.message}` }, { status: 500 })
    }

    // Best-effort: drop the previously stored file so the bucket doesn't grow
    // unbounded. Never fail the request on a cleanup error.
    if (business.logo_url) {
      const oldKey = keyFromPublicUrl(business.logo_url)
      if (oldKey && oldKey !== key) {
        try {
          await admin.storage.from(BUCKET).remove([oldKey])
        } catch {
          /* ignore cleanup failure */
        }
      }
    }

    return NextResponse.json({ logo_url: publicUrl })
  } catch (err) {
    // Global safety net — always return JSON, never let Next.js fall through
    // to its default HTML/text error response for this route.
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[business/logo POST] unhandled error:', msg)
    return NextResponse.json({ error: `Server error: ${msg}` }, { status: 500 })
  }
}

// ── DELETE — remove logo ─────────────────────────────────────────────────────

export async function DELETE() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const business = await getBusinessForOwner(user.id)
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    if (business.logo_url) {
      const oldKey = keyFromPublicUrl(business.logo_url)
      if (oldKey) {
        try {
          const admin = createServiceClient()
          await admin.storage.from(BUCKET).remove([oldKey])
        } catch {
          /* ignore cleanup failure */
        }
      }
    }

    const { error: updateError } = await supabase
      .from('businesses')
      .update({ logo_url: null })
      .eq('id', business.id)

    if (updateError) {
      console.error('[business/logo DELETE] businesses update error:', updateError.message)
      return NextResponse.json({ error: `DB error: ${updateError.message}` }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[business/logo DELETE] unhandled error:', msg)
    return NextResponse.json({ error: `Server error: ${msg}` }, { status: 500 })
  }
}
