import { createOwnerListingLead } from '@/lib/leads'
import { uploadOwnerListingPhotos } from '@/lib/storage'

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

  const formData = await request.formData()
  if (formData.get('website')) return Response.json({ ok: true }) // honeypot

  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const propertyType = String(formData.get('propertyType') ?? '').trim()
  const address = String(formData.get('address') ?? '').trim()
  const bedroomsRaw = String(formData.get('bedrooms') ?? '').trim()
  const priceRaw = String(formData.get('price') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()
  const photos = formData.getAll('photos').filter((item): item is File => item instanceof File && item.size > 0)

  if (!name || !email || !propertyType || !address) {
    return Response.json({ error: 'Nome, email, tipo de imóvel e endereço são obrigatórios.' }, { status: 400 })
  }

  try {
    const photoUrls = photos.length ? await uploadOwnerListingPhotos(photos) : []
    await createOwnerListingLead({
      name,
      email,
      phone,
      propertyType,
      address,
      bedrooms: bedroomsRaw ? Number(bedroomsRaw) : null,
      price: priceRaw ? Number(priceRaw) : null,
      message,
      photoUrls,
    })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Erro ao registrar seu imóvel.' }, { status: 500 })
  }

  return Response.json({ ok: true })
}
