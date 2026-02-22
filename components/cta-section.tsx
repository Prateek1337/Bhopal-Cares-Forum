import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-sm border border-primary/20 bg-primary">
          {/* Background lake image for texture */}
          <div className="absolute inset-0">
            <Image
              src="/images/bhopal-lake.jpg"
              alt=""
              fill
              className="object-cover opacity-20"
            />
          </div>

          {/* Arch motif at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-primary-foreground/10">
            <svg viewBox="0 0 300 80" className="w-56 h-16" fill="none" aria-hidden="true">
              <path d="M10 80 V30 Q10 2 150 2 Q290 2 290 30 V80" stroke="currentColor" strokeWidth="2.5" />
              <path d="M40 80 V35 Q40 12 150 12 Q260 12 260 35 V80" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="relative z-10 p-10 text-center md:p-16">
            <h2 className="font-serif text-3xl tracking-tight text-primary-foreground sm:text-4xl md:text-5xl text-balance">
              Be the Change Bhopal Needs
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
              Whether you can spare an hour at the lake or a whole day in the
              old city, every bit of effort counts. Join our next drive, donate
              clothes, or help us spread the word.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-base px-8 py-3 h-auto rounded-sm"
                asChild
              >
                <Link href="mailto:sevabhopal@example.com">Get In Touch</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-3 h-auto rounded-sm border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <Link href="tel:+919876543210">Call Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
