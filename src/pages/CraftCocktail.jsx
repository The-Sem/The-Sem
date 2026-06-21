import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Martini, Sparkles, RotateCcw } from 'lucide-react'
import { MOODS, SPIRITS, MOUTHFEELS } from '../data/cocktailOptions'
import { BUILDER_COCKTAILS } from '../data/builderCocktails'
import { COCKTAIL_PRICE } from '../data/menu'
import CitrusDivider from '../components/CitrusDivider'

const SPIRIT_ICONS = {
  Vodka: Martini,
  Gin: Martini,
  Rum: Martini,
  Whisky: Martini,
  Tequila: Martini,
  Brandy: Martini,
  Surprise: Sparkles,
}

const STEPS = [
  { id: 1, label: 'Mood' },
  { id: 2, label: 'Spirit' },
  { id: 3, label: 'Mouthfeel' },
  { id: 4, label: 'Discover' },
]

const COCKTAIL_ITEMS = BUILDER_COCKTAILS

function scoreCocktail(item, { moods, spirit, mouthfeels }) {
  let score = 0

  if (moods.includes('surprise')) score += 1
  else {
    const moodMatches = (item.moodTags || []).filter((m) => moods.includes(m)).length
    score += moodMatches * 2
  }

  if (spirit === 'Surprise') score += 1
  else if (spirit && item.spirit === spirit) score += 3

  const feelMatches = (item.tasteTags || []).filter((t) => mouthfeels.includes(t)).length
  score += feelMatches

  return score
}

export default function CraftCocktail() {
  const [step, setStep] = useState(1)
  const [moods, setMoods] = useState([])
  const [spirit, setSpirit] = useState(null)
  const [mouthfeels, setMouthfeels] = useState([])
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('sem-favorites') || '[]')
      setFavorites(saved)
    } catch {
      setFavorites([])
    }
  }, [])

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      localStorage.setItem('sem-favorites', JSON.stringify(next))
      return next
    })
  }

  const toggleMood = (id) => {
    setMoods((prev) => {
      if (id === 'surprise') return prev.includes('surprise') ? [] : ['surprise']
      const withoutSurprise = prev.filter((m) => m !== 'surprise')
      return withoutSurprise.includes(id)
        ? withoutSurprise.filter((m) => m !== id)
        : [...withoutSurprise, id]
    })
  }

  const toggleMouthfeel = (label) => {
    setMouthfeels((prev) =>
      prev.includes(label) ? prev.filter((m) => m !== label) : [...prev, label]
    )
  }

  const recommendations = useMemo(() => {
    if (step !== 4) return []
    return [...COCKTAIL_ITEMS]
      .map((item) => ({ item, score: scoreCocktail(item, { moods, spirit, mouthfeels }) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((r) => r.item)
  }, [step, moods, spirit, mouthfeels])

  const canContinue =
    (step === 1 && moods.length > 0) ||
    (step === 2 && !!spirit) ||
    (step === 3 && mouthfeels.length > 0)

  const restart = () => {
    setMoods([])
    setSpirit(null)
    setMouthfeels([])
    setStep(1)
  }

  return (
    <section className="px-6 pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="eyebrow">Craft Your Perfect Cocktail</p>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
          Tell us how you feel.
        </h1>
        <p className="mt-2 font-display text-lg italic text-pink-deep">
          We&rsquo;ll help you find your drink.
        </p>

        {/* Step indicator */}
        <div className="mx-auto mt-10 flex max-w-md items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300 ${
                    step >= s.id
                      ? 'bg-pink-deep text-ivory'
                      : 'bg-pink-light text-pink-deep/60'
                  }`}
                >
                  {s.id}
                </div>
                <span className="text-[11px] font-medium uppercase tracking-wide text-ink/60">
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-1 h-0.5 flex-1 rounded transition-colors duration-300 ${
                    step > s.id ? 'bg-pink-deep' : 'bg-pink-light'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <CitrusDivider />

      {/* STEP 1: MOOD */}
      {step === 1 && (
        <div className="mx-auto max-w-3xl animate-fadeIn">
          <h2 className="text-center font-display text-2xl font-semibold">
            What&rsquo;s your mood today?
          </h2>
          <p className="mt-1 text-center text-sm text-ink/60">
            Pick one or more — or let us surprise you.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {MOODS.map((mood) => {
              const active = moods.includes(mood.id)
              return (
                <button
                  key={mood.id}
                  onClick={() => toggleMood(mood.id)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-1 ${
                    active
                      ? 'border-pink-deep bg-pink-light/60 shadow-sm'
                      : 'border-ink/10 bg-ivory hover:border-pink/50'
                  }`}
                >
                  <span className="text-2xl">{mood.emoji}</span>
                  <span className="text-xs font-medium">{mood.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* STEP 2: SPIRIT */}
      {step === 2 && (
        <div className="mx-auto max-w-3xl animate-fadeIn">
          <h2 className="text-center font-display text-2xl font-semibold">
            Choose your base spirit
          </h2>
          <p className="mt-1 text-center text-sm text-ink/60">Pick one to build around.</p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {SPIRITS.map((s) => {
              const Icon = SPIRIT_ICONS[s.id] || Martini
              const active = spirit === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => setSpirit(s.id)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-1 ${
                    active
                      ? 'border-pink-deep bg-pink-light/60 shadow-sm'
                      : 'border-ink/10 bg-ivory hover:border-pink/50'
                  }`}
                >
                  <Icon size={22} className={active ? 'text-pink-deep' : 'text-sage-deep'} />
                  <span className="text-xs font-medium">{s.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* STEP 3: MOUTHFEEL */}
      {step === 3 && (
        <div className="mx-auto max-w-3xl animate-fadeIn">
          <h2 className="text-center font-display text-2xl font-semibold">
            What kind of mouthfeel do you prefer?
          </h2>
          <p className="mt-1 text-center text-sm text-ink/60">Choose as many as you like.</p>

          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {MOUTHFEELS.map((label) => {
              const active = mouthfeels.includes(label)
              return (
                <button
                  key={label}
                  onClick={() => toggleMouthfeel(label)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'border-pink-deep bg-pink-deep text-ivory'
                      : 'border-ink/15 bg-ivory text-ink/80 hover:border-pink/50'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* STEP 4: RESULTS */}
      {step === 4 && (
        <div className="mx-auto max-w-5xl animate-fadeIn">
          <h2 className="text-center font-display text-2xl font-semibold">
            Discover your cocktail
          </h2>
          <p className="mt-1 text-center text-sm text-ink/60">
            Based on your mood, spirit, and mouthfeel choices.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {recommendations.map((item) => (
              <div
                key={item.id}
                className="flex flex-col overflow-hidden rounded-2xl bg-ivory shadow-sm ring-1 ring-ink/5"
              >
                <div className="relative h-44 w-full">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    aria-label={
                      favorites.includes(item.id)
                        ? `Remove ${item.name} from favorites`
                        : `Save ${item.name} to favorites`
                    }
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-pink-deep shadow-sm transition-transform duration-200 hover:scale-110"
                  >
                    <Heart
                      size={18}
                      className={favorites.includes(item.id) ? 'fill-pink-deep' : ''}
                    />
                  </button>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-display text-lg font-semibold">{item.name}</h3>
                  <p className="text-xs text-ink/60">{item.ingredients.join(', ')}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tasteTags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-sage-light px-2.5 py-0.5 text-[11px] font-medium text-sage-deep"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-2 text-sm">
                    <span className="text-ink/60">{item.abv}</span>
                    <span className="font-display text-base font-semibold text-pink-deep">
                      ₹{item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FINAL CTA */}
          <div className="mt-14 rounded-2xl bg-pink-deep px-6 py-10 text-center text-ivory sm:py-14">
            <h3 className="font-display text-2xl font-semibold sm:text-3xl">
              Found your perfect cocktail?
            </h3>
            <p className="mt-2 font-display text-lg italic text-pink-light">
              Reserve your table and let us craft it for you.
            </p>
            <Link
              to="/reservation"
              className="mt-6 inline-block rounded-full bg-ivory px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-pink-deep transition-transform duration-200 hover:scale-105"
            >
              Reserve My Table
            </Link>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={restart}
              className="twist-link flex items-center gap-2 text-sm font-semibold text-ink/70"
            >
              <RotateCcw size={15} /> Start over
            </button>
          </div>
        </div>
      )}

      {/* NAVIGATION */}
      {step < 4 && (
        <div className="mx-auto mt-10 flex max-w-3xl items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className={`text-sm font-semibold text-ink/60 transition-opacity ${
              step === 1 ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          >
            Back
          </button>
          <button
            onClick={() => setStep((s) => Math.min(4, s + 1))}
            disabled={!canContinue}
            className={`rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
              canContinue
                ? 'bg-pink-deep text-ivory hover:scale-105 hover:bg-pink'
                : 'cursor-not-allowed bg-ink/10 text-ink/40'
            }`}
          >
            {step === 3 ? 'Discover' : 'Next'}
          </button>
        </div>
      )}
    </section>
  )
}
