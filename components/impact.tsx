const stats = [
  { value: "120+", label: "Drives Completed" },
  { value: "8,000+", label: "Trees Planted" },
  { value: "15,000+", label: "Clothes Donated" },
  { value: "2,500+", label: "Active Volunteers" },
]

export function Impact() {
  return (
    <section id="impact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Our Impact
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Numbers That Tell Our Story
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Every drive, every sapling, every piece of clothing adds up to
            meaningful change across Bhopal.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-lg border border-border bg-card p-8 text-center transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <span className="font-serif text-4xl tracking-tight text-primary md:text-5xl">
                {stat.value}
              </span>
              <span className="mt-3 text-sm font-medium text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
