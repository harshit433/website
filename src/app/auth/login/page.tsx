'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function login() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) { setError(error.message); return }
    router.push('/sakhi')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-10">
          <Image src="/logo.png" alt="Sakhi" width={72} height={72} className="mx-auto mb-4" />
          <h1 className="text-xl font-light text-amber-50/80" style={{ fontFamily: 'serif' }}>Sakhi</h1>
          <p className="text-amber-200/30 text-sm mt-1">Sign in to continue</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-amber-950/10 border border-amber-900/20 rounded-lg px-4 py-3 text-sm text-amber-100/80 placeholder-amber-800/40 outline-none focus:border-amber-700/40 transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            className="w-full bg-amber-950/10 border border-amber-900/20 rounded-lg px-4 py-3 text-sm text-amber-100/80 placeholder-amber-800/40 outline-none focus:border-amber-700/40 transition-colors"
          />
          <div className="text-right">
            <Link href="/auth/forgot-password" className="text-xs text-amber-400/50 hover:text-amber-400/80 transition-colors">
              Forgot password?
            </Link>
          </div>
          {error && <p className="text-red-400/70 text-xs">{error}</p>}
          <button
            onClick={login}
            disabled={loading}
            className="w-full py-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm rounded-lg hover:bg-amber-500/20 transition-colors disabled:opacity-40"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>

        <p className="text-center text-amber-200/30 text-xs mt-6">
          No account?{' '}
          <Link href="/auth/signup" className="text-amber-400/70 hover:text-amber-400 underline underline-offset-2">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
