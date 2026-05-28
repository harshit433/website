import { createClient } from '@/lib/supabase/server'
import { PadasGallery } from '@/components/spiritual/padas-gallery'

export default async function PadasPage() {
  const supabase = await createClient()
  const { data: padas } = await supabase
    .from('padas')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  return <PadasGallery padas={padas ?? []} />
}
