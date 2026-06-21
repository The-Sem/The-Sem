import { useState } from 'react'
import { Save, Upload } from 'lucide-react'
import { CONTACT } from '../../../components/ContactSection'

export default function SettingsTab() {
  const [form, setForm] = useState({
    phone: CONTACT.phone,
    whatsapp: CONTACT.whatsapp,
    email: CONTACT.email,
    address: CONTACT.address,
    mapsEmbedSrc: CONTACT.mapsEmbedSrc,
  })
  const [saved, setSaved] = useState(false)

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSave = (e) => {
    e.preventDefault()
    // TODO: persist to Supabase "contact_information" table.
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold sm:text-3xl">Settings</h1>
      <p className="mt-1 text-sm text-ink/60">
        Update contact details, maps, and media used across the site.
      </p>

      <form onSubmit={handleSave} className="mt-6 space-y-5 rounded-2xl bg-ivory p-6 shadow-sm ring-1 ring-ink/5">
        <h2 className="font-display text-lg font-semibold">Contact Information</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone Number">
            <input value={form.phone} onChange={update('phone')} className="input-field" />
          </Field>
          <Field label="WhatsApp Number">
            <input value={form.whatsapp} onChange={update('whatsapp')} className="input-field" />
          </Field>
        </div>

        <Field label="Email Address">
          <input value={form.email} onChange={update('email')} className="input-field" />
        </Field>

        <Field label="Restaurant Address">
          <textarea
            value={form.address}
            onChange={update('address')}
            rows={2}
            className="input-field resize-none"
          />
        </Field>

        <Field label="Google Maps Embed URL">
          <input
            value={form.mapsEmbedSrc}
            onChange={update('mapsEmbedSrc')}
            className="input-field"
          />
        </Field>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-full bg-pink-deep px-6 py-2.5 text-sm font-semibold text-ivory transition-transform duration-200 hover:scale-105"
        >
          <Save size={16} /> Save Changes
        </button>

        {saved && (
          <p className="text-sm font-medium text-sage-deep">Settings saved.</p>
        )}
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <UploadCard title="Hero Slider Images" hint="JPG/PNG, 1600px wide recommended" />
        <UploadCard title="Founder Photos" hint="Square images, 900x900px recommended" />
      </div>

      <p className="mt-6 text-xs text-ink/40">
        Saved settings here are local to this preview session. Connect Supabase
        (see SUPABASE_SETUP.md) to persist changes and reflect them site-wide.
      </p>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink/80">{label}</span>
      {children}
    </label>
  )
}

function UploadCard({ title, hint }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ink/15 bg-ivory p-8 text-center">
      <Upload size={22} className="text-sage-deep" />
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-ink/50">{hint}</p>
      <button className="mt-1 rounded-full bg-pink-light px-4 py-1.5 text-xs font-semibold text-pink-deep">
        Choose Files
      </button>
    </div>
  )
}
