import { Link } from 'react-router-dom'
import CitrusDivider from '../components/CitrusDivider'

export default function Placeholder({ title, description }) {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-28 text-center">
      <p className="eyebrow">Coming Soon</p>
      <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
        {title}
      </h1>
      <CitrusDivider />
      <p className="max-w-md text-ink/70">{description}</p>
      <Link
        to="/"
        className="twist-link mt-8 text-sm font-semibold text-pink-deep"
      >
        Back to Home
      </Link>
    </section>
  )
}
