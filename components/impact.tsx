import Image from "next/image"
import { JaliBorder } from "@/components/bhopali-motifs"

const stats = [
  { value: "120+", label: "Drives Completed" },
  { value: "8,000+", label: "Trees Planted" },
  { value: "15,000+", label: "Clothes Donated" },
  { value: "2,500+", label: "Active Volunteers" },
]

export function Impact() {
  return (
    <section id="impact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background lake image */}
      <div className="absolute inset-0">
        <Image
          src="/images/bhopal-lake.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/92" />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Our Impact
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Numbers That Tell Our Story
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Every drive along the lakeside, every sapling near the fort walls,
            every cloth shared in the old city adds up to meaningful change.
          </p>
        </div>

        <div className="mt-4 text-primary/30">
          <JaliBorder className="w-full h-5" />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative flex flex-col items-center overflow-hidden rounded-sm border border-border bg-card p-8 text-center transition-all hover:border-primary/30 hover:shadow-lg"
            >
              {/* Subtle arch motif at top */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-primary opacity-[0.08]">
                <svg viewBox="0 0 80 40" className="w-16 h-8" fill="none" aria-hidden="true">
                  <path d="M0 40 V16 Q0 0 40 0 Q80 0 80 16 V40" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
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
