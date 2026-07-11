import { createLeadFromSite } from '@/lib/leads'

const rateMap = new Map<string, { count: number; resetAt: number }>()

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (entry && now < entry.resetAt) {
    if (entry.count >= 3) {
      return Response.json({ error: 'Muitas tentativas. Aguarde.' }, { status: 429 })
    }
    entry.count++
  } else {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 })
  }

  const body = await request.json()
  if (body.website) return Response.json({ ok: true }) // honeypot

  const { name, email, phone, message, propertySlug } = body
  if (!name?.trim() || !email?.trim()) {
    return Response.json({ error: 'Nome e email são obrigatórios' }, { status: 400 })
  }

  try {
    await createLeadFromSite({ name, email, phone, message, propertySlug })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Erro ao registrar contato.' }, { status: 500 })
  }

  return Response.json({ ok: true })
}
