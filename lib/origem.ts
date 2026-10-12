export const ORIGENS = ['instagram', 'facebook', 'google', 'site'] as const

export type Origem = (typeof ORIGENS)[number]

export const ORIGEM_LABEL: Record<Origem, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  google: 'Google',
  site: 'Site',
}

const STORAGE_KEY = 'origem'

export function isOrigem(value: unknown): value is Origem {
  return typeof value === 'string' && (ORIGENS as readonly string[]).includes(value)
}

function normalizarUtm(source: string): Origem | null {
  const s = source.trim().toLowerCase()
  if (s === 'ig' || s === 'instagram') return 'instagram'
  if (s === 'fb' || s === 'facebook') return 'facebook'
  if (s === 'google') return 'google'
  return null
}

function origemDoReferrer(referrer: string): Origem | null {
  let hostname: string
  try {
    hostname = new URL(referrer).hostname.toLowerCase()
  } catch {
    return null
  }
  if (hostname === window.location.hostname) return null
  if (['instagram.com', 'www.instagram.com', 'l.instagram.com'].includes(hostname)) return 'instagram'
  if (
    ['facebook.com', 'www.facebook.com', 'm.facebook.com', 'l.facebook.com', 'lm.facebook.com'].includes(hostname)
  ) {
    return 'facebook'
  }
  if (/(^|\.)google\.[a-z.]+$/.test(hostname)) return 'google'
  return null
}

export function detectarOrigem(): Origem {
  const utm = new URLSearchParams(window.location.search).get('utm_source')
  if (utm) {
    const origem = normalizarUtm(utm)
    if (origem) return origem
  }
  return origemDoReferrer(document.referrer) ?? 'site'
}

export function salvarOrigem() {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    sessionStorage.setItem(STORAGE_KEY, detectarOrigem())
  } catch {}
}

export function getOrigem(): Origem {
  // Efeitos de componentes filhos rodam antes do OrigemTracker no layout,
  // então garante o first-touch aqui também (idempotente).
  salvarOrigem()
  try {
    const value = sessionStorage.getItem(STORAGE_KEY)
    return isOrigem(value) ? value : 'site'
  } catch {
    return 'site'
  }
}
