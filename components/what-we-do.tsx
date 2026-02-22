import Image from "next/image"
import { Sparkles, TreePine, Shirt } from "lucide-react"

const initiatives = [
  {
    icon: Sparkles,
    title: "Cleaning Drives",
    description:
      "From lakesides to public parks, our volunteers gather regularly to clean and restore public spaces across Bhopal, making our city shine.",
    image: "/images/cleaning-drive.jpg",
    imageAlt: "Volunteers cleaning a public space in Bhopal",
  },
  {
    icon: TreePine,
    title: "Plantation Drives",
    description:
      "We organise large-scale plantation events across the city, planting thousands of saplings to make Bhopal greener for future generations.",
    image: "/images/plantation-drive.jpg",
    imageAlt: "Volunteers planting saplings in Bhopal",
  },
  {
    icon: Shirt,
    title: "Cloth Donation Drives",
    description:
      "We collect gently used clothes from donors and distribute them to families in need, ensuring everyone has access to basic clothing.",
    image: "/images/cloth-donation.jpg",
    imageAlt: "Volunteers distributing clothes to families in need",
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
            Three pillars of community action that drive our mission forward.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-24">
          {initiatives.map((item, index) => (
            <div
              key={item.title}
              className={`flex flex-col gap-10 lg:flex-row lg:items-center ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="relative w-full lg:w-1/2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center lg:w-1/2">
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="size-6" />
                </div>
                <h3 className="mt-5 font-serif text-2xl tracking-tight text-foreground sm:text-3xl">
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
