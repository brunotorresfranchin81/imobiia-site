import { unstable_cache } from 'next/cache'
import { supabase } from '@/lib/supabase'

export type OperationType = 'venda' | 'aluguel'
export type PropertyType = 'apartamento' | 'casa' | 'comercial' | 'terreno' | 'outro'
export type PropertyStatus = 'ativo' | 'reservado' | 'vendido' | 'arquivado'

export type Property = {
  id: string
  title: string
  slug: string
  price: number
  operation_type: OperationType
  neighborhood: string | null
  city: string | null
  bedrooms: number | null
  bathrooms: number | null
  suites: number | null
  parking_spots: number | null
  area_m2: number | null
  description: string | null
  address: string | null
  state: string | null
  featured: boolean
  property_type: PropertyType
  status: PropertyStatus
  property_images?: PropertyImage[]
}

export type PropertyImage = {
  id: string
  url: string
  is_main: boolean
  display_order: number
}

export function getMainImageUrl(property: Property): string | null {
  const images = property.property_images ?? []
  const main = images.find((img) => img.is_main) ?? images[0]
  return main?.url ?? null
}

export function formatPropertyTitle(title: string): string {
  return title.replace(/\*\*/g, '').trim()
}

export const getPublishedProperties = unstable_cache(
  async (): Promise<Property[]> => {
    const { data, error } = await supabase
      .from('properties')
      .select(
        `
        id, title, slug, price, operation_type,
        neighborhood, city, bedrooms, bathrooms,
        suites, parking_spots, area_m2, description,
        address, state, featured, property_type, status,
        property_images ( id, url, is_main, display_order )
      `
      )
      .eq('published', true)
      .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID!)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  },
  ['properties-published'],
  { revalidate: 60 }
)

export const getPropertyBySlug = unstable_cache(
  async (slug: string): Promise<Property | null> => {
    const { data } = await supabase
      .from('properties')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID!)
      .single()
    return data
  },
  ['property-by-slug'],
  { revalidate: 60 }
)

export const getPropertyImages = unstable_cache(
  async (propertyId: string): Promise<PropertyImage[]> => {
    const { data } = await supabase
      .from('property_images')
      .select('id, url, is_main, display_order')
      .eq('property_id', propertyId)
      .order('display_order', { ascending: true })
    return data ?? []
  },
  ['property-images'],
  { revalidate: 60 }
)
