import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GalleryImageCard } from "@/components/gallery-image-card"
import {
  categoryMeta,
  type GalleryCategory,
} from "@/lib/gallery-data"
import { getDriveGalleryByCategory } from "@/lib/google-drive-gallery"

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
  const { items: photos, error } = await getDriveGalleryByCategory(typedCategory)
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

          {error ? (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              Unable to load images from Google Drive. {error}
            </div>
          ) : photos.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
              No images found in this Drive folder.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((item) => (
                <GalleryImageCard
                  key={item.id}
                  title={item.title}
                  alt={item.alt}
                  date={item.date}
                  imageSrc={item.imageSrc}
                />
              ))}
            </div>
          )}

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
