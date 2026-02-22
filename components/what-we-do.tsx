import Image from "next/image"
import { Sparkles, TreePine, Shirt } from "lucide-react"

const initiatives = [
  {
    icon: Sparkles,
    title: "Cleaning Drives",
    description:
      "We organise neighbourhood and public space cleanups across Bhopal, from lakes and ghats to markets and residential colonies. Our volunteers come together every month to restore the beauty of our city.",
    image: "/images/cleaning-drive.jpg",
    imageAlt: "Volunteers cleaning a public park in Bhopal",
  },
  {
    icon: TreePine,
    title: "Plantation Drives",
    description:
      "From saplings along roadsides to full-scale plantation events in parks and schools, we are committed to making Bhopal greener. Every tree planted is a step towards a cooler, healthier city.",
    image: "/images/plantation-drive.jpg",
    imageAlt: "Hands planting a sapling in soil during a plantation drive",
  },
  {
    icon: Shirt,
    title: "Cloth Donation Drives",
    description:
      "We collect gently used clothes from donors across the city and distribute them to families in need. Dignity through clothing is a fundamental act of kindness we champion.",
    image: "/images/cloth-donation.jpg",
    imageAlt: "Volunteers distributing clothes to families in Bhopal",
  },
]

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Our Initiatives
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            What We Do
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Three pillars of action that drive real, visible impact across
            Bhopal.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-20">
          {initiatives.map((item, index) => (
            <div
              key={item.title}
              className={`flex flex-col gap-10 lg:flex-row lg:items-center ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:w-1/2">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center lg:w-1/2">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="size-6" />
                </div>
                <h3 className="mt-5 font-serif text-2xl font-normal tracking-tight text-foreground sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
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
