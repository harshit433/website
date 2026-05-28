import { createClient } from '@/lib/supabase/server'
import { JournalPage } from '@/components/spiritual/journal-page'

export default async function Journal() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let entries = []
  if (user) {
    const { data } = await supabase
      .from('journal_entries')
      .select('*')
      .or(`is_public.eq.true,user_id.eq.${user.id}`)
      .order('created_at', { ascending: false })
    entries = data ?? []
  } else {
    const { data } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
    entries = data ?? []
  }

  return <JournalPage entries={entries} user={user} />
}
