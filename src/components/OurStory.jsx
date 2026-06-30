import { Link } from 'react-router-dom'
import useInView from '../hooks/useInView'

function FounderLink({ to, children }) {
  return (
    <Link to={to} className="twist-link font-semibold text-pink-deep">
      {children}
    </Link>
  )
}

export default function OurStory() {
  const [ref, inView] = useInView()

  return (
    <section
      ref={ref}
      className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-24"
    >
      <p className="eyebrow">Our Story</p>

      <h2
        className={`mt-3 font-display text-3xl font-semibold sm:text-4xl ${
          inView ? 'animate-fadeIn' : 'opacity-0'
        }`}
      >
        Teen tigada, kaam sanwara.
      </h2>

      <div
        className={`mt-8 space-y-5 text-base leading-relaxed text-ink/80 sm:text-lg ${
          inView ? 'animate-fadeIn' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.15s' }}
      >
        <p className="font-display text-xl italic text-ink">
          Three dreamers. Three personalities. One vision.
        </p>

        <p>
          The Sem is the dream of <FounderLink to="/founders/som">Som</FounderLink> and{' '}
          <FounderLink to="/founders/sang">Sang</FounderLink>, brought to life with{' '}
          <FounderLink to="/founders/susma">Susma</FounderLink>.
        </p>

        <p>
          There&rsquo;s a saying, &ldquo;Teen tigada kaam bigada.&rdquo; We chose to
          believe in something different: &ldquo;Teen tigada kaam sanwara.&rdquo;
        </p>

        <p>
          Built on endless cups of tea, midnight ideas, countless discussions, a
          little chaos, and a lot of courage, we created a place we&rsquo;d love to
          spend time in ourselves.
        </p>

        <p>
          Whether you&rsquo;re here for a cocktail, a comfort bite, a celebration,
          or simply a good time &mdash; we&rsquo;re glad you&rsquo;re here.
        </p>

        <p className="font-display text-xl italic text-pink-deep">
          This isn&rsquo;t just our story anymore. It&rsquo;s yours too.
        </p>
      </div>
    </section>
  )
}
