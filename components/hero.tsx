import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/main.jpg"
        alt="Volunteers planting trees in Bhopal"
        fill
        className="object-cover"
        priority
      />
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/22 via-stone-900/30 to-orange-950/36" />
      <div className="bg-soft-gradient absolute inset-0 opacity-85" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground/90">
          A Community Initiative from Bhopal
        </p>

        <h1 className="font-serif text-4xl leading-tight tracking-tight text-primary-foreground sm:text-5xl md:text-7xl text-balance">
          Building a Cleaner, Greener & Kinder Bhopal
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
          We organise cleanliness drives, plantation drives, and donation
          drives to uplift our community and protect our environment.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="text-base px-8 py-3 h-auto shadow-sm hover:shadow-md transition-shadow" asChild>
            <Link href="#what-we-do">Explore Our Work</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-base px-8 py-3 h-auto border-primary-foreground/40 text-primary-foreground bg-primary-foreground/5 hover:bg-primary-foreground/14 hover:text-primary-foreground"
            asChild
          >
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSccNIrhpQ8-JnMktQOGPkDN5H61Wu15WtitbBdW7Gjpe4cFEA/viewform?pli=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Volunteer With Us
            </Link>
          </Button>
        </div>

        <div className="mt-16 animate-bounce">
          <ArrowDown className="mx-auto size-5 text-primary-foreground/60" />
        </div>
      </div>
    </section>
  )
}
