"use client"

import { useState } from "react"

import { GalleryImageCard } from "@/components/gallery-image-card"
import type { GalleryItem } from "@/lib/gallery-data"

type GalleryBatchedGridProps = {
  photos: GalleryItem[]
  batchSize: number
  debug?: boolean
}

export function GalleryBatchedGrid({ photos, batchSize, debug = true }: GalleryBatchedGridProps) {
  const initialCount = Math.min(batchSize, photos.length)
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const thumbnailDelayMs = Number(process.env.NEXT_PUBLIC_GALLERY_THUMBNAIL_DELAY_MS ?? "50")

  const handleVisibleCardSettled = () => {
    setVisibleCount((prev) => Math.min(prev + batchSize, photos.length))
  }

  return (
    <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8">
      {photos.slice(0, visibleCount).map((item, index) => (
        <GalleryImageCard
          key={item.id}
          alt={item.alt}
          imageSrc={item.imageSrc}
          thumbnailSrc={item.thumbnailSrc}
          thumbnailDelayMs={thumbnailDelayMs}
          debug={debug}
          onCardSettled={index === visibleCount - 1 ? handleVisibleCardSettled : undefined}
        />
      ))}
    </div>
  )
}
