import 'server-only'
import { supabaseAdmin } from '@/lib/supabase-admin'

export type CreateLeadInput = {
  name: string
  email: string
  phone?: string | null
  message?: string | null
  propertySlug?: string | null
}

export async function createLeadFromSite(input: CreateLeadInput) {
  const notes = [input.message?.trim(), input.propertySlug ? `Imóvel: ${input.propertySlug}` : null]
    .filter(Boolean)
    .join(' | ')

  const { error } = await supabaseAdmin.from('leads').insert({
    full_name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone?.trim() || null,
    source: 'site',
    status: 'novo',
    company_id: process.env.NEXT_PUBLIC_COMPANY_ID!,
    notes: notes || null,
  })

  if (error) throw error
}
