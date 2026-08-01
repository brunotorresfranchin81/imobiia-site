import { AnuncieForm } from '@/components/anuncie-form'

export const metadata = {
  title: 'Anuncie seu Imóvel | Sena Corretor de Imóveis',
}

export default function AnunciarPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl text-texto">Anuncie seu Imóvel</h1>
      <p className="mt-2 font-sans text-base text-texto-suave">
        É proprietário e quer vender ou alugar? Preencha os dados abaixo e o corretor entrará em contato.
      </p>
      <div className="mt-8">
        <AnuncieForm />
      </div>
    </div>
  )
}
