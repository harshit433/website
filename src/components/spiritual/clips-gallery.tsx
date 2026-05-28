'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { getEmbedUrl, getYoutubeThumbnail, secondsToTime } from '@/lib/youtube'
import type { BhaktiClip } from '@/lib/supabase/types'

const RASA_TYPES = ['All', 'Kirtan', 'Katha', 'Pravachan', 'Gyan', 'Bhajan']

export function ClipsGallery({ clips }: { clips: BhaktiClip[] }) {
  const [selected, setSelected] = useState<BhaktiClip | null>(null)
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? clips : clips.filter(c => c.rasa_type === filter)

  return (
    <div className="pt-24 min-h-screen bg-[#0c0a08] px-6 md:px-16 pb-24 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs text-amber-600 tracking-widest uppercase mb-2">Sakhi · Bhakti Ras</p>
        <h1 className="text-3xl font-light text-amber-50" style={{ fontFamily: 'serif' }}>
          Clips that moved me
        </h1>
        <p className="text-sm text-amber-200/75 mt-2">Curated moments of gyan, kirtan, and katha.</p>
      </motion.div>

      {/* Rasa filter */}
      <div className="mt-8 flex gap-2 flex-wrap">
        {RASA_TYPES.map(r => (
          <button
            key={r}
            onClick={() => setFilter(r)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              filter === r
                ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                : 'border-amber-900/20 text-amber-200/75 hover:text-amber-200/60'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {clips.length === 0 && (
        <div className="mt-20 text-center text-amber-200/20 text-sm">
          No clips yet. Add your first one from the admin panel.
        </div>
      )}

      {/* Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((clip, i) => {
          const thumb = clip.thumbnail_url || getYoutubeThumbnail(clip.youtube_id)
          return (
            <motion.button
              key={clip.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(clip)}
              className="text-left group"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video rounded-lg overflow-hidden border border-amber-900/20 group-hover:border-amber-700/30 transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb}
                  alt={clip.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-black/50 border border-amber-500/30 flex items-center justify-center text-amber-400 text-sm group-hover:bg-amber-950/60 transition-colors">
                    ▶
                  </div>
                </div>
                {/* Clip indicator */}
                {(clip.start_seconds || clip.end_seconds) && (
                  <div className="absolute bottom-2 right-2 text-[10px] bg-black/60 text-amber-400/80 px-1.5 py-0.5 rounded">
                    {clip.start_seconds ? secondsToTime(clip.start_seconds) : '0:00'}
                    {' → '}
                    {clip.end_seconds ? secondsToTime(clip.end_seconds) : 'end'}
                  </div>
                )}
                {clip.rasa_type && (
                  <div className="absolute top-2 left-2 text-[10px] bg-amber-950/70 text-amber-400/80 px-2 py-0.5 rounded border border-amber-800/30">
                    {clip.rasa_type}
                  </div>
                )}
              </div>

              <div className="mt-3">
                <h3 className="text-amber-100 text-sm font-medium leading-snug">{clip.title}</h3>
                {clip.description && (
                  <p className="text-amber-200/75 text-xs mt-1 leading-relaxed line-clamp-2">{clip.description}</p>
                )}
                <div className="mt-2 flex gap-1.5 flex-wrap">
                  {clip.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 bg-amber-900/20 text-amber-600 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Video player modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={e => e.stopPropagation()}
            className="bg-[#100d0a] border border-amber-900/30 rounded-xl overflow-hidden max-w-3xl w-full"
          >
            <div className="aspect-video w-full">
              <iframe
                src={getEmbedUrl(selected.youtube_id, selected.start_seconds, selected.end_seconds) + '&autoplay=1'}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <div className="p-5">
              {selected.rasa_type && (
                <span className="text-[10px] text-amber-500/60 tracking-widest uppercase">{selected.rasa_type}</span>
              )}
              <h3 className="text-amber-100/90 font-medium mt-1">{selected.title}</h3>
              {selected.description && (
                <p className="text-amber-200/75 text-sm mt-2 leading-relaxed">{selected.description}</p>
              )}
              {(selected.start_seconds || selected.end_seconds) && (
                <p className="text-xs text-amber-600 mt-2">
                  Playing from {selected.start_seconds ? secondsToTime(selected.start_seconds) : '0:00'} to{' '}
                  {selected.end_seconds ? secondsToTime(selected.end_seconds) : 'end'}
                </p>
              )}
              <button
                onClick={() => setSelected(null)}
                className="mt-4 text-xs text-amber-600 hover:text-amber-500/70 transition-colors"
              >
                ← Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
