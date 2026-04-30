"use client"

import { useEffect, useMemo, useState } from "react"

type GalleryImageCardProps = {
  alt: string
  date: string
  imageSrc: string
  thumbnailSrc?: string
  thumbnailDelayMs?: number
  onCardSettled?: () => void
  debug?: boolean
}

const CARD_SETTLE_TIMEOUT_MS = Number(process.env.NEXT_PUBLIC_GALLERY_CARD_TIMEOUT_MS ?? "25000")

function getUrlKind(url: string) {
  if (!url) return "empty"
  if (url.startsWith("/api/gallery-image/")) return "proxy-full-image"
  if (url.startsWith("/api/gallery-thumbnail/")) return "proxy-thumbnail"
  if (url.includes("googleusercontent.com") || url.includes("googleapis.com")) return "google-thumbnail"
  if (url.startsWith("http://") || url.startsWith("https://")) return "external"
  return "relative"
}

export function GalleryImageCard({
  alt,
  date,
  imageSrc,
  thumbnailSrc,
  thumbnailDelayMs = 400,
  onCardSettled,
  debug = true,
}: GalleryImageCardProps) {
  const [cardLoaded, setCardLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [previewFailed, setPreviewFailed] = useState(false)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [openPreview, setOpenPreview] = useState(false)
  const [hasNotifiedSettled, setHasNotifiedSettled] = useState(false)
  const [canLoadCardImage, setCanLoadCardImage] = useState(thumbnailDelayMs <= 0)

  const cardBaseSrc = thumbnailSrc || imageSrc
  const cardSrcWithAttempt = useMemo(() => cardBaseSrc, [cardBaseSrc])
  const previewSrcWithAttempt = useMemo(() => imageSrc, [imageSrc])

  useEffect(() => {
    if (thumbnailDelayMs <= 0) {
      setCanLoadCardImage(true)
      return
    }

    setCanLoadCardImage(false)
    const timer = window.setTimeout(() => setCanLoadCardImage(true), thumbnailDelayMs)
    return () => window.clearTimeout(timer)
  }, [thumbnailDelayMs, cardSrcWithAttempt])

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
          thumbnailSrc,
          cardSrcWithAttempt,
          cardSrcKind: getUrlKind(cardSrcWithAttempt),
          previewSrcWithAttempt,
          previewSrcKind: getUrlKind(previewSrcWithAttempt),
          locationOrigin: typeof window !== "undefined" ? window.location.origin : "unknown",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
          timeoutMs: CARD_SETTLE_TIMEOUT_MS,
          thumbnailDelayMs,
        })
      }
      setFailed(true)
    }, CARD_SETTLE_TIMEOUT_MS)

    return () => window.clearTimeout(timer)
  }, [
    hasNotifiedSettled,
    cardLoaded,
    failed,
    debug,
    imageSrc,
    thumbnailSrc,
    cardSrcWithAttempt,
    previewSrcWithAttempt,
    thumbnailDelayMs,
  ])

  return (
    <>
      <article className="group relative overflow-hidden rounded-sm border border-border/70 bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1.5 top-0 h-1.5 w-7 -translate-y-1/2 rounded-t-sm border border-b-0 border-border/70 bg-card"
        />
        <button
          type="button"
          onClick={() => {
            if (failed) return
            setPreviewFailed(false)
            setPreviewLoading(true)
            setOpenPreview(true)
          }}
          className="relative aspect-square w-full overflow-hidden bg-muted text-left"
          aria-label="Open image preview"
        >
          {!failed ? (
            canLoadCardImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cardSrcWithAttempt}
                alt={alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                loading="lazy"
                onLoad={() => setCardLoaded(true)}
                onError={() => {
                  if (debug) {
                    console.error("[gallery][card][image-error]", {
                      cardSrcWithAttempt,
                      cardSrcKind: getUrlKind(cardSrcWithAttempt),
                      thumbnailSrc,
                      thumbnailKind: getUrlKind(thumbnailSrc ?? ""),
                      imageSrc,
                      imageSrcKind: getUrlKind(imageSrc),
                      previewSrcWithAttempt,
                      thumbnailDelayMs,
                      locationOrigin: typeof window !== "undefined" ? window.location.origin : "unknown",
                      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
                    })
                  }
                  setFailed(true)
                }}
              />
            ) : (
              <div className="h-full w-full animate-pulse bg-muted" aria-hidden="true" />
            )
          ) : (
            <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
              Failed to load image
            </div>
          )}
        </button>

        <div className="px-1 py-1 text-center leading-none">
          <span className="text-[9px] text-muted-foreground">{date}</span>
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

          <div
            className="relative flex h-[90vh] w-[90vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {!previewFailed ? (
              <>
                {previewLoading ? (
                  <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/35 px-6 text-center text-sm text-white backdrop-blur-[1px]">
                    <div className="rounded-md bg-black/45 px-3 py-2">Loading full image, please wait...</div>
                  </div>
                ) : null}

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewSrcWithAttempt}
                  alt={alt}
                  className={`max-h-[90vh] max-w-[90vw] rounded-lg object-contain ${previewLoading ? "opacity-0" : "opacity-100"}`}
                  onLoad={() => setPreviewLoading(false)}
                  onError={() => {
                    if (debug) {
                      console.error("[gallery][preview][image-error]", {
                        previewSrcWithAttempt,
                        previewSrcKind: getUrlKind(previewSrcWithAttempt),
                        cardSrcWithAttempt,
                        cardSrcKind: getUrlKind(cardSrcWithAttempt),
                        thumbnailSrc,
                        thumbnailKind: getUrlKind(thumbnailSrc ?? ""),
                        imageSrc,
                        imageSrcKind: getUrlKind(imageSrc),
                        thumbnailDelayMs,
                        locationOrigin: typeof window !== "undefined" ? window.location.origin : "unknown",
                        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
                      })
                    }
                    setPreviewLoading(false)
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