import { SIGNATURE_COCKTAILS, CLASSIC_COCKTAILS, SNACKS, COCKTAIL_PRICE } from '../data/menu'
import CitrusDivider from '../components/CitrusDivider'

export default function Menu() {
  return (
    <div className="pb-20 pt-28 sm:pt-32">
      <CocktailSection />
      <CitrusDivider />
      <SnacksSection />
    </div>
  )
}

function CocktailSection() {
  return (
    <section className="px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">The Menu</p>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
          Cocktails
        </h1>

        <div className="mt-7 space-y-4 text-ink/75">
          <p className="font-display text-lg italic text-ink">
            Sweet. Sour. Salty. Bitter. Umami.
            <br />
            Five tastes. One question:
            <br />
            What are you craving today?
          </p>
          <p className="text-sm leading-relaxed sm:text-base">
            Start with a flavor, follow your mood, or challenge us to create
            something completely your own. Whether you know exactly what you
            want or have no idea at all, we&rsquo;ll help you find your
            perfect sip.
          </p>
          <p className="text-sm leading-relaxed sm:text-base">
            After all, the best cocktail isn&rsquo;t always the one on the
            menu &mdash; it&rsquo;s the one made just for you.
          </p>
          <p className="font-display text-lg font-semibold text-pink-deep">
            🍸 Your mood. Your taste. Your cocktail.
          </p>
        </div>
      </div>

      <CitrusDivider />

      {/* Signature cocktails */}
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-2xl font-semibold text-pink-deep">
          Signature Cocktails
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNATURE_COCKTAILS.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl bg-ivory shadow-sm ring-1 ring-ink/5 transition-shadow duration-200 hover:shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-44 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold leading-tight">
                    {item.name}
                  </h3>
                  <span className="flex-shrink-0 font-display text-base font-semibold text-pink-deep">
                    ₹{COCKTAIL_PRICE}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/65">
                  {item.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.tasteTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-sage-light px-2.5 py-0.5 text-[11px] font-medium text-sage-deep"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Classic cocktails — simple list */}
      <div className="mx-auto mt-14 max-w-3xl text-center">
        <h2 className="font-display text-2xl font-semibold text-pink-deep">
          Classic Cocktails
        </h2>
        <p className="mt-1 text-sm text-ink/60">All at ₹{COCKTAIL_PRICE}</p>

        <div className="mt-5 flex flex-wrap justify-center gap-2.5">
          {CLASSIC_COCKTAILS.map((name) => (
            <span
              key={name}
              className="rounded-full border border-ink/15 bg-ivory px-4 py-2 text-sm font-medium text-ink/80"
            >
              {name}
            </span>
          ))}
        </div>

        <p className="mx-auto mt-7 max-w-md text-sm leading-relaxed text-ink/70">
          Don&rsquo;t see what you&rsquo;re craving? Custom cocktails are
          always available &mdash; tell us your mood and taste, and
          we&rsquo;ll craft it for you. Same price: ₹{COCKTAIL_PRICE}.
        </p>
      </div>
    </section>
  )
}

function SnacksSection() {
  return (
    <section className="px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">The Menu</p>
        <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
          Snacks
        </h2>

        <div className="mt-7 space-y-4 text-sm leading-relaxed text-ink/75 sm:text-base">
          <p>
            This menu is where cultures collide &mdash; gently, deliciously,
            and with purpose.
          </p>
          <p>
            We take inspiration from the streets of Sikkim, the warmth of
            Indian kitchens, and global plates we&rsquo;ve fallen in love
            with. Then we mix, layer, and craft them into something uniquely
            ours.
          </p>
          <p>
            Every dish is a fusion &mdash; of regions, textures, and
            emotions, paired perfectly with your cocktail, and served with a
            side of story.
          </p>
        </div>
      </div>

      <CitrusDivider />

      <div className="mx-auto max-w-5xl">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SNACKS.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-2xl bg-ivory p-4 shadow-sm ring-1 ring-ink/5 transition-shadow duration-200 hover:shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
                loading="lazy"
              />
              <div>
                <h3 className="font-display text-base font-semibold leading-tight">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-ink/60">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
