import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GalleryCategoryCards } from "@/components/gallery-category-cards"

export default function GalleryPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background pt-28 pb-16">
        <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Bhopal Cares Forum
            </p>
            <h1 className="font-serif text-3xl text-foreground sm:text-4xl md:text-5xl">
              Gallery
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Moments from our drives across Bhopal. This layout is ready for a
              public Google Drive folder integration in the next step.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-border bg-card p-4 sm:p-5">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Note:</span>{" "}
              For now we are using local sample images. Soon, photos uploaded to
              your public Google Drive folder will appear automatically here.
            </p>
          </div>

          <GalleryCategoryCards />

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              ← Back to Home
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
