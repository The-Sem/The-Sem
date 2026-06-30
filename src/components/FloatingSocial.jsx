import { Instagram, Facebook } from 'lucide-react'

// Editable from the admin panel's "Contact Information" settings.
const SOCIALS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/thesem_sikkim?igsh=MWwwdG5ucWtxMGZnaA==',
    icon: Instagram,
    bg: 'bg-pink-deep',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1DGbeTaFeG/',
    icon: Facebook,
    bg: 'bg-sage-deep',
  },
  {
    name: 'Zomato',
    href: 'https://link.zomato.com/xqzv/rshare?id=1304077753056341e',
    // Lucide has no Zomato icon — use a simple letterform mark instead.
    icon: null,
    label: 'Z',
    bg: 'bg-brass',
  },
]

export default function FloatingSocial() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      {SOCIALS.map(({ name, href, icon: Icon, label, bg }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open The Sem on ${name} (opens in a new tab)`}
          className={`flex h-12 w-12 items-center justify-center rounded-full ${bg} text-ivory shadow-lg transition-transform duration-200 hover:scale-110 focus-visible:scale-110`}
        >
          {Icon ? <Icon size={20} /> : <span className="font-display text-lg font-semibold">{label}</span>}
        </a>
      ))}
    </div>
  )
}
