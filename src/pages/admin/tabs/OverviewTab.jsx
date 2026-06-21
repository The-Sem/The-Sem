import { CalendarCheck, TrendingUp, Star, Users } from 'lucide-react'
import { SIGNATURE_COCKTAILS, CLASSIC_COCKTAILS, SNACKS } from '../../../data/menu'

// Placeholder analytics — wired to Supabase aggregate queries once connected.
const STATS = [
  { label: 'Total Reservations', value: '248', icon: CalendarCheck, delta: '+18 this month' },
  { label: 'Upcoming Reservations', value: '12', icon: Users, delta: 'Next 7 days' },
  { label: 'Average Review Rating', value: '4.8', icon: Star, delta: 'From 132 reviews' },
  { label: 'Monthly Visitors', value: '1,940', icon: TrendingUp, delta: '+9% vs last month' },
]

const POPULAR_COCKTAILS = [
  { name: 'The Zesty Ex', orders: 142 },
  { name: 'Sugar Rush', orders: 118 },
  { name: 'Cucumber Gin Fizz', orders: 104 },
  { name: 'Old Fashioned', orders: 96 },
  { name: 'Mojito', orders: 88 },
]

const TOP_MOODS = [
  { mood: 'Relaxed', pct: 28 },
  { mood: 'Celebrating', pct: 24 },
  { mood: 'Romantic', pct: 18 },
  { mood: 'Adventurous', pct: 15 },
  { mood: 'Chill Night', pct: 15 },
]

const TOP_SPIRITS = [
  { spirit: 'Gin', pct: 30 },
  { spirit: 'Vodka', pct: 25 },
  { spirit: 'Whisky', pct: 20 },
  { spirit: 'Tequila', pct: 15 },
  { spirit: 'Rum', pct: 10 },
]

export default function OverviewTab() {
  const maxOrders = Math.max(...POPULAR_COCKTAILS.map((c) => c.orders))

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
        Overview
      </h1>
      <p className="mt-1 text-sm text-ink/60">
        {SIGNATURE_COCKTAILS.length + CLASSIC_COCKTAILS.length + SNACKS.length} menu items live &middot; data below is sample/demo data.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon, delta }) => (
          <div key={label} className="rounded-2xl bg-ivory p-5 shadow-sm ring-1 ring-ink/5">
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-light text-pink-deep">
                <Icon size={16} />
              </span>
            </div>
            <p className="mt-3 font-display text-2xl font-semibold">{value}</p>
            <p className="text-xs text-ink/60">{label}</p>
            <p className="mt-1 text-[11px] text-sage-deep">{delta}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {/* Most popular cocktails - bar chart */}
        <div className="rounded-2xl bg-ivory p-6 shadow-sm ring-1 ring-ink/5">
          <h2 className="font-display text-lg font-semibold">Most Popular Cocktails</h2>
          <div className="mt-4 space-y-3">
            {POPULAR_COCKTAILS.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-xs text-ink/70">
                  <span>{c.name}</span>
                  <span>{c.orders} orders</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-pink-light">
                  <div
                    className="h-2 rounded-full bg-pink-deep"
                    style={{ width: `${(c.orders / maxOrders) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top moods + spirits from the cocktail builder */}
        <div className="rounded-2xl bg-ivory p-6 shadow-sm ring-1 ring-ink/5">
          <h2 className="font-display text-lg font-semibold">
            Cocktail Builder Insights
          </h2>
          <p className="mt-1 text-xs text-ink/50">Most selected mood &amp; spirit</p>

          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-sage-deep">
                Top Moods
              </p>
              <div className="mt-2 space-y-2">
                {TOP_MOODS.map((m) => (
                  <div key={m.mood} className="flex items-center gap-2 text-xs">
                    <span className="w-20 flex-shrink-0 text-ink/70">{m.mood}</span>
                    <div className="h-1.5 flex-1 rounded-full bg-sage-light">
                      <div
                        className="h-1.5 rounded-full bg-sage-deep"
                        style={{ width: `${m.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-pink-deep">
                Top Spirits
              </p>
              <div className="mt-2 space-y-2">
                {TOP_SPIRITS.map((s) => (
                  <div key={s.spirit} className="flex items-center gap-2 text-xs">
                    <span className="w-20 flex-shrink-0 text-ink/70">{s.spirit}</span>
                    <div className="h-1.5 flex-1 rounded-full bg-pink-light">
                      <div
                        className="h-1.5 rounded-full bg-pink-deep"
                        style={{ width: `${s.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
