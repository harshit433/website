'use client'

import { createContext, useContext } from 'react'

export type SiteMode = 'technical' | 'spiritual'

export interface ModeContextValue {
  mode: SiteMode
  setMode: (mode: SiteMode) => void
  toggle: () => void
}

export const ModeContext = createContext<ModeContextValue>({
  mode: 'technical',
  setMode: () => {},
  toggle: () => {},
})

export function useMode() {
  return useContext(ModeContext)
}
