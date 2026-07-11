import { ContactForm } from '@/components/contact-form'
import { WhatsAppButton } from '@/components/whatsapp-button'

export const metadata = {
  title: 'Contato | Sena Corretor de Imóveis',
}

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl text-texto">Contato</h1>
      <p className="mt-2 font-sans text-base text-texto-suave">
        Preencha o formulário abaixo e o corretor entrará em contato.
      </p>
      <div className="mt-8">
        <ContactForm submitLabel="Enviar mensagem" />
      </div>
      <WhatsAppButton />
    </div>
  )
}
