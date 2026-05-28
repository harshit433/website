'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const sections = [
  {
    href: '/sakhi/padas',
    icon: '♩',
    title: 'Padas',
    desc: 'Songs and compositions written in bhakti',
  },
  {
    href: '/sakhi/clips',
    icon: '▶',
    title: 'Bhakti Ras',
    desc: 'Curated clips of gyan, stories and kirtan',
  },
  {
    href: '/sakhi/journal',
    icon: '✦',
    title: 'Journal',
    desc: 'Daily thoughts, reflections and notes',
  },
  {
    href: '/sakhi/discussions',
    icon: '◎',
    title: 'Satsang',
    desc: 'Open discussions and community threads',
  },
]

export function SpiritualHome() {
  return (
    <div className="pt-20 min-h-screen bg-[#0c0a08]">
      <section className="px-6 md:px-16 pt-24 pb-16 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 inline-block"
        >
          <Image src="/logo.png" alt="Sakhi" width={100} height={100} className="mx-auto" priority />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-light text-amber-50/90 leading-snug"
          style={{ fontFamily: 'serif' }}
        >
          A space for the{' '}
          <span className="text-amber-400">path within.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-5 text-amber-200/70 max-w-md mx-auto text-base leading-relaxed"
        >
          Padas, reflections, curated bhakti — a personal space shared openly.
        </motion.p>
      </section>

      {/* Sections grid */}
      <section className="px-6 md:px-16 pb-24 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map((s, i) => (
            <motion.div
              key={s.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              <Link
                href={s.href}
                className="block p-6 border border-amber-900/20 rounded-lg hover:border-amber-700/30 bg-amber-950/10 hover:bg-amber-950/20 transition-all group"
              >
                <div className="text-amber-500/80 text-lg mb-4 group-hover:text-amber-400 transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-amber-50 text-base font-medium mb-1.5">{s.title}</h3>
                <p className="text-amber-200/70 text-sm leading-relaxed">{s.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gurmukhi strip */}
      <div className="border-t border-amber-900/15 py-5 px-6 text-center">
        <p className="text-sm text-amber-800/50 tracking-wide italic">
          राधे राधे जपो, चले आएंगे बिहारी ॥
        </p>
      </div>
    </div>
  )
}
