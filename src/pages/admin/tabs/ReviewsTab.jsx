import { useState } from 'react'
import { Check, EyeOff, Trash2, Download, Star } from 'lucide-react'
import { REVIEWS } from '../../../data/reviews'

export default function ReviewsTab() {
  const [reviews, setReviews] = useState(REVIEWS.map((r) => ({ ...r, hidden: false })))

  const setApproved = (id, approved) =>
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved } : r)))

  const setHidden = (id, hidden) =>
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, hidden } : r)))

  const deleteReview = (id) => setReviews((prev) => prev.filter((r) => r.id !== id))

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold sm:text-3xl">Reviews</h1>
          <p className="mt-1 text-sm text-ink/60">
            Approve, hide, or remove guest reviews before they go public.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ivory transition-transform duration-200 hover:scale-105">
          <Download size={16} /> Export to Excel
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {reviews.map((r) => (
          <div
            key={r.id}
            className={`rounded-2xl bg-ivory p-5 shadow-sm ring-1 ring-ink/5 ${
              r.hidden ? 'opacity-50' : ''
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{r.name}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      r.approved
                        ? 'bg-sage-light text-sage-deep'
                        : 'bg-brass/20 text-brass'
                    }`}
                  >
                    {r.approved ? 'Approved' : 'Pending'}
                  </span>
                  {r.hidden && (
                    <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[11px] font-semibold text-ink/60">
                      Hidden
                    </span>
                  )}
                </div>
                <div className="mt-1 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < r.rating ? 'fill-pink-deep text-pink-deep' : 'text-ink/15'}
                    />
                  ))}
                </div>
                <p className="mt-2 max-w-md text-sm text-ink/70">{r.text}</p>
              </div>

              <div className="flex flex-shrink-0 gap-2">
                <button
                  onClick={() => setApproved(r.id, !r.approved)}
                  aria-label="Toggle approval"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-light text-sage-deep"
                >
                  <Check size={15} />
                </button>
                <button
                  onClick={() => setHidden(r.id, !r.hidden)}
                  aria-label="Toggle hidden"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-brass/20 text-brass"
                >
                  <EyeOff size={15} />
                </button>
                <button
                  onClick={() => deleteReview(r.id)}
                  aria-label="Delete review"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-500"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {reviews.length === 0 && (
          <p className="py-10 text-center text-sm text-ink/50">No reviews to manage.</p>
        )}
      </div>
    </div>
  )
}
