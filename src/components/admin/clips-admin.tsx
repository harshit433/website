'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { extractYoutubeId, timeToSeconds, getYoutubeThumbnail, secondsToTime } from '@/lib/youtube'
import type { BhaktiClip } from '@/lib/supabase/types'

const RASA_TYPES = ['Kirtan', 'Katha', 'Pravachan', 'Gyan', 'Bhajan']

const empty = { title: '', description: '', url: '', startTime: '', endTime: '', rasa_type: '', tags: '' }

export function ClipsAdmin({ clips: initial, userId }: { clips: BhaktiClip[]; userId: string }) {
  const [clips, setClips] = useState(initial)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  async function saveClip() {
    setError('')
    const youtubeId = extractYoutubeId(form.url)
    if (!youtubeId) { setError('Invalid YouTube URL'); return }
    if (!form.title) { setError('Title required'); return }

    setSaving(true)
    const thumbnail = getYoutubeThumbnail(youtubeId)
    const { data, error: err } = await supabase
      .from('bhakti_clips')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert({
        title: form.title,
        description: form.description || null,
        youtube_id: youtubeId,
        start_seconds: form.startTime ? timeToSeconds(form.startTime) : null,
        end_seconds: form.endTime ? timeToSeconds(form.endTime) : null,
        rasa_type: form.rasa_type || null,
        tags: form.tags ? form.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
        thumbnail_url: thumbnail,
        created_by: userId,
      } as any)
      .select()
      .single()
    setSaving(false)
    if (err) { setError(err.message); return }
    if (data) { setClips([data, ...clips]); setForm(empty) }
  }

  async function deleteClip(id: string) {
    await supabase.from('bhakti_clips').delete().eq('id', id)
    setClips(clips.filter(c => c.id !== id))
  }

  return (
    <div className="pt-24 min-h-screen bg-[#0c0a08] px-6 md:px-16 pb-24 max-w-5xl mx-auto">
      <h1 className="text-2xl font-light text-amber-50/80 mb-2" style={{ fontFamily: 'serif' }}>Admin · Bhakti Clips</h1>
      <p className="text-amber-200/30 text-sm mb-10">Add YouTube segments to the gallery.</p>

      {/* Add form */}
      <div className="p-6 border border-amber-900/20 rounded-xl bg-amber-950/10 mb-10">
        <h2 className="text-sm text-amber-200/60 mb-5">Add new clip</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Title *" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
            className="bg-transparent border border-amber-900/20 rounded-lg px-3 py-2 text-sm text-amber-100/80 placeholder-amber-800/40 outline-none focus:border-amber-700/40 col-span-full" />
          <input placeholder="YouTube URL * (e.g. https://youtube.com/watch?v=...)" value={form.url} onChange={e => setForm({...form, url: e.target.value})}
            className="bg-transparent border border-amber-900/20 rounded-lg px-3 py-2 text-sm text-amber-100/80 placeholder-amber-800/40 outline-none focus:border-amber-700/40 col-span-full" />
          <input placeholder="Start time (e.g. 3:05)" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})}
            className="bg-transparent border border-amber-900/20 rounded-lg px-3 py-2 text-sm text-amber-100/80 placeholder-amber-800/40 outline-none focus:border-amber-700/40" />
          <input placeholder="End time (e.g. 7:12)" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})}
            className="bg-transparent border border-amber-900/20 rounded-lg px-3 py-2 text-sm text-amber-100/80 placeholder-amber-800/40 outline-none focus:border-amber-700/40" />
          <select value={form.rasa_type} onChange={e => setForm({...form, rasa_type: e.target.value})}
            className="bg-[#0c0a08] border border-amber-900/20 rounded-lg px-3 py-2 text-sm text-amber-100/60 outline-none focus:border-amber-700/40">
            <option value="">Rasa type (optional)</option>
            {RASA_TYPES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <input placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})}
            className="bg-transparent border border-amber-900/20 rounded-lg px-3 py-2 text-sm text-amber-100/80 placeholder-amber-800/40 outline-none focus:border-amber-700/40" />
          <textarea placeholder="Description (optional)" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2}
            className="bg-transparent border border-amber-900/20 rounded-lg px-3 py-2 text-sm text-amber-100/80 placeholder-amber-800/40 outline-none focus:border-amber-700/40 resize-none col-span-full" />
        </div>
        {error && <p className="text-red-400/70 text-xs mt-3">{error}</p>}
        <button onClick={saveClip} disabled={saving}
          className="mt-4 px-5 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm rounded-lg hover:bg-amber-500/20 transition-colors disabled:opacity-40">
          {saving ? 'Saving...' : 'Add Clip'}
        </button>
      </div>

      {/* Clips list */}
      <div className="space-y-3">
        {clips.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
            className="flex items-center gap-4 p-4 border border-amber-900/15 rounded-lg bg-amber-950/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={getYoutubeThumbnail(c.youtube_id)} alt={c.title} className="w-20 h-12 object-cover rounded opacity-60" />
            <div className="flex-1 min-w-0">
              <p className="text-amber-100/80 text-sm truncate">{c.title}</p>
              <p className="text-amber-700/50 text-xs mt-0.5">
                {c.youtube_id}
                {c.start_seconds != null && ` · ${secondsToTime(c.start_seconds)} → ${c.end_seconds != null ? secondsToTime(c.end_seconds) : 'end'}`}
                {c.rasa_type && ` · ${c.rasa_type}`}
              </p>
            </div>
            <button onClick={() => deleteClip(c.id)} className="text-xs text-red-800/50 hover:text-red-600/70 transition-colors shrink-0">
              Delete
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
