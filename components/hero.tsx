import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DomeSilhouette, LakeWaves } from "@/components/bhopali-motifs"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-bg.jpg"
        alt="Bhopal skyline with Taj-ul-Masajid and Upper Lake at golden hour"
        fill
        className="object-cover"
        priority
      />
      {/* Warm tinted overlay */}
      <div className="absolute inset-0 bg-[#1a0f05]/70" />

      {/* Dome silhouette at top */}
      <div className="absolute top-0 left-0 right-0 text-[#f5e6d0]">
        <DomeSilhouette className="w-full h-20 md:h-28" />
      </div>

      {/* Lake wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 text-background">
        <LakeWaves className="w-full h-16 md:h-24" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
        {/* Decorative arch frame around heading */}
        <div className="mx-auto mb-6 flex items-center justify-center gap-3">
          <svg viewBox="0 0 40 20" className="w-8 text-[#d4a574]/60" fill="none" aria-hidden="true">
            <path d="M2 20 V8 Q2 1 20 1 Q38 1 38 8 V20" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d4a574]">
            From the Heart of Bhopal
          </p>
          <svg viewBox="0 0 40 20" className="w-8 text-[#d4a574]/60 scale-x-[-1]" fill="none" aria-hidden="true">
            <path d="M2 20 V8 Q2 1 20 1 Q38 1 38 8 V20" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </div>

        <h1 className="font-serif text-4xl leading-tight tracking-tight text-[#f5e6d0] sm:text-5xl md:text-7xl text-balance">
          Serving Our City, Preserving Our Heritage
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#f5e6d0]/80 md:text-xl">
          {"We organise cleaning drives along Bhopal's historic lakes, plant trees to keep our city green, and donate clothes to those in need \u2014 honouring the spirit of seva that runs through our Nawabi city."}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="text-base px-8 py-3 h-auto rounded-sm" asChild>
            <Link href="#what-we-do">Explore Our Work</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-base px-8 py-3 h-auto rounded-sm border-[#d4a574]/40 text-[#f5e6d0] bg-transparent hover:bg-[#f5e6d0]/10 hover:text-[#f5e6d0]"
            asChild
          >
            <Link href="#contact">Volunteer With Us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
