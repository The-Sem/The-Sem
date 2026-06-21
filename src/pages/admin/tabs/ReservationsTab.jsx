import { useState } from 'react'

const STATUS_OPTIONS = [
  { id: 'open', label: 'Open', className: 'bg-sage-light text-sage-deep' },
  { id: 'limited', label: 'Limited Availability', className: 'bg-brass/20 text-brass' },
  { id: 'full', label: 'House Full', className: 'bg-red-100 text-red-600' },
]

// Sample reservation rows — replaced by a Supabase "reservations" query.
const SAMPLE_RESERVATIONS = [
  { id: 1, name: 'Pemba Dorjee', phone: '+91 98000 11111', guests: 4, date: '2026-06-20', time: '19:30', status: 'Confirmed' },
  { id: 2, name: 'Anjali Rai', phone: '+91 98000 22222', guests: 2, date: '2026-06-20', time: '20:00', status: 'Confirmed' },
  { id: 3, name: 'Tashi Wangchuk', phone: '+91 98000 33333', guests: 6, date: '2026-06-21', time: '18:30', status: 'Pending' },
  { id: 4, name: 'Karma Lepcha', phone: '+91 98000 44444', guests: 3, date: '2026-06-22', time: '21:00', status: 'Confirmed' },
]

export default function ReservationsTab() {
  const [status, setStatus] = useState('open')

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold sm:text-3xl">Reservations</h1>
      <p className="mt-1 text-sm text-ink/60">
        Manage table availability and view incoming bookings.
      </p>

      {/* Status control */}
      <div className="mt-6 rounded-2xl bg-ivory p-5 shadow-sm ring-1 ring-ink/5">
        <p className="text-sm font-medium text-ink/80">Restaurant Status</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setStatus(opt.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                status === opt.id
                  ? `${opt.className} ring-2 ring-offset-1 ring-pink-deep/40`
                  : 'bg-ink/5 text-ink/50 hover:bg-ink/10'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {status === 'full' && (
          <p className="mt-3 inline-block rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
            Guests will see: &ldquo;Sorry, we&rsquo;re fully booked for this slot.&rdquo;
          </p>
        )}
      </div>

      {/* Reservation table */}
      <div className="mt-6 overflow-x-auto rounded-2xl bg-ivory shadow-sm ring-1 ring-ink/5">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink/50">
              <th className="px-5 py-3.5">Name</th>
              <th className="px-5 py-3.5">Phone</th>
              <th className="px-5 py-3.5">Guests</th>
              <th className="px-5 py-3.5">Date</th>
              <th className="px-5 py-3.5">Time</th>
              <th className="px-5 py-3.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_RESERVATIONS.map((r) => (
              <tr key={r.id} className="border-b border-ink/5 last:border-0">
                <td className="px-5 py-3.5 font-medium">{r.name}</td>
                <td className="px-5 py-3.5 text-ink/70">{r.phone}</td>
                <td className="px-5 py-3.5 text-ink/70">{r.guests}</td>
                <td className="px-5 py-3.5 text-ink/70">{r.date}</td>
                <td className="px-5 py-3.5 text-ink/70">{r.time}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      r.status === 'Confirmed'
                        ? 'bg-sage-light text-sage-deep'
                        : 'bg-brass/20 text-brass'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-ink/40">
        Sample data shown. Connect Supabase to load live reservations, sync to
        Google Sheets, and trigger confirmation emails — see SUPABASE_SETUP.md.
      </p>
    </div>
  )
}
