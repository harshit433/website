'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useMode } from '@/hooks/use-mode'
import { TechnicalNav } from '@/components/technical/nav'
import { SpiritualNav } from '@/components/spiritual/nav'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { mode } = useMode()

  return (
    <>
      <AnimatePresence mode="wait">
        {mode === 'technical' ? (
          <motion.div key="tech-nav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <TechnicalNav />
          </motion.div>
        ) : (
          <motion.div key="spirit-nav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <SpiritualNav />
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>
    </>
  )
}
