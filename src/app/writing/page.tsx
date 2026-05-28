'use client'

import { motion } from 'framer-motion'

const posts = [
  { title: 'Why Multi-Agent Systems Will Define the Next Decade', category: 'AI', date: 'Dec 2024', readTime: '8 min' },
  { title: 'The Architecture of Autonomous Agents: A Practical Guide', category: 'Engineering', date: 'Nov 2024', readTime: '12 min' },
  { title: 'Building a Browser that Thinks: Lessons from Nos', category: 'Startup', date: 'Oct 2024', readTime: '6 min' },
  { title: 'Compounding Knowledge: How I Structure My Learning', category: 'Productivity', date: 'Sep 2024', readTime: '5 min' },
]

export default function WritingPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#0a0a0a] px-6 md:px-16 pb-24 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs text-zinc-600 tracking-widest uppercase mb-4">Writing</p>
        <h1 className="text-4xl font-semibold text-zinc-100">Notes & Essays</h1>
        <p className="mt-3 text-zinc-500 text-sm">Ideas, learnings, and things worth writing down.</p>
      </motion.div>

      <div className="mt-12 space-y-2">
        {posts.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="flex items-center justify-between p-4 border border-zinc-800/40 rounded-lg hover:border-zinc-700/60 hover:bg-zinc-900/20 transition-all cursor-pointer group">
            <div>
              <span className="text-xs text-amber-500/50 mr-3">{p.category}</span>
              <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors">{p.title}</span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-xs text-zinc-600">{p.readTime}</span>
              <span className="text-xs text-zinc-700">{p.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
