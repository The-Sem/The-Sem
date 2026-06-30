import { useParams, Link, Navigate } from 'react-router-dom'
import { Instagram, ArrowLeft } from 'lucide-react'
import { FOUNDERS } from '../data/founders'
import CitrusDivider from '../components/CitrusDivider'

export default function FounderPage() {
  const { slug } = useParams()
  const founder = FOUNDERS[slug]

  if (!founder) return <Navigate to="/" replace />

  return (
    <section className="px-6 pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="twist-link inline-flex items-center gap-1.5 text-sm font-medium text-ink/60"
        >
          <ArrowLeft size={15} /> Back to Our Story
        </Link>

        <div className="mt-8 flex flex-col items-center text-center">
          <img
            src={founder.image}
            alt={founder.name}
            className="h-48 w-48 rounded-full object-cover shadow-md ring-4 ring-pink-light sm:h-56 sm:w-56"
          />

          <h1 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">
            {founder.name}
          </h1>

          <a
            href={founder.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${founder.shortName}'s Instagram (opens in a new tab)`}
            className="mt-3 flex h-11 w-11 items-center justify-center rounded-full bg-pink-light text-pink-deep transition-transform duration-200 hover:scale-110"
          >
            <Instagram size={20} />
          </a>
        </div>

        <CitrusDivider />

        <div className="space-y-5 text-center text-base leading-relaxed text-ink/80 sm:text-lg">
          {founder.bio.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
