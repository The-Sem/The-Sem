import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { GALLERY_IMAGES } from '../data/gallery'
import CitrusDivider from '../components/CitrusDivider'

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)

  const close = () => setActiveIndex(null)
  const next = () => setActiveIndex((i) => (i + 1) % GALLERY_IMAGES.length)
  const prev = () =>
    setActiveIndex((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)

  useEffect(() => {
    if (activeIndex === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex])

  return (
    <section className="px-6 pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-5xl text-center">
        <p className="eyebrow">Happy Guest Gallery</p>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
          Moments at The Sem
        </h1>
        <p className="mt-2 text-ink/60">A glimpse of the people, drinks, and nights here.</p>
      </div>

      <CitrusDivider />

      {/* Masonry-style grid via CSS columns */}
      <div className="mx-auto max-w-5xl columns-2 gap-4 sm:columns-3">
        {GALLERY_IMAGES.map((image, i) => (
          <button
            key={image.id}
            onClick={() => setActiveIndex(i)}
            className="mb-4 block w-full overflow-hidden rounded-2xl focus-visible:outline-pink-deep"
          >
            <img
              src={image.url}
              alt={image.caption}
              loading="lazy"
              className="w-full transition-transform duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20"
          >
            <X size={20} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20 sm:left-6"
          >
            <ChevronLeft size={22} />
          </button>

          <div onClick={(e) => e.stopPropagation()} className="max-h-[85vh] max-w-3xl">
            <img
              src={GALLERY_IMAGES[activeIndex].url}
              alt={GALLERY_IMAGES[activeIndex].caption}
              className="max-h-[75vh] w-full rounded-xl object-contain"
            />
            <p className="mt-3 text-center text-sm text-ivory/80">
              {GALLERY_IMAGES[activeIndex].caption}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20 sm:right-6"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </section>
  )
}
