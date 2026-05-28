import { createClient } from '@/lib/supabase/server'
import { DiscussionsPage } from '@/components/spiritual/discussions-page'

export default async function Discussions() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: discussions } = await supabase
    .from('discussions')
    .select('*, profiles(display_name, avatar_url)')
    .order('created_at', { ascending: false })

  return <DiscussionsPage discussions={discussions ?? []} user={user} />
}
