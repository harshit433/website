'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import type { Pada } from '@/lib/supabase/types'

const LANGUAGES = ['Punjabi', 'Hindi', 'Braj Bhasha', 'Sanskrit', 'English']

const empty = { title: '', lyrics: '', language: 'Punjabi', tags: '', is_public: true, audio: null as File | null }

export function PadasAdmin({ padas: initial, userId }: { padas: Pada[]; userId: string }) {
  const [padas, setPadas] = useState(initial)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  async function savePada() {
    setError('')
    if (!form.title || !form.lyrics) { setError('Title and lyrics required'); return }
    setSaving(true)

    let audio_url: string | null = null
    if (form.audio) {
      const ext = form.audio.name.split('.').pop()
      const path = `padas/${Date.now()}.${ext}`
      const { error: uploadErr } = await supabase.storage.from('audio').upload(path, form.audio)
      if (uploadErr) { setError(uploadErr.message); setSaving(false); return }
      const { data: { publicUrl } } = supabase.storage.from('audio').getPublicUrl(path)
      audio_url = publicUrl
    }

    const { data, error: err } = await supabase
      .from('padas')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert({
        title: form.title,
        lyrics: form.lyrics,
        language: form.language,
        tags: form.tags ? form.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
        is_public: form.is_public,
        audio_url,
        created_by: userId,
      } as any)
      .select()
      .single()
    setSaving(false)
    if (err) { setError(err.message); return }
    if (data) { setPadas([data, ...padas]); setForm(empty) }
  }

  async function deletePada(id: string) {
    await supabase.from('padas').delete().eq('id', id)
    setPadas(padas.filter(p => p.id !== id))
  }

  return (
    <div className="pt-24 min-h-screen bg-[#0c0a08] px-6 md:px-16 pb-24 max-w-5xl mx-auto">
      <h1 className="text-2xl font-light text-amber-50/80 mb-2" style={{ fontFamily: 'serif' }}>Admin · Padas</h1>
      <p className="text-amber-200/30 text-sm mb-10">Add and manage your compositions.</p>

      {/* Add form */}
      <div className="p-6 border border-amber-900/20 rounded-xl bg-amber-950/10 mb-10">
        <h2 className="text-sm text-amber-200/60 mb-5">Add new pada</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Title *" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
              className="bg-transparent border border-amber-900/20 rounded-lg px-3 py-2 text-sm text-amber-100/80 placeholder-amber-800/40 outline-none focus:border-amber-700/40" />
            <select value={form.language} onChange={e => setForm({...form, language: e.target.value})}
              className="bg-[#0c0a08] border border-amber-900/20 rounded-lg px-3 py-2 text-sm text-amber-100/60 outline-none focus:border-amber-700/40">
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <textarea placeholder="Lyrics *" value={form.lyrics} onChange={e => setForm({...form, lyrics: e.target.value})} rows={10}
            className="w-full bg-transparent border border-amber-900/20 rounded-lg px-3 py-2 text-sm text-amber-100/80 placeholder-amber-800/40 outline-none focus:border-amber-700/40 resize-none leading-relaxed" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})}
              className="bg-transparent border border-amber-900/20 rounded-lg px-3 py-2 text-sm text-amber-100/80 placeholder-amber-800/40 outline-none focus:border-amber-700/40" />
            <div>
              <label className="text-xs text-amber-700/50 block mb-2">Audio file (optional)</label>
              <input type="file" accept="audio/*" onChange={e => setForm({...form, audio: e.target.files?.[0] ?? null})}
                className="text-xs text-amber-200/40 file:mr-3 file:py-1 file:px-3 file:rounded file:border file:border-amber-900/30 file:text-amber-400/60 file:bg-amber-950/20 file:text-xs cursor-pointer" />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <div onClick={() => setForm({...form, is_public: !form.is_public})}
              className={`w-8 h-4 rounded-full border transition-colors relative ${form.is_public ? 'bg-amber-500/20 border-amber-500/40' : 'bg-transparent border-amber-900/30'}`}>
              <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all ${form.is_public ? 'right-0.5 bg-amber-400/70' : 'left-0.5 bg-zinc-600'}`} />
            </div>
            <span className="text-xs text-amber-200/40">{form.is_public ? 'Public' : 'Private'}</span>
          </label>
        </div>
        {error && <p className="text-red-400/70 text-xs mt-3">{error}</p>}
        <button onClick={savePada} disabled={saving}
          className="mt-4 px-5 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm rounded-lg hover:bg-amber-500/20 transition-colors disabled:opacity-40">
          {saving ? 'Saving...' : 'Save Pada'}
        </button>
      </div>

      {/* Padas list */}
      <div className="space-y-3">
        {padas.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
            className="flex items-start justify-between gap-4 p-4 border border-amber-900/15 rounded-lg bg-amber-950/5">
            <div className="flex-1 min-w-0">
              <p className="text-amber-100/80 text-sm">{p.title}</p>
              <p className="text-amber-700/50 text-xs mt-0.5">{p.language} · {p.is_public ? 'Public' : 'Private'}{p.audio_url ? ' · ♪ Audio' : ''}</p>
            </div>
            <button onClick={() => deletePada(p.id)} className="text-xs text-red-800/50 hover:text-red-600/70 transition-colors shrink-0">
              Delete
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
