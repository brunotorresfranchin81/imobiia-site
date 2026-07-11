'use client'

import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type ContactFormProps = {
  propertySlug?: string
  submitLabel?: string
}

type FieldErrors = { name?: string; email?: string }

export function ContactForm({ propertySlug, submitLabel = 'Enviar mensagem' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [networkError, setNetworkError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNetworkError(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const website = String(formData.get('website') ?? '')

    const errors: FieldErrors = {}
    if (!name) errors.name = 'Informe seu nome.'
    if (!email) errors.email = 'Informe seu email.'
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message, propertySlug, website }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        setNetworkError(body?.error ?? 'Não foi possível enviar sua mensagem. Tente novamente.')
        return
      }

      toast.success('Mensagem enviada! O corretor entrará em contato.')
      form.reset()
    } catch {
      setNetworkError('Falha de conexão. Verifique sua internet e tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
      >
        <Label htmlFor="website">Não preencha este campo</Label>
        <Input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="name">Nome*</Label>
        <Input id="name" name="name" required aria-invalid={!!fieldErrors.name} />
        {fieldErrors.name && <p className="font-sans text-sm text-erro">{fieldErrors.name}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email*</Label>
        <Input id="email" name="email" type="email" required aria-invalid={!!fieldErrors.email} />
        {fieldErrors.email && <p className="font-sans text-sm text-erro">{fieldErrors.email}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="phone">Telefone</Label>
        <Input id="phone" name="phone" type="tel" />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea id="message" name="message" rows={4} />
      </div>

      {networkError && <p className="font-sans text-sm text-erro">{networkError}</p>}

      <Button type="submit" disabled={isSubmitting} className="h-11 bg-acao px-6 text-preto hover:bg-acao-hover">
        {isSubmitting ? 'Enviando...' : submitLabel}
      </Button>
    </form>
  )
}
