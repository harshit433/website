'use client'

import { motion } from 'framer-motion'

const projects = [
  { name: 'Stremly', tag: 'AI Platform', status: 'Active', desc: 'An AI platform for building, deploying and managing intelligent agents that automate complex reasoning and decision-making.', tags: ['Agents', 'AI', 'Automation'] },
  { name: 'Nos', tag: 'Browser Automation', status: 'Active', desc: 'Browser automation that thinks, sees and acts like a human. Navigate, interact and extract data from any website autonomously.', tags: ['Automation', 'Browser'] },
  { name: 'Orion', tag: 'AI Research OS', status: 'Building', desc: 'A research operating system for experimenting with the future of AI. Modular, extensible and built for superintelligence research.', tags: ['Research', 'AI', 'Tools'] },
  { name: 'AGI Research', tag: 'Research', status: 'Ongoing', desc: 'Exploring the path towards AGI through ethics, simulations and interpretability. Documenting the journey openly.', tags: ['AGI', 'Ethics', 'Research'] },
]

const statusColor: Record<string, string> = {
  Active: 'text-emerald-400/60',
  Building: 'text-amber-400/60',
  Ongoing: 'text-blue-400/60',
}

export default function ProjectsPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#0a0a0a] px-6 md:px-16 pb-24 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs text-zinc-600 tracking-widest uppercase mb-4">My Work</p>
        <h1 className="text-4xl font-semibold text-zinc-100">Projects</h1>
        <p className="mt-3 text-zinc-500 max-w-lg text-sm">
          From AI-powered platforms to intelligent automation tools, these are the products and systems I build and maintain.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="p-6 border border-zinc-800/60 rounded-xl hover:border-zinc-700/60 transition-colors group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-8 h-8 rounded border border-amber-500/30 flex items-center justify-center text-xs text-amber-400">
                {p.name[0]}
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs ${statusColor[p.status]}`}>{p.status}</span>
                <span className="text-[10px] text-zinc-600 border border-zinc-800 px-2 py-0.5 rounded">{p.tag}</span>
              </div>
            </div>
            <h3 className="text-lg font-medium text-zinc-200">{p.name}</h3>
            <p className="text-sm text-zinc-500 mt-2 leading-relaxed">{p.desc}</p>
            <div className="mt-4 flex gap-1.5 flex-wrap">
              {p.tags.map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 bg-zinc-800/60 text-zinc-500 rounded">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
