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
  const location = [property.neighborhood, property.city].filter(Boolean).join(' · ')

  return (
    <Link
      href={`/imoveis/${property.slug}`}
      className="group flex flex-col overflow-hidden rounded-md border border-borda bg-card transition-[box-shadow,border-color] duration-media ease-out-custom hover:border-borda-forte hover:shadow-xl"
    >
      <div className="relative">
        <WatermarkImage src={mainImageUrl} alt={title} />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="selo bg-header text-dourado-600">{OPERATION_LABEL[property.operation_type]}</span>
          {property.featured && <span className="selo bg-primary text-primary-foreground">Destaque</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        {location && <p className="rotulo truncate text-[11px] text-texto-suave">{location}</p>}
        <h3 className="mt-2 line-clamp-2 font-heading text-lg font-medium leading-snug text-texto">{title}</h3>
        <p className="mt-3 font-heading text-2xl font-semibold text-texto">{currencyFormatter.format(property.price)}</p>
        <div className="mt-4 flex items-center gap-4 border-t border-borda pt-4 font-sans text-sm text-texto-suave">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1">
              <BedDouble className="h-4 w-4" aria-hidden="true" />
              {property.bedrooms}
              <span className="sr-only">quartos</span>
            </span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4" aria-hidden="true" />
              {property.bathrooms}
              <span className="sr-only">banheiros</span>
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
