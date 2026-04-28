import Image from "next/image"
import Link from "next/link"
import { categoryMeta } from "@/lib/gallery-data"

export function GalleryCategoryCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {categoryMeta.map((category) => (
        <Link
          key={category.key}
          href={`/gallery/${category.key}`}
          className="group relative overflow-hidden rounded-xl border border-border text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="absolute inset-0">
            <Image
              src={category.coverImage}
              alt={category.title}
              fill
              className="object-cover opacity-45 transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-foreground/45" />
          </div>

          <div className="relative z-10 flex min-h-52 flex-col justify-end p-5">
            <h3 className="font-serif text-2xl text-white">{category.title}</h3>
            <p className="mt-2 text-sm text-white/90">{category.subtitle}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
