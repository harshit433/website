'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const socials = [
  { label: 'GitHub', href: 'https://github.com', handle: '@harshitaggarwal' },
  { label: 'LinkedIn', href: 'https://linkedin.com', handle: 'Harshit Aggarwal' },
  { label: 'X (Twitter)', href: 'https://x.com', handle: '@harshitaggarwal' },
  { label: 'Email', href: 'mailto:hello@harshitaggarwal.com', handle: 'hello@harshitaggarwal.com' },
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <div className="pt-24 min-h-screen bg-[#0a0a0a] px-6 md:px-16 pb-24 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs text-zinc-600 tracking-widest uppercase mb-4">Contact</p>
        <h1 className="text-4xl font-semibold text-zinc-100">
          Let&apos;s connect.<br />
          <span className="text-amber-400">Let&apos;s create impact.</span>
        </h1>
        <p className="mt-4 text-zinc-500 max-w-md text-sm leading-relaxed">
          Whether you have a question, a collaboration idea, or just want to start a meaningful conversation — I&apos;m here.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Message form */}
        {!sent ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
            <input placeholder="Your name" className="w-full bg-zinc-900/40 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600 transition-colors" />
            <input placeholder="Your email" type="email" className="w-full bg-zinc-900/40 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600 transition-colors" />
            <textarea placeholder="Your message" rows={5} className="w-full bg-zinc-900/40 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600 transition-colors resize-none" />
            <button onClick={() => setSent(true)} className="px-5 py-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm rounded-lg hover:bg-amber-500/20 transition-colors">
              Send Message →
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl text-amber-400/50 mb-3">✦</div>
              <p className="text-zinc-300">Message sent. I&apos;ll get back to you.</p>
            </div>
          </motion.div>
        )}

        {/* Socials */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <p className="text-xs text-zinc-600 tracking-widest uppercase mb-5">Other Ways to Connect</p>
          <div className="space-y-4">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-zinc-800/60 rounded-lg hover:border-zinc-700 transition-colors group">
                <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">{s.label}</span>
                <span className="text-xs text-zinc-600">{s.handle}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
