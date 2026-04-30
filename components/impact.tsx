"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"

import { IMPACT_AUTO_TRIGGER_DELAY_MS, cn } from "@/lib/utils"

const stats = [
  { value: "38", label: "Drives Completed", finalOrder: 0 },
  { value: "1280+", label: "Trees Planted", finalOrder: 1 },
  { value: "4135+", label: "kg Waste Removed", finalOrder: 2 },
  { value: "100+", label: "Active Volunteers", finalOrder: 3 },
]

const ANIMATION_DURATION_MS = 1600
const STAGGER_MS = 1

type ScatterConfig = {
  x: number
  y: number
  rotate: number
  order: number
}

function getFixedScatterConfig(size: number): ScatterConfig[] {
  const preset: ScatterConfig[] = [
    { x: -18, y: -12, rotate: -5, order: 3 },
    { x: 18, y: 12, rotate: 4, order: 2 },
    { x: -18, y: 12, rotate: 6, order: 0 },
    { x: 18, y: -12, rotate: -4, order: 1 },
  ]

  return Array.from({ length: size }, (_, index) => preset[index] ?? { x: 0, y: 0, rotate: 0, order: index })
}

export function Impact() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const organizedRef = useRef(false)
  const [organized, setOrganized] = useState(false)
  const [showValues, setShowValues] = useState(false)
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false)
  const [scatterConfig, setScatterConfig] = useState<ScatterConfig[]>(() =>
    getFixedScatterConfig(stats.length)
  )
  const [pendingFlip, setPendingFlip] = useState(false)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const firstRectsRef = useRef<Record<string, DOMRect>>({})
  const revealTimerRef = useRef<number | null>(null)
  const autoTriggerTimerRef = useRef<number | null>(null)

  useLayoutEffect(() => {
    if (!pendingFlip) return

    const easing = "cubic-bezier(0.16, 1, 0.2, 1.2)"
    const durationMs = ANIMATION_DURATION_MS

    stats.forEach((stat, index) => {
      const element = cardRefs.current[stat.label]
      const first = firstRectsRef.current[stat.label]
      if (!element || !first) return

      const last = element.getBoundingClientRect()
      const dx = first.left - last.left
      const dy = first.top - last.top

      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return

      element.style.transition = "none"
      element.style.transform = `translate(${dx}px, ${dy}px)`

      element.getBoundingClientRect()

      requestAnimationFrame(() => {
        const delayMs = index * STAGGER_MS
        element.style.transition = `transform ${durationMs}ms ${easing} ${delayMs}ms`
        element.style.transform = "translate(0px, 0px)"
      })

      const cleanup = () => {
        element.style.transition = ""
        element.style.transform = ""
        element.removeEventListener("transitionend", cleanup)
      }

      element.addEventListener("transitionend", cleanup)
    })

    setPendingFlip(false)
  }, [organized, scatterConfig, pendingFlip])

  useEffect(() => {
    organizedRef.current = organized
  }, [organized])

  useEffect(() => {
    return () => {
      if (revealTimerRef.current) {
        window.clearTimeout(revealTimerRef.current)
      }
      if (autoTriggerTimerRef.current) {
        window.clearTimeout(autoTriggerTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || hasAutoTriggered) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting || hasAutoTriggered || organized) return
        autoTriggerTimerRef.current = window.setTimeout(() => {
          if (organizedRef.current) return
          setHasAutoTriggered(true)
          toggleLayout()
          observer.disconnect()
        }, IMPACT_AUTO_TRIGGER_DELAY_MS)
      },
      { threshold: 0.35 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [hasAutoTriggered, organized])

  useEffect(() => {
    if (!organized) return
    if (!autoTriggerTimerRef.current) return
    window.clearTimeout(autoTriggerTimerRef.current)
    autoTriggerTimerRef.current = null
  }, [organized])

  const toggleLayout = () => {
    const firstRects: Record<string, DOMRect> = {}
    stats.forEach((stat) => {
      const element = cardRefs.current[stat.label]
      if (element) {
        firstRects[stat.label] = element.getBoundingClientRect()
      }
    })
    firstRectsRef.current = firstRects
    setPendingFlip(true)

    if (revealTimerRef.current) {
      window.clearTimeout(revealTimerRef.current)
    }

    setOrganized((prev) => {
      if (prev) {
        setShowValues(false)
        setScatterConfig(getFixedScatterConfig(stats.length))
      } else {
        const settleDelay = ANIMATION_DURATION_MS + (stats.length - 1) * STAGGER_MS - 300
        revealTimerRef.current = window.setTimeout(() => {
          setShowValues(true)
        }, settleDelay)
      }
      return !prev
    })
  }

  return (
    <section id="impact" ref={sectionRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Our Impact
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Numbers That Tell Our Story
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Every drive, every sapling, every piece of clothing adds up to
            meaningful change across Bhopal.
          </p>
          <p
            className={cn(
              "mx-auto mt-5 max-w-xl text-sm font-medium text-primary/80 transition-all duration-500",
              organized ? "opacity-0 -translate-y-1 pointer-events-none" : "opacity-100 translate-y-0"
            )}
          >
            Tap any card to organize and reveal impact numbers
          </p>
        </div>

        <div
          className={cn(
            "mt-16 grid gap-6",
            organized
              ? "grid-cols-2 md:grid-cols-4"
              : "mx-auto w-full max-w-[760px] grid-cols-2 md:max-w-[620px]"
          )}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => {
                cardRefs.current[stat.label] = el
              }}
              className="will-change-transform"
              style={{
                order: organized ? stat.finalOrder : (scatterConfig[index]?.order ?? index),
              }}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={toggleLayout}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    toggleLayout()
                  }
                }}
                className={cn(
                  "flex cursor-pointer flex-col items-center rounded-lg border border-border bg-card p-8 text-center transition-[border-color,box-shadow] duration-500 hover:border-primary/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2",
                  organized ? "translate-x-0 translate-y-0 rotate-0" : "md:hover:scale-[1.02]"
                )}
                style={{
                  transform: organized
                    ? "translate(0px, 0px) rotate(0deg)"
                    : `translate(${scatterConfig[index]?.x ?? 0}px, ${scatterConfig[index]?.y ?? 0}px) rotate(${scatterConfig[index]?.rotate ?? 0}deg)`,
                }}
              >
                <span
                  className={cn(
                    "font-serif text-4xl tracking-tight text-primary md:text-5xl transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                    organized && showValues
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-75 -translate-y-2 pointer-events-none"
                  )}
                >
                  {stat.value}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium text-muted-foreground transition-all duration-500",
                    organized ? "mt-3" : "mt-0"
                  )}
                >
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
