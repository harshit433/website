'use client'

import { useState, useEffect, useCallback } from 'react'
import { ModeContext, type SiteMode } from '@/hooks/use-mode'

function setCookie(mode: SiteMode) {
  document.cookie = `site-mode=${mode}; path=/; max-age=31536000; SameSite=Lax`
}

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<SiteMode>('technical')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('site-mode') as SiteMode | null
    if (saved === 'spiritual' || saved === 'technical') setModeState(saved)
    setMounted(true)
  }, [])

  const setMode = useCallback((m: SiteMode) => {
    setModeState(m)
    localStorage.setItem('site-mode', m)
    setCookie(m)
  }, [])

  const toggle = useCallback(() => {
    setMode(mode === 'technical' ? 'spiritual' : 'technical')
  }, [mode, setMode])

  if (!mounted) return null

  return (
    <ModeContext.Provider value={{ mode, setMode, toggle }}>
      <div data-mode={mode} className="min-h-screen transition-colors duration-500">
        {children}
      </div>
    </ModeContext.Provider>
  )
}
