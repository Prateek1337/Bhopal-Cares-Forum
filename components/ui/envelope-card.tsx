"use client"

import { useId, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

type EnvelopeTheme = {
  shell: string
  flap: string
  stamp: string
  stampIcon: string
  title: string
  body: string
  letter: string
  letterText: string
  border?: string
}

const themeMap: Record<string, EnvelopeTheme> = {
  warm: {
    shell: "bg-[#f2ece5]",
    flap: "bg-[#e5d6c8]",
    stamp: "bg-[#b97a53]",
    stampIcon: "text-[#fff7ef]",
    title: "text-[#4f3d38]",
    body: "text-[#6a5a53]",
    letter: "bg-[#fffaf4]",
    letterText: "text-[#5d4a42]",
    border: "border-[#e3d2c4]",
  },
  forest: {
    shell: "bg-[#e8f0e7]",
    flap: "bg-[#d4e3d2]",
    stamp: "bg-[#4c7d59]",
    stampIcon: "text-[#eef9f0]",
    title: "text-[#2e4b34]",
    body: "text-[#4a6150]",
    letter: "bg-[#f8fff8]",
    letterText: "text-[#34543c]",
    border: "border-[#cfe1ce]",
  },
  sky: {
    shell: "bg-[#e8f1f9]",
    flap: "bg-[#d4e5f6]",
    stamp: "bg-[#4a79a6]",
    stampIcon: "text-[#eff8ff]",
    title: "text-[#2f4d68]",
    body: "text-[#47627a]",
    letter: "bg-[#f7fbff]",
    letterText: "text-[#36516a]",
    border: "border-[#cde0f2]",
  },
}

type EnvelopeCardProps = {
  title: string
  description: string
  icon?: ReactNode
  theme?: keyof typeof themeMap
  defaultOpen?: boolean
  className?: string
}

export function EnvelopeCard({
  title,
  description,
  icon,
  theme = "warm",
  defaultOpen = false,
  className,
}: EnvelopeCardProps) {
  const [open, setOpen] = useState(defaultOpen)
  const contentId = useId()
  const colors = themeMap[theme]

  return (
    <button
      type="button"
      onClick={() => setOpen((value) => !value)}
      aria-expanded={open}
      aria-controls={contentId}
      className={cn(
        "group relative w-full overflow-hidden rounded-3xl border p-6 text-left shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2",
        colors.shell,
        colors.border,
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-24 origin-top transition-transform duration-500",
          colors.flap,
          open ? "-translate-y-[75%] rotate-[-3deg]" : "translate-y-0"
        )}
      />

      <div className="relative z-10">
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl",
            colors.stamp,
            colors.stampIcon
          )}
        >
          {icon}
        </div>

        <h3 className={cn("mt-6 text-3xl font-bold tracking-tight", colors.title)}>
          {title}
        </h3>

        <p className={cn("mt-2 text-sm font-medium uppercase tracking-wider", colors.body)}>
          {open ? "Tap to close" : "Tap to open"}
        </p>

        <div
          id={contentId}
          className={cn(
            "grid transition-all duration-500",
            open ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div
              className={cn(
                "rounded-2xl border px-4 py-4 text-lg leading-relaxed",
                colors.letter,
                colors.letterText,
                colors.border
              )}
            >
              {description}
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}
