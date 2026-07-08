import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const formData = await req.formData()
  const file = formData.get('file') as File
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large (max 2MB)' }, { status: 400 })
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()
  const path = `products/${params.id}/${Date.now()}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  // Upload to Supabase Storage bucket 'inventory'
  // Create a public bucket named 'inventory' in Supabase Dashboard → Storage
  const { error: uploadError } = await supabase.storage
    .from('inventory')
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  const { data: { publicUrl } } = supabase.storage
    .from('inventory')
    .getPublicUrl(path)

  await supabase
    .from('inventory_items')
    .update({ photo_url: publicUrl })
    .eq('id', params.id)

  return NextResponse.json({ url: publicUrl })
}
