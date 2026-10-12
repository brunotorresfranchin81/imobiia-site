import { normalizarOrigem, ORIGEM_LABEL } from '@/lib/origem'

export type MontarNotesInput = {
  message?: string | null
  propertySlug?: string | null
  origem?: unknown
}

export function montarNotes({ message, propertySlug, origem }: MontarNotesInput): string {
  const origemValida = normalizarOrigem(origem)
  return [message?.trim(), propertySlug ? `Imóvel: ${propertySlug}` : null, `Origem: ${ORIGEM_LABEL[origemValida]}`]
    .filter(Boolean)
    .join(' | ')
}
