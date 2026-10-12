import Link from 'next/link'
import { getPublishedProperties } from '@/lib/properties'
import { PropertyCard } from '@/components/property-card'
import { WhatsAppButton } from '@/components/whatsapp-button'

export default async function HomePage() {
  const properties = await getPublishedProperties()
  const featured = properties.filter((p) => p.featured).slice(0, 6)
  const grid = (featured.length > 0 ? featured : properties).slice(0, 6)

  return (
    <div>
      <section className="bg-header text-header-foreground">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-3xl">
            <p className="rotulo text-dourado-600">Região dos Lagos · Rio de Janeiro</p>
            <h1 className="mt-5 text-balance font-heading text-4xl font-semibold leading-tight sm:text-5xl">
              Seu próximo capítulo começa no endereço certo.
            </h1>
            <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-cinza-400 sm:text-lg">
              Imóveis selecionados, negociação segura e um atendimento que entende o valor de cada escolha.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link href="/imoveis" className="btn-primario">
                Explorar imóveis
              </Link>
              <Link href="/contato" className="btn-secundario">
                Falar com especialista
              </Link>
            </div>
            <p className="rotulo mt-10 text-cinza-400">Wagner Sena · CRECI 067.623</p>
          </div>
        </div>
      </section>

      {properties.length > 0 && (
        <section className="border-b border-borda bg-muted">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
            <p className="font-heading text-3xl font-semibold text-texto sm:text-4xl">
              {properties.length}+ <span className="text-dourado-texto">imóveis selecionados</span>
            </p>
            <p className="font-sans text-sm text-texto-suave">Atualizados continuamente, prontos para visita.</p>
          </div>
        </section>
      )}

      {grid.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="rotulo text-dourado-texto">Seleção</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-texto">Imóveis em destaque</h2>
            </div>
            <Link
              href="/imoveis"
              className="rotulo inline-flex min-h-11 items-center text-texto underline-offset-4 transition-colors duration-rapida hover:text-dourado-texto hover:underline"
            >
              Ver todos os imóveis →
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-borda bg-muted">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-balance font-heading text-3xl font-semibold text-texto sm:text-4xl">
            Mais que imóveis. Escolhas que transformam vidas.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-texto-suave">
            Atendimento transparente, conhecimento local e uma seleção criteriosa para conectar pessoas aos melhores
            endereços da Região dos Lagos.
          </p>
          <Link href="/contato" className="btn-primario mt-10">
            Conte o que você procura
          </Link>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  )
}
