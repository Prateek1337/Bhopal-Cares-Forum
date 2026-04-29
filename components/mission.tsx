import { Heart, Target, Eye } from "lucide-react"

import { EnvelopeCard } from "@/components/ui/envelope-card"

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To empower the citizens of Bhopal to take collective action towards cleanliness, greenery, and compassion through grassroots drives and community engagement.",
    theme: "warm" as const,
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "A Bhopal where every neighbourhood is clean, every road is lined with trees, and no one goes without basic clothing and dignity.",
    theme: "sky" as const,
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Compassion, community ownership, and the belief that small, consistent efforts create lasting change for our city and its people.",
    theme: "forest" as const,
  },
]

export function Mission() {
  return (
    <section id="mission" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Who We Are
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Driven by Purpose, United by Action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            We are a group of passionate volunteers from Bhopal dedicated to
            making our city a better place for everyone.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <EnvelopeCard
              key={pillar.title}
              title={pillar.title}
              description={pillar.description}
              icon={<pillar.icon className="size-7" />}
              theme={pillar.theme}
              className="min-h-[320px]"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
