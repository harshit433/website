'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Pada } from '@/lib/supabase/types'

export function PadasGallery({ padas }: { padas: Pada[] }) {
  const [selected, setSelected] = useState<Pada | null>(null)
  const [filter, setFilter] = useState<string>('All')

  const languages = ['All', ...Array.from(new Set(padas.map(p => p.language)))]

  const filtered = filter === 'All' ? padas : padas.filter(p => p.language === filter)

  return (
    <div className="pt-24 min-h-screen bg-[#0c0a08] px-6 md:px-16 pb-24 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs text-amber-600 tracking-widest uppercase mb-2">Sakhi · Padas</p>
        <h1 className="text-3xl font-light text-amber-50" style={{ fontFamily: 'serif' }}>
          Songs of devotion
        </h1>
        <p className="text-sm text-amber-200/75 mt-2">Written in the language of the heart.</p>
      </motion.div>

      {/* Language filter */}
      <div className="mt-8 flex gap-2 flex-wrap">
        {languages.map(lang => (
          <button
            key={lang}
            onClick={() => setFilter(lang)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              filter === lang
                ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                : 'border-amber-900/20 text-amber-200/75 hover:text-amber-200/60'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {padas.length === 0 && (
        <div className="mt-20 text-center text-amber-200/20 text-sm">
          No padas yet. The first one will appear here.
        </div>
      )}

      {/* Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((pada, i) => (
          <motion.button
            key={pada.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelected(pada)}
            className="text-left p-5 border border-amber-900/20 rounded-lg hover:border-amber-700/30 bg-amber-950/10 hover:bg-amber-950/20 transition-all group"
          >
            <div className="text-amber-600/40 text-xs tracking-widest uppercase mb-3">{pada.language}</div>
            <h3 className="text-amber-100 font-medium mb-3">{pada.title}</h3>
            <p className="text-amber-200/75 text-sm leading-relaxed line-clamp-3">
              {pada.lyrics.split('\n').slice(0, 2).join('\n')}
            </p>
            {pada.audio_url && (
              <div className="mt-4 text-xs text-amber-500/40 flex items-center gap-1">
                <span>♪</span> Audio available
              </div>
            )}
            <div className="mt-3 flex gap-1.5 flex-wrap">
              {pada.tags.map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 bg-amber-900/20 text-amber-600 rounded">
                  {t}
                </span>
              ))}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Pada detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={e => e.stopPropagation()}
            className="bg-[#100d0a] border border-amber-900/30 rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="text-amber-600/40 text-xs tracking-widest uppercase mb-2">{selected.language}</div>
            <h2 className="text-2xl font-light text-amber-50 mb-6" style={{ fontFamily: 'serif' }}>
              {selected.title}
            </h2>

            {selected.audio_url && (
              <audio controls className="w-full mb-6 opacity-70" src={selected.audio_url} />
            )}

            <pre className="text-amber-100/90 text-sm leading-loose whitespace-pre-wrap">
              {selected.lyrics}
            </pre>

            <button
              onClick={() => setSelected(null)}
              className="mt-8 text-xs text-amber-600 hover:text-amber-500/70 transition-colors"
            >
              ← Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}
