import { createClient } from '@/lib/supabase/server'
import { ClipsGallery } from '@/components/spiritual/clips-gallery'

export default async function ClipsPage() {
  const supabase = await createClient()
  const { data: clips } = await supabase
    .from('bhakti_clips')
    .select('*')
    .order('created_at', { ascending: false })

  return <ClipsGallery clips={clips ?? []} />
}
