import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: business } = await supabase
      .from('businesses').select('id').eq('owner_id', user.id)
      .order('created_at', { ascending: true }).limit(1).maybeSingle()
    if (!business) {
      console.error('[inventory/[id]/photo] authenticated owner has no business row:', user.id)
      return NextResponse.json({ error: 'not_found' }, { status: 404 })
    }

    // Verify the item belongs to this business before touching Storage or the DB row.
    const { data: item } = await supabase
      .from('inventory_items')
      .select('id')
      .eq('id', params.id)
      .eq('business_id', business.id)
      .maybeSingle()
    if (!item) return NextResponse.json({ error: 'not_found' }, { status: 404 })

    const formData = await req.formData()
    const file = formData.get('file')
    if (!(file instanceof File)) return NextResponse.json({ error: 'No file' }, { status: 400 })

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 2MB)' }, { status: 400 })
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    const ext = file.name.split('.').pop()
    const path = `products/${business.id}/${params.id}/${Date.now()}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())

    // Storage bucket has no policies for authenticated writes (see the
    // "create a public bucket" step below) — service role is used only for
    // this one upload call. The ownership check above and the DB update
    // below both stay on the RLS-scoped client, so this route can never
    // read or write another business's item.
    // Upload to Supabase Storage bucket 'inventory'
    // Create a public bucket named 'inventory' in Supabase Dashboard → Storage
    const admin = createServiceClient()
    const { error: uploadError } = await admin.storage
      .from('inventory')
      .upload(path, buffer, {
        contentType: file.type,
        upsert: true,
      })

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    const { data: { publicUrl } } = admin.storage
      .from('inventory')
      .getPublicUrl(path)

    const { error: updateError } = await supabase
      .from('inventory_items')
      .update({ photo_url: publicUrl })
      .eq('id', params.id)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({ url: publicUrl })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[inventory/[id]/photo POST] unhandled error:', msg)
    return NextResponse.json({ error: `Server error: ${msg}` }, { status: 500 })
  }
}
