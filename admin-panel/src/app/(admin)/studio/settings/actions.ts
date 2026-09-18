'use server'

import { revalidatePath } from 'next/cache'
import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'

export async function saveSettings(_prev: unknown, formData: FormData) {
  await requirePermission('settings', 'update')

  const phone = String(formData.get('phone') || '')
  const email = String(formData.get('email') || '')
  const address = String(formData.get('address') || '')
  const workHours = String(formData.get('workHours') || '')
  const heroTitle = String(formData.get('heroTitle') || '')
  const heroLead = String(formData.get('heroLead') || '')

  const payload = await getPayload()
  await payload.updateGlobal({
    slug: 'settings',
    data: {
      phone,
      email,
      address,
      workHours,
      heroTitle,
      heroLead,
    },
  })

  revalidatePath('/')
  return { ok: true }
}
