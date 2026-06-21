import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import useInView from '../hooks/useInView'

// Editable values — surfaced from Supabase "contact_information" via the admin panel.
export const CONTACT = {
  phone: '+91 90461 57720',
  phoneRaw: '919046157720',
  whatsapp: '919046157720',
  email: 'thesem63@gmail.com',
  address: 'Near Central Bank of India, Ranipool, Gangtok, Sikkim 737135',
  mapsEmbedSrc:
    'https://www.google.com/maps?q=Central+Bank+of+India+Ranipool+Gangtok+Sikkim+737135&output=embed',
}

export default function ContactSection() {
  const [ref, inView] = useInView()

  return (
    <section ref={ref} id="contact" className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="eyebrow">Find Us</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Visit The Sem
          </h2>
        </div>

        <div
          className={`mt-10 grid gap-6 sm:grid-cols-2 ${
            inView ? 'animate-fadeIn' : 'opacity-0'
          }`}
        >
          <div className="overflow-hidden rounded-2xl ring-1 ring-ink/5">
            <iframe
              title="The Sem location map"
              src={CONTACT.mapsEmbedSrc}
              className="h-72 w-full sm:h-full sm:min-h-[320px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-col gap-4 rounded-2xl bg-pink-light/40 p-7 sm:p-8">
            <ContactRow
              icon={MapPin}
              label="Address"
              value={CONTACT.address}
            />
            <ContactRow
              icon={Phone}
              label="Phone"
              value={CONTACT.phone}
              href={`tel:+${CONTACT.phoneRaw}`}
            />
            <ContactRow
              icon={MessageCircle}
              label="WhatsApp"
              value="Chat with us"
              href={`https://wa.me/${CONTACT.whatsapp}`}
              external
            />
            <ContactRow
              icon={Mail}
              label="Email"
              value={CONTACT.email}
              href={`mailto:${CONTACT.email}`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactRow({ icon: Icon, label, value, href, external }) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-ivory text-pink-deep ring-1 ring-pink/30">
        <Icon size={18} />
      </span>
      <div>
        <p className="eyebrow">{label}</p>
        <p className="mt-1 text-sm font-medium text-ink sm:text-base">{value}</p>
      </div>
    </div>
  )

  if (!href) return content

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="twist-link inline-block w-fit"
    >
      {content}
    </a>
  )
}
