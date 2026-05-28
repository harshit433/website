'use client'

import { motion } from 'framer-motion'

const journey = [
  { year: '2017', title: 'The Beginning', desc: 'Curious about life. Questions about everything.' },
  { year: '2018', title: 'Discovering Code', desc: 'First lines of code. A new language for building.' },
  { year: '2020', title: 'AI & Machine Learning', desc: 'Fell into the rabbit hole of intelligent systems.' },
  { year: '2022', title: 'Building & Exploring', desc: 'First startup attempt. Learning to ship.' },
  { year: '2023', title: 'Stremly & Nos', desc: 'Building platforms that make AI accessible.' },
  { year: '2024+', title: 'Currently Exploring', desc: 'Agents, Browser Automation, AGI research.' },
]

const drives = [
  { icon: '◎', title: 'Solving meaningful problems', desc: 'Technology should reduce friction, not add it.' },
  { icon: '⌬', title: 'Exploring the unknown', desc: 'Boundaries exist to be pushed past.' },
  { icon: '∞', title: 'Empowering through technology', desc: 'Build tools that give people leverage.' },
  { icon: '✦', title: 'Inner growth & devotion', desc: 'Growing through stillness as much as through action.' },
]

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#0a0a0a] px-6 md:px-16 pb-24 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs text-zinc-600 tracking-widest uppercase mb-4">About</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-zinc-100 leading-tight">
          Curious mind.<br />
          Relentless builder.<br />
          <span className="text-amber-400">Seeker at heart.</span>
        </h1>
        <p className="mt-6 text-zinc-400 max-w-lg text-base leading-relaxed">
          I explore the intersection of artificial intelligence, automation, and human potential to build systems that create impact and shape the future.
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Journey */}
        <div>
          <p className="text-xs text-zinc-600 tracking-widest uppercase mb-6">My journey so far</p>
          <div className="space-y-6">
            {journey.map((item, i) => (
              <motion.div key={item.year} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className="flex gap-5">
                <div className="text-xs text-amber-500/60 font-mono w-10 pt-0.5 shrink-0">{item.year}</div>
                <div>
                  <div className="text-sm font-medium text-zinc-300">{item.title}</div>
                  <div className="text-xs text-zinc-500 mt-1">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What drives me */}
        <div>
          <p className="text-xs text-zinc-600 tracking-widest uppercase mb-6">What drives me</p>
          <div className="space-y-5">
            {drives.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className="flex gap-4">
                <div className="text-amber-400/50 text-sm pt-0.5 w-5 shrink-0">{item.icon}</div>
                <div>
                  <div className="text-sm font-medium text-zinc-300">{item.title}</div>
                  <div className="text-xs text-zinc-500 mt-1">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-zinc-900">
        <p className="text-xs text-zinc-700 tracking-wide italic">
          दो राह, एक सफ़र ॥
        </p>
      </div>
    </div>
  )
}
