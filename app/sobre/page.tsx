import { WhatsAppButton } from '@/components/whatsapp-button'

export const metadata = {
  title: 'Sobre | Sena Corretor de Imóveis',
}

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl text-texto">Sobre a Sena Corretor de Imóveis</h1>
      <div className="mt-6 flex flex-col gap-4 font-sans text-base text-texto-suave">
        <p>
          A Sena Corretor de Imóveis atua no mercado imobiliário, CRECI 067.623, acompanhando clientes em cada etapa
          da compra, venda ou locação — da primeira visita à assinatura do contrato.
        </p>
        <p>
          O trabalho é conduzido com atenção aos detalhes e conhecimento direto da região, priorizando imóveis que
          fazem sentido para cada cliente, sem pressa e sem promessas vazias.
        </p>
      </div>
      <WhatsAppButton />
    </div>
  )
}
