import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Hero slider imagery — real photos of The Sem. Replace via the admin
// panel's hero slider uploader as new shots come in.
const SLIDES = [
  {
    url: '/images/hero-bar.jpg',
    alt: 'Backlit pink shelving stocked with spirits at The Sem bar',
  },
  {
    url: '/images/hero-spread.jpg',
    alt: 'A spread of cocktails and small plates at The Sem',
  },
  {
    url: '/images/hero-dining.jpg',
    alt: 'Cozy textured dining nook with warm pendant lighting',
  },
  {
    url: '/images/hero-masks.jpg',
    alt: 'Decorative Himalayan masks on a warmly lit wall at The Sem',
  },
]

const SLIDE_DURATION = 5500

export default function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length)
    }, SLIDE_DURATION)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative h-[100vh] min-h-[560px] w-full overflow-hidden">
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <img
          key={slide.url}
          src={slide.url}
          alt={slide.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {/* Overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/20 to-ink/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-ivory">
        <p className="eyebrow text-pink-light animate-fadeSlow">Ranipool, Gangtok &middot; Sikkim</p>

        <img
          src="/images/logo.png"
          alt="The Sem"
          className="mt-5 h-20 w-auto animate-fadeSlow drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)] sm:h-24 md:h-28"
        />

        <p className="mt-4 max-w-md font-display text-base italic text-ivory/85 sm:text-lg animate-fadeSlow">
          Where Stories Meet Spirits.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row animate-fadeIn">
          <Link
            to="/reservation"
            className="rounded-full bg-pink-deep px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-ivory transition-transform duration-200 hover:scale-105 hover:bg-pink"
          >
            Reserve a Table
          </Link>
          <Link
            to="/gallery"
            className="rounded-full border border-ivory/70 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-ivory backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-ivory hover:bg-ivory/10"
          >
            View Gallery
          </Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? 'w-7 bg-pink' : 'w-3 bg-ivory/50 hover:bg-ivory/80'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
