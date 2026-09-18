'use server'

import { revalidatePath } from 'next/cache'
import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'

export async function updateLeadStatus(id: string, status: any) {
  await requirePermission('leads', 'update')
  const payload = await getPayload()
  await payload.update({
    collection: 'leads',
    id,
    data: { status } as any,
  })
  revalidatePath('/studio/leads')
}

export async function deleteLead(id: string) {
  await requirePermission('leads', 'delete')
  const payload = await getPayload()
  await payload.delete({ collection: 'leads', id })
  revalidatePath('/studio/leads')
}
