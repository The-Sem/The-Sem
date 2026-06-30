import { useState } from 'react'
import { CalendarCheck, Users, Clock, CheckCircle2 } from 'lucide-react'
import CitrusDivider from '../components/CitrusDivider'
import { supabase } from '../lib/supabase'

// In production this comes from the "restaurant_status" Supabase table,
// updated by the admin panel. Options: 'open' | 'limited' | 'full'.
const RESTAURANT_STATUS = 'open'

const STATUS_CONFIG = {
  open: {
    label: 'Open for Reservations',
    className: 'bg-sage-light text-sage-deep',
  },
  limited: {
    label: 'Limited Availability',
    className: 'bg-brass/20 text-brass',
  },
  full: {
    label: "Sorry, we're fully booked for this slot.",
    className: 'bg-red-100 text-red-600',
  },
}

const initialForm = {
  fullName: '',
  phone: '',
  email: '',
  guests: 2,
  date: '',
  time: '',
  requests: '',
}

export default function Reservation() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const status = STATUS_CONFIG[RESTAURANT_STATUS]
  const isFull = RESTAURANT_STATUS === 'full'

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const { error: insertError } = await supabase.from('reservations').insert({
      full_name: form.fullName,
      phone: form.phone,
      email: form.email,
      guests: Number(form.guests),
      reservation_date: form.date,
      reservation_time: form.time,
      special_requests: form.requests || null,
    })

    setSubmitting(false)

    if (insertError) {
      setError(
        'Something went wrong saving your reservation. Please try again, or contact us directly.'
      )
      console.error('Reservation insert failed:', insertError)
      return
    }

    // Email confirmation + Google Sheets sync happen via a Supabase Edge
    // Function (see SUPABASE_SETUP.md, sections 3 & 4) — not yet connected.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-28 text-center">
        <CheckCircle2 size={48} className="text-sage-deep" />
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
          Table Reserved!
        </h1>
        <p className="mt-2 max-w-sm text-ink/70">
          We&rsquo;ve got your booking for <strong>{form.fullName || 'you'}</strong>. We
          look forward to seeing you.
        </p>
        <button
          onClick={() => {
            setForm(initialForm)
            setSubmitted(false)
            setError('')
          }}
          className="twist-link mt-6 text-sm font-semibold text-pink-deep"
        >
          Make another reservation
        </button>
      </section>
    )
  }

  return (
    <section className="px-6 pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Reservations</p>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
          Reserve Your Table
        </h1>

        <span
          className={`mt-5 inline-block rounded-full px-4 py-1.5 text-sm font-semibold ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <CitrusDivider />

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-xl space-y-5 rounded-2xl bg-pink-light/30 p-6 sm:p-8"
      >
        <Field label="Full Name" required>
          <input
            type="text"
            required
            value={form.fullName}
            onChange={update('fullName')}
            placeholder="Your name"
            className="input-field"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone Number" required>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={update('phone')}
              placeholder="+91 90000 00000"
              className="input-field"
            />
          </Field>
          <Field label="Email" required>
            <input
              type="email"
              required
              value={form.email}
              onChange={update('email')}
              placeholder="you@email.com"
              className="input-field"
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Guests" icon={Users}>
            <input
              type="number"
              min={1}
              max={20}
              required
              value={form.guests}
              onChange={update('guests')}
              className="input-field"
            />
          </Field>
          <Field label="Date" icon={CalendarCheck}>
            <input
              type="date"
              required
              value={form.date}
              onChange={update('date')}
              className="input-field"
            />
          </Field>
          <Field label="Time" icon={Clock}>
            <input
              type="time"
              required
              value={form.time}
              onChange={update('time')}
              className="input-field"
            />
          </Field>
        </div>

        <Field label="Special Requests">
          <textarea
            value={form.requests}
            onChange={update('requests')}
            rows={3}
            placeholder="Allergies, occasion, seating preference..."
            className="input-field resize-none"
          />
        </Field>

        {isFull && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            We&rsquo;re fully booked for this slot — try a different date or time, or
            contact us directly.
          </p>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-pink-deep py-3.5 text-sm font-semibold uppercase tracking-wider text-ivory transition-transform duration-200 hover:scale-[1.02] hover:bg-pink disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {submitting ? 'Reserving…' : 'Reserve My Table'}
        </button>
      </form>
    </section>
  )
}

function Field({ label, children, required, icon: Icon }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-ink/80">
        {Icon && <Icon size={14} className="text-sage-deep" />}
        {label} {required && <span className="text-pink-deep">*</span>}
      </span>
      {children}
    </label>
  )
}
