'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import type { JournalEntry } from '@/lib/supabase/types'
import type { User } from '@supabase/supabase-js'

export function JournalPage({ entries: initial, user }: { entries: JournalEntry[]; user: User | null }) {
  const [entries, setEntries] = useState(initial)
  const [writing, setWriting] = useState(false)
  const [selected, setSelected] = useState<JournalEntry | null>(null)
  const [form, setForm] = useState({ title: '', content: '', is_public: false })
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  async function saveEntry() {
    if (!user || !form.title || !form.content) return
    setSaving(true)
    const { data, error } = await supabase
      .from('journal_entries')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert({ ...form, user_id: user.id } as any)
      .select()
      .single()
    setSaving(false)
    if (!error && data) {
      setEntries([data, ...entries])
      setForm({ title: '', content: '', is_public: false })
      setWriting(false)
    }
  }

  async function deleteEntry(id: string) {
    await supabase.from('journal_entries').delete().eq('id', id)
    setEntries(entries.filter(e => e.id !== id))
    setSelected(null)
  }

  return (
    <div className="pt-24 min-h-screen bg-[#0c0a08] px-6 md:px-16 pb-24 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between">
        <div>
          <p className="text-xs text-amber-600 tracking-widest uppercase mb-2">Sakhi · Journal</p>
          <h1 className="text-3xl font-light text-amber-50" style={{ fontFamily: 'serif' }}>
            Daily reflections
          </h1>
          <p className="text-sm text-amber-200/75 mt-2">Thoughts from the path. Some shared, some kept close.</p>
        </div>
        {user && (
          <button
            onClick={() => setWriting(true)}
            className="mt-2 px-4 py-2 border border-amber-700/30 text-amber-400/80 text-xs rounded hover:bg-amber-950/30 transition-colors"
          >
            + New Entry
          </button>
        )}
      </motion.div>

      {!user && (
        <div className="mt-8 p-4 border border-amber-900/20 rounded-lg bg-amber-950/10 text-center">
          <p className="text-amber-200/75 text-sm">
            <a href="/auth/login" className="text-amber-400/70 hover:text-amber-400 underline underline-offset-2">Sign in</a>
            {' '}to write your own journal entries.
          </p>
        </div>
      )}

      {entries.length === 0 && (
        <div className="mt-20 text-center text-amber-200/20 text-sm">No entries yet.</div>
      )}

      {/* Entries list */}
      <div className="mt-10 space-y-3">
        {entries.map((entry, i) => (
          <motion.button
            key={entry.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => setSelected(entry)}
            className="w-full text-left p-5 border border-amber-900/20 rounded-lg hover:border-amber-700/30 bg-amber-950/10 hover:bg-amber-950/20 transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-amber-100 font-medium truncate">{entry.title}</h3>
                <p className="text-amber-200/75 text-sm mt-1 line-clamp-2 leading-relaxed">
                  {entry.content.replace(/<[^>]*>/g, '')}
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] text-amber-600">
                  {new Date(entry.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <div className={`mt-1 text-[10px] ${entry.is_public ? 'text-amber-500/50' : 'text-zinc-600'}`}>
                  {entry.is_public ? '◉ public' : '◎ private'}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Write modal */}
      <AnimatePresence>
        {writing && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#100d0a] border border-amber-900/30 rounded-xl p-8 max-w-2xl w-full"
            >
              <h2 className="text-lg font-light text-amber-50 mb-6" style={{ fontFamily: 'serif' }}>
                New entry
              </h2>
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full bg-transparent border-b border-amber-900/30 text-amber-100 placeholder-amber-800/40 pb-2 mb-5 text-sm outline-none focus:border-amber-700/50 transition-colors"
              />
              <textarea
                placeholder="What's on your mind today..."
                value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
                rows={8}
                className="w-full bg-transparent text-amber-100/90 placeholder-amber-800/30 text-sm outline-none resize-none leading-relaxed"
              />
              <div className="mt-6 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => setForm({ ...form, is_public: !form.is_public })}
                    className={`w-8 h-4 rounded-full border transition-colors relative ${
                      form.is_public ? 'bg-amber-500/20 border-amber-500/40' : 'bg-transparent border-amber-900/30'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-all ${
                      form.is_public ? 'right-0.5 bg-amber-400/70' : 'left-0.5 bg-zinc-600'
                    }`} />
                  </div>
                  <span className="text-xs text-amber-200/75">{form.is_public ? 'Public' : 'Private'}</span>
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setWriting(false)}
                    className="text-xs text-amber-600 hover:text-amber-500/70 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEntry}
                    disabled={saving || !form.title || !form.content}
                    className="text-xs px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded hover:bg-amber-500/20 transition-colors disabled:opacity-40"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Read modal */}
      <AnimatePresence>
        {selected && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#100d0a] border border-amber-900/30 rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-amber-600">
                  {new Date(selected.created_at).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <span className={`text-[10px] ${selected.is_public ? 'text-amber-500/50' : 'text-zinc-600'}`}>
                  {selected.is_public ? '◉ public' : '◎ private'}
                </span>
              </div>
              <h2 className="text-2xl font-light text-amber-50 mt-2 mb-6" style={{ fontFamily: 'serif' }}>
                {selected.title}
              </h2>
              <div className="text-amber-100/60 text-sm leading-relaxed whitespace-pre-wrap">
                {selected.content}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setSelected(null)}
                  className="text-xs text-amber-600 hover:text-amber-500/70 transition-colors"
                >
                  ← Close
                </button>
                {user && selected.user_id === user.id && (
                  <button
                    onClick={() => deleteEntry(selected.id)}
                    className="text-xs text-red-800/50 hover:text-red-600/70 transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
