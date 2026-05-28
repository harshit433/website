import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SettingsPage } from '@/components/spiritual/settings-page'

export default async function Settings() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return <SettingsPage user={user} profile={profile} />
}
