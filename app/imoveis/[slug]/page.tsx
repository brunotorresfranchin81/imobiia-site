import { notFound } from 'next/navigation'
import { BedDouble, Bath, Ruler, Car, Home as HomeIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { formatPropertyTitle, getPropertyBySlug, getPropertyImages } from '@/lib/properties'
import { PropertyGallery } from '@/components/property-gallery'
import { ContactForm } from '@/components/contact-form'
import { WhatsAppButton } from '@/components/whatsapp-button'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

export async function generateStaticParams() {
  const { data } = await supabase
    .from('properties')
    .select('slug')
    .eq('published', true)
    .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID!)
    .not('slug', 'is', null)
  return (data ?? []).map((p) => ({ slug: p.slug! }))
}

export default async function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const property = await getPropertyBySlug(params.slug)
  if (!property) notFound()

  const images = await getPropertyImages(property.id)
  const title = formatPropertyTitle(property.title)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <PropertyGallery images={images} title={title} />

        <div>
          <p className="font-sans text-sm uppercase tracking-wide text-acao">
            {property.operation_type === 'venda' ? 'Venda' : 'Aluguel'}
          </p>
          <h1 className="mt-1 font-heading text-3xl text-texto">{title}</h1>
          <p className="mt-1 font-sans text-sm text-texto-suave">
            {[property.neighborhood, property.city, property.state].filter(Boolean).join(', ')}
          </p>
          <p className="mt-4 font-heading text-2xl text-texto">{currencyFormatter.format(property.price)}</p>

          <div className="mt-6 flex flex-wrap gap-6 border-y border-borda py-4 font-sans text-sm text-texto">
            {property.bedrooms != null && (
              <span className="flex items-center gap-2">
                <BedDouble className="h-5 w-5 text-texto-suave" aria-hidden="true" />
                {property.bedrooms} quartos
              </span>
            )}
            {property.bathrooms != null && (
              <span className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-texto-suave" aria-hidden="true" />
                {property.bathrooms} banheiros
              </span>
            )}
            {property.parking_spots != null && (
              <span className="flex items-center gap-2">
                <Car className="h-5 w-5 text-texto-suave" aria-hidden="true" />
                {property.parking_spots} vagas
              </span>
            )}
            {property.area_m2 != null && (
              <span className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-texto-suave" aria-hidden="true" />
                {property.area_m2}m²
              </span>
            )}
            {property.property_type && (
              <span className="flex items-center gap-2 capitalize">
                <HomeIcon className="h-5 w-5 text-texto-suave" aria-hidden="true" />
                {property.property_type}
              </span>
            )}
          </div>

          {property.description && (
            <p className="mt-6 whitespace-pre-line font-sans text-base text-texto-suave">{property.description}</p>
          )}

          <div className="mt-8 rounded-lg border border-borda p-6">
            <h2 className="font-heading text-xl text-texto">Interessado neste imóvel?</h2>
            <p className="mt-1 font-sans text-sm text-texto-suave">
              Preencha o formulário e o corretor entrará em contato.
            </p>
            <div className="mt-4">
              <ContactForm propertySlug={property.slug} submitLabel="Falar com o corretor sobre este imóvel" />
            </div>
          </div>
        </div>
      </div>

      <WhatsAppButton message={`Tenho interesse no imóvel: ${title}`} />
    </div>
  )
}
