'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@/lib/supabase/types'

export function SettingsPage({ user, profile }: { user: User; profile: Profile | null }) {
  const [displayName, setDisplayName] = useState(profile?.display_name ?? '')
  const [bio, setBio] = useState(profile?.bio ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwLoading, setPwLoading] = useState(false)
  const [pwError, setPwError] = useState('')
  const [pwDone, setPwDone] = useState(false)

  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  async function saveProfile() {
    setSaving(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from('profiles') as any).update({ display_name: displayName, bio }).eq('id', user.id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function changePassword() {
    setPwError('')
    if (newPassword !== confirmPassword) { setPwError('Passwords do not match'); return }
    if (newPassword.length < 6) { setPwError('Password must be at least 6 characters'); return }
    setPwLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setPwLoading(false)
    if (error) { setPwError(error.message); return }
    setPwDone(true)
    setCurrentPassword(''); setNewPassword(''); setConfirmPassword('')
    setTimeout(() => setPwDone(false), 3000)
  }

  async function deleteAccount() {
    if (deleteConfirm !== 'DELETE') return
    setDeleting(true)
    await supabase.auth.signOut()
    const res = await fetch('/api/auth/delete-account', { method: 'DELETE' })
    if (res.ok) {
      router.push('/')
    } else {
      setDeleting(false)
      setShowDeleteModal(false)
    }
  }

  return (
    <div className="pt-24 min-h-screen bg-[#0c0a08] px-6 md:px-16 pb-24 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs text-amber-600 tracking-widest uppercase mb-2">Sakhi · Settings</p>
        <h1 className="text-2xl font-light text-amber-50 mb-1" style={{ fontFamily: 'serif' }}>Account</h1>
        <p className="text-amber-200/75 text-xs">{user.email}</p>
      </motion.div>

      {/* Profile section */}
      <section className="mt-10">
        <h2 className="text-xs text-amber-600 tracking-widest uppercase mb-5">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-amber-200/75 block mb-1.5">Display name</label>
            <input
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="w-full bg-amber-950/10 border border-amber-900/20 rounded-lg px-4 py-2.5 text-sm text-amber-100 placeholder-amber-800/40 outline-none focus:border-amber-700/40 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-amber-200/75 block mb-1.5">Bio</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={3}
              className="w-full bg-amber-950/10 border border-amber-900/20 rounded-lg px-4 py-2.5 text-sm text-amber-100 placeholder-amber-800/40 outline-none focus:border-amber-700/40 transition-colors resize-none"
            />
          </div>
          <button
            onClick={saveProfile}
            disabled={saving}
            className="px-5 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs rounded-lg hover:bg-amber-500/20 transition-colors disabled:opacity-40"
          >
            {saved ? '✓ Saved' : saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </section>

      <div className="my-8 h-px bg-amber-900/15" />

      {/* Change password */}
      <section>
        <h2 className="text-xs text-amber-600 tracking-widest uppercase mb-5">Change Password</h2>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="w-full bg-amber-950/10 border border-amber-900/20 rounded-lg px-4 py-2.5 text-sm text-amber-100 placeholder-amber-800/40 outline-none focus:border-amber-700/40 transition-colors"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full bg-amber-950/10 border border-amber-900/20 rounded-lg px-4 py-2.5 text-sm text-amber-100 placeholder-amber-800/40 outline-none focus:border-amber-700/40 transition-colors"
          />
          {pwError && <p className="text-red-400/70 text-xs">{pwError}</p>}
          {pwDone && <p className="text-emerald-400/70 text-xs">✓ Password updated</p>}
          <button
            onClick={changePassword}
            disabled={pwLoading || !newPassword || !confirmPassword}
            className="px-5 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs rounded-lg hover:bg-amber-500/20 transition-colors disabled:opacity-40"
          >
            {pwLoading ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </section>

      <div className="my-8 h-px bg-amber-900/15" />

      {/* Danger zone */}
      <section>
        <h2 className="text-xs text-red-800/60 tracking-widest uppercase mb-5">Danger Zone</h2>
        <div className="p-5 border border-red-900/20 rounded-lg bg-red-950/5">
          <h3 className="text-sm text-red-300/60 mb-1">Delete account</h3>
          <p className="text-xs text-red-200/30 mb-4 leading-relaxed">
            This permanently deletes your account, all journal entries, and messages. This cannot be undone.
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 border border-red-800/30 text-red-400/60 text-xs rounded-lg hover:bg-red-950/20 hover:text-red-400/80 transition-colors"
          >
            Delete my account
          </button>
        </div>
      </section>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#100d0a] border border-red-900/30 rounded-xl p-8 max-w-sm w-full"
          >
            <h2 className="text-lg font-light text-red-300/80 mb-2">Delete account?</h2>
            <p className="text-amber-200/75 text-sm mb-6 leading-relaxed">
              All your data will be permanently erased. Type <span className="text-red-400/80 font-mono">DELETE</span> to confirm.
            </p>
            <input
              type="text"
              placeholder="Type DELETE to confirm"
              value={deleteConfirm}
              onChange={e => setDeleteConfirm(e.target.value)}
              className="w-full bg-red-950/10 border border-red-900/20 rounded-lg px-4 py-2.5 text-sm text-amber-100 placeholder-amber-800/30 outline-none focus:border-red-700/40 transition-colors mb-5 font-mono"
            />
            <div className="flex gap-3">
              <button
                onClick={() => { setShowDeleteModal(false); setDeleteConfirm('') }}
                className="flex-1 py-2 text-xs text-amber-200/75 hover:text-amber-200/70 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={deleteAccount}
                disabled={deleteConfirm !== 'DELETE' || deleting}
                className="flex-1 py-2 bg-red-950/20 border border-red-800/40 text-red-400/70 text-xs rounded-lg hover:bg-red-950/40 transition-colors disabled:opacity-30"
              >
                {deleting ? 'Deleting...' : 'Delete permanently'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
