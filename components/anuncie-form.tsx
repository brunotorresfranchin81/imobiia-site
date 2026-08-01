'use client'

import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const PROPERTY_TYPES = [
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'casa', label: 'Casa' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'outro', label: 'Outro' },
]

type FieldErrors = { name?: string; email?: string; propertyType?: string; address?: string }

export function AnuncieForm() {
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
    const propertyType = String(formData.get('propertyType') ?? '').trim()
    const address = String(formData.get('address') ?? '').trim()

    const errors: FieldErrors = {}
    if (!name) errors.name = 'Informe seu nome.'
    if (!email) errors.email = 'Informe seu email.'
    if (!propertyType) errors.propertyType = 'Selecione o tipo de imóvel.'
    if (!address) errors.address = 'Informe o endereço.'
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/anunciar', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        setNetworkError(body?.error ?? 'Não foi possível enviar seu anúncio. Tente novamente.')
        return
      }

      toast.success('Recebemos os dados do seu imóvel! O corretor entrará em contato.')
      form.reset()
    } catch {
      setNetworkError('Falha de conexão. Verifique sua internet e tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate encType="multipart/form-data" className="flex flex-col gap-4">
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
        <Label htmlFor="propertyType">Tipo de imóvel*</Label>
        <select
          id="propertyType"
          name="propertyType"
          required
          aria-invalid={!!fieldErrors.propertyType}
          className="rounded-md border border-borda bg-branco px-3 py-2 text-sm text-texto"
          defaultValue=""
        >
          <option value="" disabled>
            Selecione
          </option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {fieldErrors.propertyType && <p className="font-sans text-sm text-erro">{fieldErrors.propertyType}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="address">Endereço*</Label>
        <Input id="address" name="address" required aria-invalid={!!fieldErrors.address} placeholder="Rua, número, bairro, cidade" />
        {fieldErrors.address && <p className="font-sans text-sm text-erro">{fieldErrors.address}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="bedrooms">Quartos</Label>
          <Input id="bedrooms" name="bedrooms" type="number" inputMode="numeric" min="0" step="1" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="price">Valor pretendido (R$)</Label>
          <Input id="price" name="price" type="number" inputMode="decimal" min="0" step="0.01" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="photos">Fotos do imóvel</Label>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="font-sans text-sm text-texto file:mr-3 file:rounded-md file:border-0 file:bg-acao file:px-3 file:py-2 file:text-sm file:font-medium file:text-preto"
        />
        <p className="font-sans text-xs text-texto-suave">Até 10 fotos — JPG, PNG ou WebP, máx. 5MB cada.</p>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="message">Observações</Label>
        <Textarea id="message" name="message" rows={4} />
      </div>

      {networkError && <p className="font-sans text-sm text-erro">{networkError}</p>}

      <Button type="submit" disabled={isSubmitting} className="h-11 bg-acao px-6 text-preto hover:bg-acao-hover">
        {isSubmitting ? 'Enviando...' : 'Enviar imóvel'}
      </Button>

      <p className="font-sans text-xs text-texto-suave">
        Ao enviar, você concorda com o uso dos seus dados para contato comercial.
      </p>
    </form>
  )
}
