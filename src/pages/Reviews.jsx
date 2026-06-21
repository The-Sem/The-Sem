import { useState } from 'react'
import { Star, ImagePlus } from 'lucide-react'
import { REVIEWS, GOOGLE_RATING } from '../data/reviews'
import CitrusDivider from '../components/CitrusDivider'

export default function Reviews() {
  const [reviews, setReviews] = useState(REVIEWS)
  const [form, setForm] = useState({ name: '', rating: 5, text: '' })
  const [submitted, setSubmitted] = useState(false)

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / Math.max(reviews.length, 1)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.text.trim()) return

    // TODO: insert into Supabase "reviews" table + append to Google Sheet.
    // New reviews are unapproved by default until the admin approves them.
    const newReview = {
      id: `local-${Date.now()}`,
      name: form.name,
      rating: form.rating,
      text: form.text,
      date: new Date().toISOString().slice(0, 10),
      photo: null,
      approved: true,
    }
    setReviews((prev) => [newReview, ...prev])
    setForm({ name: '', rating: 5, text: '' })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section className="px-6 pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">What Our Guests Say</p>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Reviews</h1>

        {/* Aggregate ratings */}
        <div className="mt-7 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
          <RatingSummary
            label="Guest Reviews"
            average={avgRating}
            total={reviews.length}
          />
          <RatingSummary
            label="Google Reviews"
            average={GOOGLE_RATING.average}
            total={GOOGLE_RATING.totalReviews}
          />
        </div>
      </div>

      <CitrusDivider />

      {/* Review submission form */}
      <div className="mx-auto max-w-xl rounded-2xl bg-pink-light/30 p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold">Share your experience</h2>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink/80">Name</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Your name"
              required
              className="input-field"
            />
          </label>

          <div>
            <span className="mb-1.5 block text-sm font-medium text-ink/80">Rating</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, rating: n }))}
                  aria-label={`${n} star${n > 1 ? 's' : ''}`}
                  className="p-0.5"
                >
                  <Star
                    size={26}
                    className={
                      n <= form.rating
                        ? 'fill-pink-deep text-pink-deep'
                        : 'text-ink/20'
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink/80">Feedback</span>
            <textarea
              value={form.text}
              onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
              rows={3}
              placeholder="Tell us about your visit..."
              required
              className="input-field resize-none"
            />
          </label>

          <button
            type="button"
            className="flex items-center gap-2 text-sm font-medium text-sage-deep"
          >
            <ImagePlus size={16} /> Add a photo (optional)
          </button>

          <button
            type="submit"
            className="w-full rounded-full bg-pink-deep py-3 text-sm font-semibold uppercase tracking-wider text-ivory transition-transform duration-200 hover:scale-[1.02] hover:bg-pink"
          >
            Submit Review
          </button>

          {submitted && (
            <p className="text-center text-sm font-medium text-sage-deep">
              Thank you! Your review has been submitted.
            </p>
          )}
        </form>
      </div>

      {/* Review list */}
      <div className="mx-auto mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold">Recent Reviews</h2>
        <div className="mt-5 space-y-4">
          {reviews
            .filter((r) => r.approved !== false)
            .map((r) => (
              <div
                key={r.id}
                className="rounded-2xl bg-ivory p-5 shadow-sm ring-1 ring-ink/5"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{r.name}</p>
                  <span className="text-xs text-ink/50">{r.date}</span>
                </div>
                <div className="mt-1 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < r.rating ? 'fill-pink-deep text-pink-deep' : 'text-ink/15'
                      }
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{r.text}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

function RatingSummary({ label, average, total }) {
  return (
    <div className="text-center">
      <p className="eyebrow">{label}</p>
      <div className="mt-1 flex items-center justify-center gap-2">
        <span className="font-display text-3xl font-semibold">{average.toFixed(1)}</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < Math.round(average) ? 'fill-pink-deep text-pink-deep' : 'text-ink/15'
              }
            />
          ))}
        </div>
      </div>
      <p className="text-xs text-ink/50">{total} reviews</p>
    </div>
  )
}
