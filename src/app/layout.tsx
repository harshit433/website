import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ModeProvider } from '@/components/mode-provider'
import { SiteShell } from '@/components/site-shell'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Harshit Aggarwal',
  description: 'Builder, Researcher, Explorer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-[#0a0a0a]`}>
        <ModeProvider>
          <SiteShell>{children}</SiteShell>
        </ModeProvider>
      </body>
    </html>
  )
}
