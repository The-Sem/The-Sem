import { useState } from 'react'
import { Trash2, Pencil, Upload, Check, X } from 'lucide-react'
import { GALLERY_IMAGES } from '../../../data/gallery'

export default function GalleryTab() {
  const [images, setImages] = useState(GALLERY_IMAGES)
  const [editingId, setEditingId] = useState(null)
  const [captionDraft, setCaptionDraft] = useState('')

  const startEdit = (img) => {
    setEditingId(img.id)
    setCaptionDraft(img.caption)
  }

  const saveCaption = (id) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, caption: captionDraft } : img))
    )
    setEditingId(null)
  }

  const deleteImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold sm:text-3xl">Gallery</h1>
          <p className="mt-1 text-sm text-ink/60">
            Upload, caption, and remove photos shown on the public gallery.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-pink-deep px-5 py-2.5 text-sm font-semibold text-ivory transition-transform duration-200 hover:scale-105">
          <Upload size={16} /> Upload Photos
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <div key={img.id} className="overflow-hidden rounded-2xl bg-ivory shadow-sm ring-1 ring-ink/5">
            <img src={img.url} alt={img.caption} className="h-40 w-full object-cover" />
            <div className="p-3.5">
              {editingId === img.id ? (
                <div className="flex items-center gap-2">
                  <input
                    value={captionDraft}
                    onChange={(e) => setCaptionDraft(e.target.value)}
                    className="input-field py-1.5 text-xs"
                  />
                  <button
                    onClick={() => saveCaption(img.id)}
                    aria-label="Save caption"
                    className="text-sage-deep"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    aria-label="Cancel"
                    className="text-ink/40"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs text-ink/70">{img.caption}</p>
                  <div className="flex flex-shrink-0 gap-2">
                    <button
                      onClick={() => startEdit(img)}
                      aria-label="Edit caption"
                      className="text-sage-deep"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => deleteImage(img.id)}
                      aria-label="Delete image"
                      className="text-red-500"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <p className="mt-10 text-center text-sm text-ink/50">
          No images yet — upload some to populate the gallery.
        </p>
      )}

      <p className="mt-6 text-xs text-ink/40">
        Drag-to-rearrange and real uploads require Supabase Storage — see
        SUPABASE_SETUP.md for the "gallery" bucket + table wiring.
      </p>
    </div>
  )
}
