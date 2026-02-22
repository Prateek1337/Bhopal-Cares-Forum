import { Heart, Target, Eye } from "lucide-react"

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
      "A Bhopal where every neighbourhood is clean, every road is lined with trees, and no one goes without basic clothing and dignity.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Compassion, community ownership, and the belief that small, consistent efforts create lasting change for our city and its people.",
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
            <div
              key={pillar.title}
              className="group rounded-lg border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <pillar.icon className="size-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-card-foreground">
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
