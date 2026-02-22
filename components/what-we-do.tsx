import Image from "next/image"
import { Sparkles, TreePine, Shirt } from "lucide-react"
import { ArchDivider } from "@/components/bhopali-motifs"

const initiatives = [
  {
    icon: Sparkles,
    title: "Cleaning Drives",
    subtitle: "Restoring the beauty of our lakes & ghats",
    description:
      "From the shores of Upper Lake and Lower Lake to the historic ghats and bustling bazaars of Old Bhopal, our volunteers gather every month to sweep, collect, and restore. We believe the City of Lakes deserves to shine.",
    image: "/images/cleaning-drive.jpg",
    imageAlt: "Volunteers cleaning ghats along Upper Lake in Bhopal with mosque domes in background",
  },
  {
    icon: TreePine,
    title: "Plantation Drives",
    subtitle: "Growing green corridors across the city",
    description:
      "From saplings along the roads near Gohar Mahal to full-scale plantation events in Van Vihar's periphery and neighbourhood parks, we are committed to making Bhopal greener. Every tree planted is a gift to the next generation.",
    image: "/images/plantation-drive.jpg",
    imageAlt: "Volunteers planting saplings near old Bhopal fort walls",
  },
  {
    icon: Shirt,
    title: "Cloth Donation Drives",
    subtitle: "Dignity through generosity",
    description:
      "In the narrow lanes around Jama Masjid and the old city, we collect gently used clothes from donors and distribute them to families in need. Inspired by Bhopal's Nawabi tradition of giving, we carry this legacy forward.",
    image: "/images/cloth-donation.jpg",
    imageAlt: "Volunteers distributing clothes in old Bhopal streets with traditional architecture",
  },
]

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative bg-secondary py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Our Initiatives
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            What We Do
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Three pillars of action rooted in the heritage and heart of Bhopal.
          </p>
        </div>

        <ArchDivider className="mx-auto mt-10 max-w-xs" />

        <div className="mt-14 flex flex-col gap-24">
          {initiatives.map((item, index) => (
            <div
              key={item.title}
              className={`flex flex-col gap-10 lg:flex-row lg:items-center ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image with arch-shaped clip */}
              <div className="relative w-full lg:w-1/2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                  />
                  {/* Subtle arch overlay at top */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="none" fill="none" aria-hidden="true">
                      <path
                        d="M0 0 H400 V300 H0 Z M20 300 V100 Q20 10 200 10 Q380 10 380 100 V300"
                        fill="rgba(26,15,5,0.15)"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center lg:w-1/2">
                <div className="flex size-12 items-center justify-center rounded-sm bg-primary/10 text-primary">
                  <item.icon className="size-6" />
                </div>
                <h3 className="mt-5 font-serif text-2xl tracking-tight text-foreground sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-medium uppercase tracking-widest text-accent">
                  {item.subtitle}
                </p>
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
