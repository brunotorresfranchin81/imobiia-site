import Link from 'next/link'
import { BedDouble, Bath, Ruler } from 'lucide-react'
import { WatermarkImage } from '@/components/watermark-image'
import { formatPropertyTitle, getMainImageUrl, type Property } from '@/lib/properties'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

const OPERATION_LABEL: Record<Property['operation_type'], string> = {
  venda: 'Venda',
  aluguel: 'Aluguel',
}

export function PropertyCard({ property }: { property: Property }) {
  const mainImageUrl = getMainImageUrl(property)
  const title = formatPropertyTitle(property.title)

  return (
    <Link
      href={`/imoveis/${property.slug}`}
      className="group block overflow-hidden rounded-lg border-2 border-preto bg-branco transition-shadow duration-media ease-out-custom hover:shadow-xl"
    >
      <div className="relative">
        <WatermarkImage src={mainImageUrl} alt={title} />
        <span className="absolute left-3 top-3 rounded-sm bg-preto px-2 py-1 font-sans text-xs font-medium uppercase tracking-wide text-dourado-600">
          {OPERATION_LABEL[property.operation_type]}
        </span>
      </div>
      <div className="border-t-2 border-preto p-4">
        <p className="font-heading text-lg text-texto">{currencyFormatter.format(property.price)}</p>
        <h3 className="mt-1 truncate font-sans text-sm font-medium text-texto">{title}</h3>
        <p className="mt-1 truncate font-sans text-sm text-texto-suave">
          {[property.neighborhood, property.city].filter(Boolean).join(', ')}
        </p>
        <div className="mt-3 flex items-center gap-4 font-sans text-sm text-texto-suave">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1">
              <BedDouble className="h-4 w-4" aria-hidden="true" />
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4" aria-hidden="true" />
              {property.bathrooms}
            </span>
          )}
          {property.area_m2 != null && (
            <span className="flex items-center gap-1">
              <Ruler className="h-4 w-4" aria-hidden="true" />
              {property.area_m2}m²
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
