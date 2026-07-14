import Image from 'next/image'
import Link from 'next/link'
import { getPublishedProperties } from '@/lib/properties'
import { PropertyCard } from '@/components/property-card'
import { WhatsAppButton } from '@/components/whatsapp-button'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP!

export default async function HomePage() {
  const properties = await getPublishedProperties()
  const featured = properties.filter((p) => p.featured).slice(0, 6)
  const grid = (featured.length > 0 ? featured : properties).slice(0, 6)

  return (
    <div>
      <section className="bg-preto">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-center font-heading text-2xl font-bold uppercase tracking-tight text-dourado-600 sm:text-3xl">
            Sena Corretor de Imóveis
          </p>
          <div className="mt-10 flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="font-heading text-4xl font-bold text-branco sm:text-6xl">
                Seu próximo imóvel está <span className="text-dourado-600">aqui</span>.
              </h1>
              <p className="mt-4 max-w-xl font-sans text-base text-cinza-100">
                CRECI 067.623. Negociação direta, sem enrolação.
              </p>
              <div className="mt-10">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center rounded-md border-2 border-branco px-8 font-sans text-base font-semibold text-branco transition-colors duration-rapida hover:border-dourado-600 hover:text-dourado-600"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>
            <Image
              src="/logos/logo-sena-fundo-escuro.png"
              alt="Sena Corretor de Imóveis"
              width={200}
              height={200}
              className="h-[220px] w-auto shrink-0 sm:h-[260px] lg:self-center"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-borda bg-superficie-alt">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6">
          <p className="font-heading text-5xl font-bold text-texto sm:text-6xl">
            {properties.length}+ <span className="text-dourado-600">imóveis selecionados</span>
          </p>
          <p className="mt-2 font-sans text-sm text-texto-suave">Atualizados continuamente, prontos para visita.</p>
          <Link
            href="/imoveis"
            className="mt-8 inline-flex h-14 items-center rounded-md bg-dourado-600 px-8 font-sans text-base font-semibold text-preto transition-colors duration-rapida hover:bg-dourado-700"
          >
            Ver Imóveis
          </Link>
        </div>
      </section>

      {grid.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-heading text-2xl text-texto">Imóveis em destaque</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      )}

      <WhatsAppButton />
    </div>
  )
}
