"use client"

import Image from "next/image"
import { useEffect, useId, useRef, useState, type ReactNode } from "react"

import { INITIATIVES_AUTO_TRIGGER_DELAY_MS, cn } from "@/lib/utils"

type PhotoPageTheme = {
  page: string
  pageBorder: string
  title: string
  body: string
  badge: string
  badgeIcon: string
}

const themeMap = {
  warm: {
    page: "bg-[#fffaf4]",
    pageBorder: "border-[#e6d4c5]",
    title: "text-[#4f3d38]",
    body: "text-[#6a5a53]",
    badge: "bg-[#b97a53]",
    badgeIcon: "text-[#fff7ef]",
  },
  forest: {
    page: "bg-[#f9fff8]",
    pageBorder: "border-[#d0e1cf]",
    title: "text-[#2e4b34]",
    body: "text-[#4a6150]",
    badge: "bg-[#4c7d59]",
    badgeIcon: "text-[#eff9f0]",
  },
  sky: {
    page: "bg-[#f8fbff]",
    pageBorder: "border-[#cde0f2]",
    title: "text-[#2f4d68]",
    body: "text-[#47627a]",
    badge: "bg-[#4a79a6]",
    badgeIcon: "text-[#f0f8ff]",
  },
} as const

type PhotoPageCardProps = {
  title: string
  description: string
  image: string
  imageAlt: string
  icon?: ReactNode
  direction?: "left" | "right"
  theme?: keyof typeof themeMap
  defaultOpen?: boolean
  autoOpenOnView?: boolean
  className?: string
}

export function PhotoPageCard({
  title,
  description,
  image,
  imageAlt,
  icon,
  direction = "left",
  theme = "warm",
  defaultOpen = false,
  autoOpenOnView = false,
  className,
}: PhotoPageCardProps) {
  const [open, setOpen] = useState(defaultOpen)
  const [hasAutoOpened, setHasAutoOpened] = useState(false)
  const id = useId()
  const cardRef = useRef<HTMLButtonElement | null>(null)
  const autoOpenTimerRef = useRef<number | null>(null)
  const colors = themeMap[theme]
  const imageOnLeft = direction === "left"

  useEffect(() => {
    const card = cardRef.current
    if (!card || !autoOpenOnView || hasAutoOpened || open) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting || hasAutoOpened || open) return
        autoOpenTimerRef.current = window.setTimeout(() => {
          setOpen(true)
          setHasAutoOpened(true)
          observer.disconnect()
        }, INITIATIVES_AUTO_TRIGGER_DELAY_MS)
      },
      { threshold: 0.3 }
    )

    observer.observe(card)
    return () => {
      observer.disconnect()
      if (autoOpenTimerRef.current) {
        window.clearTimeout(autoOpenTimerRef.current)
      }
    }
  }, [autoOpenOnView, hasAutoOpened, open])

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
      aria-controls={id}
      className={cn(
        "group relative w-full overflow-hidden rounded-3xl p-5 text-left transition-all duration-500 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 md:p-7",
        className
      )}
    >
      <div id={id} className="relative">
        <div
          className={cn(
            "grid items-center gap-4 md:gap-0",
            imageOnLeft ? "md:grid-cols-[1.05fr_1fr]" : "md:grid-cols-[1fr_1.05fr]"
          )}
        >
          <div
            className={cn(
              "relative z-10 aspect-[4/3] overflow-hidden rounded-[1.2rem] shadow-[0_18px_32px_-16px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out md:shadow-[0_22px_38px_-16px_rgba(0,0,0,0.55)]",
              "bg-white",
              open
                ? imageOnLeft
                  ? "translate-x-0 translate-y-0 rotate-0 md:-translate-x-4"
                  : "translate-x-0 translate-y-0 rotate-0 md:translate-x-4"
                : imageOnLeft
                ? "translate-x-2 md:translate-x-24 -rotate-2"
                : "-translate-x-2 md:-translate-x-24 rotate-2",
              !open && "md:shadow-[0_26px_45px_-16px_rgba(0,0,0,0.62)]",
              !imageOnLeft && "md:order-2"
            )}
          >
            <Image src={image} alt={imageAlt} fill className="object-cover" />
            <div className="pointer-events-none absolute bottom-[14px] left-[22px] h-[2px] w-24 rounded-full bg-[#e8e8e8]" />
            <div className="pointer-events-none absolute inset-0 rounded-[1rem] shadow-[0_20px_30px_-18px_rgba(0,0,0,0.45)]" />
          </div>

          <div
            className={cn(
              "relative z-20 rounded-2xl border p-5 shadow-[0_14px_28px_-14px_rgba(0,0,0,0.42)] transition-all duration-500 ease-out md:p-6 md:shadow-[0_18px_34px_-14px_rgba(0,0,0,0.48)]",
              colors.page,
              colors.pageBorder,
              open
                ? imageOnLeft
                  ? "translate-x-0 translate-y-0 rotate-0 md:translate-x-4"
                  : "translate-x-0 translate-y-0 rotate-0 md:-translate-x-4"
                : imageOnLeft
                ? "-translate-y-30 -rotate-2 md:-translate-x-24 md:translate-y-0 md:rotate-2"
                : "-translate-y-30 rotate-2 md:translate-x-24 md:translate-y-0 md:-rotate-2"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  colors.badge,
                  colors.badgeIcon
                )}
              >
                {icon}
              </div>
              <p className={cn("text-xs font-semibold uppercase tracking-[0.2em]", colors.body)}>
                {open ? "Tap to overlap" : "Tap to separate"}
              </p>
            </div>
            <h3 className={cn("mt-4 text-2xl font-bold tracking-tight", colors.title)}>{title}</h3>
            <p className={cn("mt-3 leading-relaxed", colors.body)}>{description}</p>
          </div>
        </div>
      </div>
    </button>
  )
}
