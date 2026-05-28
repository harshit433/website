'use client'

import { motion } from 'framer-motion'

const papers = [
  { title: 'Agentic Workflows: Inference Parallelism for Multi-Agent Autonomous Systems', area: 'AI Agents', date: 'Nov 2024', tags: ['Agents', 'Inference'] },
  { title: 'Vision-Based Browser Automation Using Multimodal Models', area: 'Automation', date: 'Oct 2024', tags: ['Browser', 'Vision'] },
  { title: 'Scalable Orchestration for Multi-Agent Systems', area: 'Infrastructure', date: 'Sep 2024', tags: ['Orchestration', 'Agents'] },
  { title: 'Towards AGI: Challenges and Research Directions', area: 'Future Computing', date: 'Aug 2024', tags: ['AGI', 'Research'] },
]

const areas = ['All', 'AI Systems', 'Automation', 'Agents', 'AGI', 'Theory']

export default function ResearchPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#0a0a0a] px-6 md:px-16 pb-24 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs text-zinc-600 tracking-widest uppercase mb-4">Research</p>
        <h1 className="text-4xl font-semibold text-zinc-100">
          Exploring intelligence.<br />
          <span className="text-amber-400">Building the future.</span>
        </h1>
        <p className="mt-4 text-zinc-500 max-w-lg text-sm leading-relaxed">
          I conduct research at the intersection of AI, automation and human-computer interaction to build systems that are intelligent, autonomous and impactful.
        </p>
      </motion.div>

      <div className="mt-12 space-y-4">
        {papers.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-5 border border-zinc-800/60 rounded-xl hover:border-zinc-700/60 transition-colors group cursor-pointer">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-amber-500/60 mb-2">{p.area}</p>
                <h3 className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors">{p.title}</h3>
                <div className="mt-2 flex gap-1.5 flex-wrap">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 bg-zinc-800/60 text-zinc-500 rounded">{t}</span>
                  ))}
                </div>
              </div>
              <span className="text-xs text-zinc-600 shrink-0">{p.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
