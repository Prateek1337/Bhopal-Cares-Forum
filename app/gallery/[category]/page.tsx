import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  categoryMeta,
  galleryByCategory,
  type GalleryCategory,
} from "@/lib/gallery-data"

type CategoryPageProps = {
  params: Promise<{
    category: string
  }>
}

const validCategories: GalleryCategory[] = ["plantation", "cleaning", "cloth"]

export default async function GalleryCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params

  if (!validCategories.includes(category as GalleryCategory)) {
    notFound()
  }

  const typedCategory = category as GalleryCategory
  const photos = galleryByCategory[typedCategory]
  const meta = categoryMeta.find((item) => item.key === typedCategory)

  if (!meta) {
    notFound()
  }

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
              {meta.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {meta.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="space-y-2 p-4">
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                  <h2 className="text-base font-semibold text-foreground">
                    {item.title}
                  </h2>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
            <Link
              href="/#gallery"
              className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              ← Back to Gallery Section
            </Link>
            <Link
              href="/gallery"
              className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Open Gallery Hub
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
