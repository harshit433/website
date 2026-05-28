'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ModeToggle } from '@/components/mode-toggle'
import { cn } from '@/lib/utils'
import type { User } from '@supabase/supabase-js'

const links = [
  { href: '/sakhi', label: 'Home' },
  { href: '/sakhi/padas', label: 'Padas' },
  { href: '/sakhi/clips', label: 'Clips' },
  { href: '/sakhi/journal', label: 'Journal' },
  { href: '/sakhi/discussions', label: 'Satsang' },
]

export function SpiritualNav() {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-2 flex items-center justify-between border-b border-amber-900/20 bg-[#0c0a08]/85 backdrop-blur-md">
      {/* Logo */}
      <Link href="/sakhi" className="flex items-center">
        <Image
          src="/logo.png"
          alt="Sakhi"
          width={56}
          height={56}
          className="opacity-90 hover:opacity-100 transition-opacity"
          priority
        />
      </Link>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'text-xs tracking-wide transition-colors duration-200',
              pathname === href
                ? 'text-amber-400'
                : 'text-amber-200/70 hover:text-amber-100'
            )}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Right */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <Link href="/sakhi/settings" className="text-xs text-amber-200/70 hover:text-amber-100 transition-colors">
              Settings
            </Link>
            <button
              onClick={logout}
              className="text-xs text-amber-200/70 hover:text-amber-100 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="text-xs text-amber-400/70 hover:text-amber-400 border border-amber-700/30 px-3 py-1 rounded transition-colors hover:border-amber-600/50"
          >
            Sign In
          </Link>
        )}
        <ModeToggle />
      </div>
    </header>
  )
}
