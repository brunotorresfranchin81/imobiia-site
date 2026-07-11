'use client'

import { useMemo, useState } from 'react'
import { PropertyCard } from '@/components/property-card'
import { FilterBar, type Filters } from '@/components/filter-bar'
import type { Property } from '@/lib/properties'

const DEFAULT_FILTERS: Filters = { operation: 'todos', bedroomsMin: 0, city: 'todas' }

export function FilterableGrid({ properties }: { properties: Property[] }) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)

  const cities = useMemo(() => {
    const set = new Set(properties.map((p) => p.city).filter((c): c is string => !!c))
    return Array.from(set).sort()
  }, [properties])

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.operation !== 'todos' && p.operation_type !== filters.operation) return false
      if (filters.bedroomsMin > 0 && (p.bedrooms ?? 0) < filters.bedroomsMin) return false
      if (filters.city !== 'todas' && p.city !== filters.city) return false
      return true
    })
  }, [properties, filters])

  return (
    <div>
      <FilterBar filters={filters} onChange={setFilters} cities={cities} />
      {filtered.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-4 py-16 text-center">
          <p className="font-sans text-texto-suave">Nenhum imóvel encontrado com esses filtros.</p>
          <button
            type="button"
            onClick={() => setFilters(DEFAULT_FILTERS)}
            className="min-h-11 rounded-md border border-borda px-4 py-2 font-sans text-sm text-texto transition-colors duration-rapida hover:border-acao hover:text-acao"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}
