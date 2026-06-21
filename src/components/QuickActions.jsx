import { Link } from 'react-router-dom'
import { CalendarCheck, Images, Phone, Sparkles } from 'lucide-react'
import useInView from '../hooks/useInView'

const ACTIONS = [
  {
    to: '/reservation',
    icon: CalendarCheck,
    title: 'Reserve a Table',
    desc: 'Pick a date, time, and party size — we\u2019ll have a spot ready for you.',
  },
  {
    to: '/craft-your-cocktail',
    icon: Sparkles,
    title: 'Craft Your Cocktail',
    desc: 'Tell us your mood and taste — we\u2019ll find (or build) your perfect drink.',
    highlight: true,
  },
  {
    to: '/gallery',
    icon: Images,
    title: 'Happy Guest Gallery',
    desc: 'A look at the people, drinks, and moments that fill The Sem.',
  },
  {
    to: '/contact',
    icon: Phone,
    title: 'Contact Us',
    desc: 'Questions, groups, or events — reach us by phone, chat, or email.',
  },
]

export default function QuickActions() {
  const [ref, inView] = useInView()

  return (
    <section ref={ref} className="bg-pink-light/40 px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {ACTIONS.map(({ to, icon: Icon, title, desc, highlight }, i) => (
          <Link
            key={to}
            to={to}
            className={`group flex flex-col items-start gap-4 rounded-2xl p-7 shadow-sm ring-1 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${
              highlight
                ? 'bg-pink-deep ring-pink-deep/40 hover:ring-pink-deep'
                : 'bg-ivory ring-ink/5 hover:ring-pink/40'
            } ${inView ? 'animate-fadeIn' : 'opacity-0'}`}
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300 ${
                highlight
                  ? 'bg-ivory text-pink-deep'
                  : 'bg-sage-light text-sage-deep group-hover:bg-pink-deep group-hover:text-ivory'
              }`}
            >
              <Icon size={22} />
            </span>
            <h3
              className={`font-display text-xl font-semibold ${
                highlight ? 'text-ivory' : ''
              }`}
            >
              {title}
            </h3>
            <p
              className={`text-sm leading-relaxed ${
                highlight ? 'text-ivory/85' : 'text-ink/70'
              }`}
            >
              {desc}
            </p>
            <span
              className={`twist-link mt-auto text-sm font-semibold ${
                highlight ? 'text-ivory' : 'text-pink-deep'
              }`}
            >
              {highlight ? 'Start Crafting' : 'Explore'}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

