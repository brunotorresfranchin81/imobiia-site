import { getPublishedProperties } from '@/lib/properties'
import { FilterableGrid } from '@/components/filterable-grid'
import { WhatsAppButton } from '@/components/whatsapp-button'

export const metadata = {
  title: 'Imóveis | Sena Corretor de Imóveis',
}

export default async function ImoveisPage() {
  const properties = await getPublishedProperties()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl text-texto">Imóveis disponíveis</h1>
      <div className="mt-8">
        <FilterableGrid properties={properties} />
      </div>
      <WhatsAppButton />
    </div>
  )
}
