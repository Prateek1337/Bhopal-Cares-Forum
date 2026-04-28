import { GalleryCategoryCards } from "@/components/gallery-category-cards"

export function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden border-y border-primary/15 bg-gradient-to-b from-primary/10 via-muted/35 to-background py-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-primary/10 to-transparent" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Bhopal Cares Forum
          </p>
          <h2 className="font-serif text-3xl text-foreground sm:text-4xl md:text-5xl">
            Gallery
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Select a category to explore moments from our community drives.
          </p>
        </div>

        <GalleryCategoryCards />
      </div>
    </section>
  )
}
