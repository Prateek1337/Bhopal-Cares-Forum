"use client"

import { useEffect, useMemo, useState } from "react"

type GalleryImageCardProps = {
  alt: string
  date: string
  imageSrc: string
  thumbnailSrc?: string
  onCardSettled?: () => void
  debug?: boolean
}

const CARD_SETTLE_TIMEOUT_MS = Number(process.env.NEXT_PUBLIC_GALLERY_CARD_TIMEOUT_MS ?? "25000")
export function GalleryImageCard({
  alt,
  date,
  imageSrc,
  thumbnailSrc,
  onCardSettled,
  debug = true,
}: GalleryImageCardProps) {
  const [cardLoaded, setCardLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [previewFailed, setPreviewFailed] = useState(false)
  const [openPreview, setOpenPreview] = useState(false)
  const [hasNotifiedSettled, setHasNotifiedSettled] = useState(false)

  const cardBaseSrc = thumbnailSrc || imageSrc
  const cardSrcWithAttempt = useMemo(() => cardBaseSrc, [cardBaseSrc])

  const previewSrcWithAttempt = useMemo(() => imageSrc, [imageSrc])

  useEffect(() => {
    if (!openPreview) return

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPreview(false)
      }
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [openPreview])

  useEffect(() => {
    if (hasNotifiedSettled) return
    if (!cardLoaded && !failed) return

    onCardSettled?.()
    setHasNotifiedSettled(true)
  }, [cardLoaded, failed, hasNotifiedSettled, onCardSettled])

  useEffect(() => {
    if (hasNotifiedSettled || cardLoaded || failed) return

    const timer = window.setTimeout(() => {
      if (debug) {
        console.error("[gallery][card][timeout]", {
          imageSrc,
          timeoutMs: CARD_SETTLE_TIMEOUT_MS,
          attempt: 0,
        })
      }
      setFailed(true)
    }, CARD_SETTLE_TIMEOUT_MS)

    return () => window.clearTimeout(timer)
  }, [hasNotifiedSettled, cardLoaded, failed, debug, imageSrc])

  return (
    <>
      <article className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <button
        type="button"
        onClick={() => {
          if (failed) return
          setPreviewFailed(false)
          setOpenPreview(true)
        }}
        className="relative aspect-[4/3] w-full overflow-hidden bg-muted text-left"
        aria-label="Open image preview"
      >
        {!failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cardSrcWithAttempt}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
            onLoad={() => setCardLoaded(true)}
            onError={() => {
              if (debug) {
                console.error("[gallery][card][image-error]", {
                  imageSrc,
                  attempt: 0,
                })
              }
              setFailed(true)
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
            Failed to load image
          </div>
        )}
      </button>

      <div className="p-4">
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
    </article>

      {openPreview && !failed ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpenPreview(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            type="button"
            onClick={() => setOpenPreview(false)}
            className="absolute right-4 top-4 rounded-md bg-black/60 px-3 py-1.5 text-sm text-white hover:bg-black/75"
            aria-label="Close image preview"
          >
            Close
          </button>

          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            {!previewFailed ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewSrcWithAttempt}
                  alt={alt}
                  className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
                  onError={() => {
                    if (debug) {
                      console.error("[gallery][preview][image-error]", {
                        imageSrc,
                        attempt: 0,
                      })
                    }
                    setPreviewFailed(true)
                  }}
                />
              </>
            ) : (
              <div className="flex min-h-[200px] min-w-[280px] items-center justify-center rounded-lg bg-white/10 px-6 py-10 text-center text-sm text-white">
                Failed to load preview image
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}

