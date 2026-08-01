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

export type CreateOwnerListingLeadInput = {
  name: string
  email: string
  phone?: string | null
  propertyType: string
  address: string
  bedrooms?: number | null
  price?: number | null
  message?: string | null
  photoUrls: string[]
}

export async function createOwnerListingLead(input: CreateOwnerListingLeadInput) {
  const notes = [
    `Tipo de imóvel: ${input.propertyType}`,
    `Endereço: ${input.address}`,
    input.bedrooms != null ? `Quartos: ${input.bedrooms}` : null,
    input.price != null ? `Valor pretendido: R$ ${input.price}` : null,
    input.message?.trim() || null,
  ]
    .filter(Boolean)
    .join(' | ')

  const { error } = await supabaseAdmin.from('leads').insert({
    full_name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone?.trim() || null,
    source: 'anuncio_proprietario',
    status: 'novo',
    company_id: process.env.NEXT_PUBLIC_COMPANY_ID!,
    notes: notes || null,
    photo_urls: input.photoUrls.length ? input.photoUrls : null,
  })

  if (error) throw error
}
