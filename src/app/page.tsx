'use client'

import { useMode } from '@/hooks/use-mode'
import { TechnicalHome } from '@/components/technical/home'
import { SpiritualHome } from '@/components/spiritual/home'

export default function HomePage() {
  const { mode } = useMode()
  return mode === 'spiritual' ? <SpiritualHome /> : <TechnicalHome />
}
