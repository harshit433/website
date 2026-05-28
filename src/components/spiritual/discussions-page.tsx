'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const CHANNELS = ['general', 'gyan', 'kirtan', 'seva', 'questions']

export function DiscussionsPage({ discussions: initial, user }: { discussions: any[]; user: User | null }) {
  const [discussions, setDiscussions] = useState(initial)
  const [channel, setChannel] = useState('general')
  const [newTitle, setNewTitle] = useState('')
  const [creating, setCreating] = useState(false)
  const supabase = createClient()

  const filtered = discussions.filter(d => d.channel === channel)

  async function createDiscussion() {
    if (!user || !newTitle.trim()) return
    setCreating(true)
    const { data, error } = await supabase
      .from('discussions')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert({ title: newTitle, channel, created_by: user.id } as any)
      .select('*, profiles(display_name, avatar_url)')
      .single()
    setCreating(false)
    if (!error && data) {
      setDiscussions([data, ...discussions])
      setNewTitle('')
    }
  }

  return (
    <div className="pt-24 min-h-screen bg-[#0c0a08] px-6 md:px-16 pb-24 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs text-amber-600 tracking-widest uppercase mb-2">Sakhi · Satsang</p>
        <h1 className="text-3xl font-light text-amber-50" style={{ fontFamily: 'serif' }}>
          Open discussions
        </h1>
        <p className="text-sm text-amber-200/75 mt-2">Ask, share, reflect — together.</p>
      </motion.div>

      {/* Channel tabs */}
      <div className="mt-8 flex gap-2 flex-wrap">
        {CHANNELS.map(c => (
          <button
            key={c}
            onClick={() => setChannel(c)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors capitalize ${
              channel === c
                ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                : 'border-amber-900/20 text-amber-200/75 hover:text-amber-200/60'
            }`}
          >
            #{c}
          </button>
        ))}
      </div>

      {/* New thread input */}
      {user ? (
        <div className="mt-8 flex gap-3">
          <input
            type="text"
            placeholder="Start a new thread..."
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && createDiscussion()}
            className="flex-1 bg-amber-950/10 border border-amber-900/20 rounded-lg px-4 py-2.5 text-sm text-amber-100 placeholder-amber-800/40 outline-none focus:border-amber-700/40 transition-colors"
          />
          <button
            onClick={createDiscussion}
            disabled={creating || !newTitle.trim()}
            className="px-4 py-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs rounded-lg hover:bg-amber-500/20 transition-colors disabled:opacity-40"
          >
            Post
          </button>
        </div>
      ) : (
        <div className="mt-8 p-4 border border-amber-900/20 rounded-lg bg-amber-950/10 text-center">
          <p className="text-amber-200/75 text-sm">
            <a href="/auth/login" className="text-amber-400/70 hover:text-amber-400 underline underline-offset-2">Sign in</a>
            {' '}to participate in discussions.
          </p>
        </div>
      )}

      {/* Discussions list */}
      <div className="mt-6 space-y-2">
        {filtered.length === 0 && (
          <div className="text-center text-amber-200/20 text-sm py-12">
            No threads in #{channel} yet. Start the first one.
          </div>
        )}
        {filtered.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="p-4 border border-amber-900/20 rounded-lg bg-amber-950/5 hover:bg-amber-950/15 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-amber-100 text-sm">{d.title}</h3>
                <p className="text-amber-600 text-xs mt-1">
                  {d.profiles?.display_name ?? 'Anonymous'} ·{' '}
                  {new Date(d.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </p>
              </div>
              <span className="text-[10px] text-amber-900/40 border border-amber-900/20 px-2 py-0.5 rounded capitalize">
                #{d.channel}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
