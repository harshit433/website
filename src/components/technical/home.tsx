'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const stats = [
  { value: '10+', label: 'Projects' },
  { value: '5+', label: 'Research Areas' },
  { value: '2', label: 'Startups' },
  { value: '10+', label: 'Achievements' },
]

const projects = [
  { name: 'Stremly', desc: 'AI platform for building & deploying multi-agent systems', tags: ['AI', 'Agents'] },
  { name: 'Nos', desc: 'Browser automation that thinks, adapts and acts like a human', tags: ['Automation'] },
  { name: 'Orion', desc: 'A research operating system for experimenting with the future of AI', tags: ['Research', 'AI'] },
  { name: 'AGI Research', desc: 'Exploring the path towards AGI through ethics and simulations', tags: ['Research'] },
]

export function TechnicalHome() {
  return (
    <div className="pt-20 min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <section className="px-6 md:px-16 pt-24 pb-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs tracking-widest text-zinc-500 uppercase mb-6"
            >
              Builder · Researcher · Explorer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-semibold text-zinc-100 leading-tight max-w-3xl"
            >
              I build intelligent systems that automate the{' '}
              <span className="text-amber-400">future.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-zinc-400 max-w-xl text-lg leading-relaxed"
            >
              From AI agents to browser automation, I explore the edge of technology to create impact at scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex gap-4"
            >
              <Link href="/projects" className="px-5 py-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm rounded hover:bg-amber-500/20 transition-colors">
                Explore My Work →
              </Link>
              <Link href="/about" className="px-5 py-2.5 text-zinc-400 text-sm hover:text-zinc-100 transition-colors">
                About Me
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="shrink-0 md:pt-4"
          >
            <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-zinc-800/60 ring-1 ring-zinc-700/20">
              <Image
                src="/harshit.png"
                alt="Harshit Aggarwal"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex gap-10 flex-wrap"
        >
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl font-semibold text-zinc-100">{value}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 md:px-16 pb-24 max-w-7xl mx-auto">
        <div className="border-t border-zinc-800/60 pt-12">
          <p className="text-xs text-zinc-600 tracking-widest uppercase mb-8">Featured Projects</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="p-5 border border-zinc-800/60 rounded-lg hover:border-zinc-700/60 transition-colors group cursor-pointer"
              >
                <div className="w-6 h-6 rounded border border-amber-500/30 flex items-center justify-center text-[10px] text-amber-400 mb-4">
                  {p.name[0]}
                </div>
                <h3 className="text-sm font-medium text-zinc-200 mb-2">{p.name}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{p.desc}</p>
                <div className="mt-4 flex gap-1.5 flex-wrap">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 bg-zinc-800/60 text-zinc-500 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gurmukhi quote footer strip */}
      <div className="border-t border-zinc-900 py-4 px-6 text-center">
        <p className="text-xs text-zinc-700 tracking-wide italic">
          मन चंगा तो कठौती में गंगा ॥
        </p>
      </div>
    </div>
  )
}
