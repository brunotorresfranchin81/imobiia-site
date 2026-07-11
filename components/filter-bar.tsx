'use client'

export type Filters = {
  operation: 'todos' | 'venda' | 'aluguel'
  bedroomsMin: number
  city: string
}

export function FilterBar({
  filters,
  onChange,
  cities,
}: {
  filters: Filters
  onChange: (filters: Filters) => void
  cities: string[]
}) {
  return (
    <div className="flex flex-wrap gap-4 border-b border-borda pb-6">
      <label className="flex flex-col gap-1 font-sans text-sm text-texto">
        Operação
        <select
          value={filters.operation}
          onChange={(e) => onChange({ ...filters, operation: e.target.value as Filters['operation'] })}
          className="rounded-md border border-borda bg-branco px-3 py-2 text-sm text-texto"
        >
          <option value="todos">Todos</option>
          <option value="venda">Venda</option>
          <option value="aluguel">Aluguel</option>
        </select>
      </label>
      <label className="flex flex-col gap-1 font-sans text-sm text-texto">
        Quartos (mínimo)
        <select
          value={filters.bedroomsMin}
          onChange={(e) => onChange({ ...filters, bedroomsMin: Number(e.target.value) })}
          className="rounded-md border border-borda bg-branco px-3 py-2 text-sm text-texto"
        >
          <option value={0}>Qualquer</option>
          <option value={1}>1+</option>
          <option value={2}>2+</option>
          <option value={3}>3+</option>
          <option value={4}>4+</option>
        </select>
      </label>
      <label className="flex flex-col gap-1 font-sans text-sm text-texto">
        Cidade
        <select
          value={filters.city}
          onChange={(e) => onChange({ ...filters, city: e.target.value })}
          className="rounded-md border border-borda bg-branco px-3 py-2 text-sm text-texto"
        >
          <option value="todas">Todas</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
