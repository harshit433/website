'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ModeToggle } from '@/components/mode-toggle'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/research', label: 'Research' },
  { href: '/writing', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
]

export function TechnicalNav() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <Image
          src="/ha-logo.png"
          alt="HA"
          width={36}
          height={36}
          className="opacity-90 hover:opacity-100 transition-opacity"
          priority
        />
        <span className="text-sm font-medium tracking-wide text-zinc-200">Harshit Aggarwal</span>
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
                : 'text-zinc-400 hover:text-zinc-100'
            )}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-[10px] text-zinc-600 tracking-widest uppercase">Builder · Researcher · Explorer</span>
        <ModeToggle />
      </div>
    </header>
  )
}
