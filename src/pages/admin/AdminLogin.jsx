import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'

// Demo-only client-side gate. Replace with real Supabase Auth
// (supabase.auth.signInWithPassword) per SUPABASE_SETUP.md before going live.
export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Enter both email and password.')
      return
    }
    // Placeholder auth — accepts any non-empty credentials for preview purposes.
    sessionStorage.setItem('sem-admin-auth', 'true')
    navigate('/admin/dashboard')
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-pink-light/30 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-ivory p-8 shadow-md">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-deep text-ivory">
            <Lock size={20} />
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold">Admin Login</h1>
          <p className="mt-1 text-sm text-ink/60">The Sem Management Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink/80">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="thesem63@gmail.com"
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink/80">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-field"
            />
          </label>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-pink-deep py-3 text-sm font-semibold uppercase tracking-wider text-ivory transition-transform duration-200 hover:scale-[1.02] hover:bg-pink"
          >
            Log In
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-ink/40">
          Preview mode — any email/password combination signs you in. Connect
          Supabase Auth before deploying.
        </p>
      </div>
    </section>
  )
}
