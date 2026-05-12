'use server'

import { createClient } from '@/lib/supabase/server'

export async function requestPasswordReset(formData: FormData) {
  const email = (formData.get('email') as string).trim()
  const supabase = createClient()

  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/reset-password`,
  })

  // Не раскрываем, существует ли аккаунт — всегда возвращаем успех
}
