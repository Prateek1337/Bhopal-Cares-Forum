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

  const handleVisibleCardSettled = () => {
    setVisibleCount((prev) => Math.min(prev + batchSize, photos.length))
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {photos.slice(0, visibleCount).map((item, index) => (
        <GalleryImageCard
          key={item.id}
          alt={item.alt}
          date={item.date}
          imageSrc={item.imageSrc}
          debug={debug}
          onCardSettled={index === visibleCount - 1 ? handleVisibleCardSettled : undefined}
        />
      ))}
    </div>
  )
}
