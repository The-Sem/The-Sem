import { Link } from 'react-router-dom'
import { CONTACT } from './ContactSection'

const LINK_GROUPS = [
  {
    title: 'Explore',
    links: [
      { to: '/menu', label: 'Menu' },
      { to: '/craft-your-cocktail', label: 'Craft Your Cocktail' },
      { to: '/gallery', label: 'Gallery' },
      { to: '/reviews', label: 'Reviews' },
    ],
  },
  {
    title: 'The Sem',
    links: [
      { to: '/founders/som', label: 'Som' },
      { to: '/founders/sang', label: 'Sang' },
      { to: '/founders/susma', label: 'Susma' },
      { to: '/reservation', label: 'Reservations' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-14 text-ivory">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img src="/images/logo.png" alt="The Sem" className="h-11 w-auto" />
            <p className="mt-3 font-display italic text-ivory/70">
              Where Stories Meet Spirits.
            </p>
            <p className="mt-4 max-w-xs text-sm text-ivory/60">
              {CONTACT.address}
            </p>
          </div>

          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="eyebrow text-pink-light">{group.title}</p>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="twist-link text-sm text-ivory/80"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} The Sem. All rights reserved.</p>
          <p>
            {CONTACT.phone} &middot;{' '}
            <a href={`mailto:${CONTACT.email}`} className="twist-link">
              {CONTACT.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
