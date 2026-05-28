'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const supabase = createClient()

  async function signup() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { display_name: name } }
    })
    setLoading(false)
    if (error) { setError(error.message); return }
    setDone(true)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center px-6 text-center">
        <div>
          <Image src="/logo.png" alt="Sakhi" width={72} height={72} className="mx-auto mb-4" />
          <h2 className="text-xl font-light text-amber-50/80" style={{ fontFamily: 'serif' }}>Check your email</h2>
          <p className="text-amber-200/30 text-sm mt-3 max-w-xs mx-auto">
            We sent a confirmation link to <span className="text-amber-400/70">{email}</span>. Click it to activate your account.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Image src="/logo.png" alt="Sakhi" width={72} height={72} className="mx-auto mb-4" />
          <h1 className="text-xl font-light text-amber-50/80" style={{ fontFamily: 'serif' }}>Join Sakhi</h1>
          <p className="text-amber-200/30 text-sm mt-1">Create your space</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Display name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-amber-950/10 border border-amber-900/20 rounded-lg px-4 py-3 text-sm text-amber-100/80 placeholder-amber-800/40 outline-none focus:border-amber-700/40 transition-colors"
          />
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
            onKeyDown={e => e.key === 'Enter' && signup()}
            className="w-full bg-amber-950/10 border border-amber-900/20 rounded-lg px-4 py-3 text-sm text-amber-100/80 placeholder-amber-800/40 outline-none focus:border-amber-700/40 transition-colors"
          />
          {error && <p className="text-red-400/70 text-xs">{error}</p>}
          <button
            onClick={signup}
            disabled={loading}
            className="w-full py-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm rounded-lg hover:bg-amber-500/20 transition-colors disabled:opacity-40"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </div>

        <p className="text-center text-amber-200/30 text-xs mt-6">
          Have an account?{' '}
          <Link href="/auth/login" className="text-amber-400/70 hover:text-amber-400 underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
