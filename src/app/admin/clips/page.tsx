import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ClipsAdmin } from '@/components/admin/clips-admin'

export default async function AdminClipsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if ((profile as { role?: string } | null)?.role !== 'admin') redirect('/')

  const { data: clips } = await supabase.from('bhakti_clips').select('*').order('created_at', { ascending: false })

  return <ClipsAdmin clips={clips ?? []} userId={user.id} />
}
