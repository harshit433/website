'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Supabase sets the session from the recovery link automatically
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true)
    })
  }, [])

  async function updatePassword() {
    if (!password || password !== confirm) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (error) { setError(error.message); return }
    router.push('/sakhi')
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center px-6 text-center">
        <div>
          <Image src="/logo.png" alt="Sakhi" width={72} height={72} className="mx-auto mb-6" />
          <p className="text-amber-200/30 text-sm">Verifying your reset link...</p>
          <p className="text-amber-200/20 text-xs mt-2">If this takes too long, request a new link.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Image src="/logo.png" alt="Sakhi" width={72} height={72} className="mx-auto mb-4" />
          <h1 className="text-xl font-light text-amber-50/80" style={{ fontFamily: 'serif' }}>Set new password</h1>
          <p className="text-amber-200/30 text-sm mt-1">Choose a strong password</p>
        </div>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-amber-950/10 border border-amber-900/20 rounded-lg px-4 py-3 text-sm text-amber-100/80 placeholder-amber-800/40 outline-none focus:border-amber-700/40 transition-colors"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && updatePassword()}
            className="w-full bg-amber-950/10 border border-amber-900/20 rounded-lg px-4 py-3 text-sm text-amber-100/80 placeholder-amber-800/40 outline-none focus:border-amber-700/40 transition-colors"
          />
          {error && <p className="text-red-400/70 text-xs">{error}</p>}
          <button
            onClick={updatePassword}
            disabled={loading || !password || !confirm}
            className="w-full py-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm rounded-lg hover:bg-amber-500/20 transition-colors disabled:opacity-40"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
