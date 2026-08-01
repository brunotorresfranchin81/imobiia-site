import 'server-only'
import { supabaseAdmin } from '@/lib/supabase-admin'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_MB = 5
const MAX_FILES = 10

export async function uploadOwnerListingPhotos(files: File[]): Promise<string[]> {
  const companyId = process.env.NEXT_PUBLIC_COMPANY_ID!
  const batchId = `${Date.now()}-${Math.random().toString(36).slice(2)}`
  const urls: string[] = []

  for (const file of files.slice(0, MAX_FILES)) {
    if (!ACCEPTED_TYPES.includes(file.type)) continue
    if (file.size > MAX_SIZE_MB * 1024 * 1024) continue

    const storagePath = `${companyId}/anuncios/${batchId}/${Date.now()}_${file.name}`
    const { error } = await supabaseAdmin.storage
      .from('imobiia-properties')
      .upload(storagePath, file, { upsert: false })
    if (error) continue

    const { data } = supabaseAdmin.storage.from('imobiia-properties').getPublicUrl(storagePath)
    urls.push(data.publicUrl)
  }

  return urls
}
