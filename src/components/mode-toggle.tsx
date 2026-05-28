'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useMode } from '@/hooks/use-mode'

export function ModeToggle() {
  const { mode, toggle } = useMode()
  const isSpiritual = mode === 'spiritual'

  return (
    <button
      onClick={toggle}
      title={isSpiritual ? 'Switch to technical mode' : 'Switch to Sakhi'}
      className="relative flex items-center gap-2 group"
      aria-label="Toggle site mode"
    >
      <AnimatePresence mode="wait">
        {isSpiritual ? (
          <motion.span
            key="spiritual-label"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            className="text-xs text-amber-400/60 font-light tracking-widest uppercase hidden sm:block"
          >
            Sakhi
          </motion.span>
        ) : null}
      </AnimatePresence>

      {/* Toggle pill */}
      <div
        className={`relative w-10 h-5 rounded-full transition-colors duration-500 border ${
          isSpiritual
            ? 'bg-amber-950/40 border-amber-500/30'
            : 'bg-zinc-800/60 border-zinc-700/30'
        }`}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          className={`absolute top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] ${
            isSpiritual
              ? 'right-0.5 bg-amber-500/80'
              : 'left-0.5 bg-zinc-400/60'
          }`}
        >
          {isSpiritual ? '꩜' : '⌬'}
        </motion.div>
      </div>
    </button>
  )
}
