import { Sparkles, TreePine, Shirt } from "lucide-react"

import { PhotoPageCard } from "@/components/ui/photo-page-card"

const initiatives = [
  {
    icon: Sparkles,
    title: "Cleanliness Drives",
    description:
      "Bhopal may rank among India's cleanest cities on paper, but the ground reality tells a different story. Witnessing this gap firsthand, we at Bhopal Cares Forum chose action over conversation because real change begins at the grassroots.To date, we have conducted 26 cleanliness drives across the city, collecting over 4,000 kilograms of waste from some of Bhopal's most cherished natural spaces, including Kaliyasot Dam, Hathai Kheda Dam, Kerwa Dam, and Ekant Park. But our work doesn't stop at picking up waste. We have installed dustbins and put up awareness posters at Kaliyasot, and distributed eco-friendly plates to local shopkeepers to reduce their dependence on single-use plastics because a truly clean city is built on conscious habits, not just clean streets.",
    image: "/images/cleaning.JPG",
    imageAlt: "Volunteers cleaning a public space in Bhopal",
    theme: "warm" as const,
  },
  {
    icon: TreePine,
    title: "Plantation Drives",
    description:
      "Within just three months of forming our community, we planted 1,280 saplings—a testament to what collective will and shared purpose can achieve. In a span of only 43 days, we conducted eight plantation drives across various locations in Bhopal, bringing together people from all walks of life who believe in a greener tomorrow. Together, we not only met but surpassed our goal of planting 1,000 saplings in 2025. This milestone was made possible by every pair of hands that showed up and every heart that cared. For us, plantation is not merely the act of putting a sapling into the ground; it is an act of giving life back to nature. We nurture each sapling as one would nurture a child—with patience, care, and dedication—so that one day, these trees will grow tall enough to provide shelter and a lifeline for birds, animals, and all living beings around them. At Bhopal Cares Forum, we are not just planting trees; we are planting hope.",
    image: "/images/plantation.jpg",
    imageAlt: "Volunteers planting saplings in Bhopal",
    theme: "forest" as const,
  },
  {
    icon: Shirt,
    title: "Donation Drives (Upaharam)",
    description:
      "The word UPAHARAM means gift and that is precisely the spirit behind our donation drives. At Bhopal Cares Forum, we believe that a gift is not just a material offering; it is a gesture of love, dignity, and solidarity towards those who need it most. Through Upaharam, we collect and distribute clothes, toys, books, and other essential items to underprivileged communities, ensuring that what is no longer needed by some becomes something meaningful for others. So far, we have conducted three Upaharam drives - the first at Daankheda Basti, Kolar Road, and the second at Mandwa Basti, Nehru Nagar, 3rd at Shyam Nagar. Each drive has been a deeply humbling experience, the bright smiles of young girls and the heartfelt blessings of elders have reminded us time and again why this work truly matters. These moments are not just milestones for our organisation; they are the very reason we continue to show up, drive after drive.",
    image: "/images/upaharam.jpg",
    imageAlt: "Volunteers distributing clothes to families in need",
    theme: "sky" as const,
  },
]

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative bg-section-fade py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 border-y-2 border-primary/55"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1 z-10 border-t border-accent/45"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-1 z-10 border-b border-accent/45"
      />
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Our Initiatives
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            What We Do
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Three pillars of community action that drive our mission forward.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-14 md:gap-16">
          {initiatives.map((item, index) => (
            <PhotoPageCard
              key={item.title}
              title={item.title}
              description={item.description}
              image={item.image}
              imageAlt={item.imageAlt}
              icon={<item.icon className="size-5" />}
              direction={index % 2 === 0 ? "left" : "right"}
              theme={item.theme}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
