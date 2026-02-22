import { Heart, Target, Eye } from "lucide-react"
import { ArchDivider, MughalArch } from "@/components/bhopali-motifs"

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To empower the citizens of Bhopal to take collective action towards cleanliness, greenery, and compassion through grassroots drives and community engagement.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "A Bhopal where every lake shore is pristine, every gully is lined with trees, and no one goes without basic clothing and dignity.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Rooted in the Bhopali tradition of hospitality and seva \u2014 compassion, community ownership, and the belief that small, consistent efforts create lasting change.",
  },
]

export function Mission() {
  return (
    <section id="mission" className="relative py-24 md:py-32 overflow-hidden">
      {/* Faint jali-inspired background pattern */}
      <div className="absolute top-6 right-6 opacity-[0.06] text-primary">
        <MughalArch className="w-40 h-52" />
      </div>
      <div className="absolute bottom-6 left-6 opacity-[0.06] text-primary">
        <MughalArch className="w-32 h-40" />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Who We Are
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Driven by Purpose, United by Seva
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Born in the City of Lakes, our foundation draws strength from
            {"Bhopal's"} centuries-old culture of generosity and togetherness.
          </p>
        </div>

        <ArchDivider className="mx-auto mt-10 max-w-xs" />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group relative overflow-hidden rounded-sm border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              {/* Arch shape at top of card */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 opacity-[0.07] text-primary">
                <svg viewBox="0 0 120 60" className="w-28 h-14" fill="none" aria-hidden="true">
                  <path d="M0 60 V25 Q0 0 60 0 Q120 0 120 25 V60" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>

              <div className="flex size-12 items-center justify-center rounded-sm bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <pillar.icon className="size-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-card-foreground font-serif">
                {pillar.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
