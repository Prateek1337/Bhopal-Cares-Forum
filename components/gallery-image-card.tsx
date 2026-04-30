"use client"

import { useMemo, useState } from "react"

type GalleryImageCardProps = {
  title: string
  alt: string
  date: string
  imageSrc: string
}

const MAX_RETRIES = 2

export function GalleryImageCard({ title, alt, date, imageSrc }: GalleryImageCardProps) {
  const [attempt, setAttempt] = useState(0)
  const [failed, setFailed] = useState(false)

  const srcWithAttempt = useMemo(
    () => `${imageSrc}${imageSrc.includes("?") ? "&" : "?"}retry=${attempt}`,
    [imageSrc, attempt]
  )

  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {!failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={srcWithAttempt}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
            onError={() => {
              if (attempt < MAX_RETRIES) {
                setAttempt((v) => v + 1)
                return
              }
              setFailed(true)
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
            Failed to load image
          </div>
        )}
      </div>

      <div className="space-y-2 p-4">
        <span className="text-xs text-muted-foreground">{date}</span>
        <h2 className="line-clamp-2 text-base font-semibold text-foreground">{title}</h2>
      </div>
    </article>
  )
}

