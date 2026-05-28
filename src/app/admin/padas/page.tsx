import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PadasAdmin } from '@/components/admin/padas-admin'

export default async function AdminPadasPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if ((profile as { role?: string } | null)?.role !== 'admin') redirect('/')

  const { data: padas } = await supabase.from('padas').select('*').order('created_at', { ascending: false })

  return <PadasAdmin padas={padas ?? []} userId={user.id} />
}
