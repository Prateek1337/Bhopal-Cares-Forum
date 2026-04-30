"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isBrown = mounted && resolvedTheme === "brown"

  return (
    <button
      type="button"
      onClick={() => setTheme(isBrown ? "green" : "brown")}
      aria-label="Toggle brown and green theme"
      className={`relative inline-flex h-7 w-12 items-center rounded-full border shadow-[0_3px_10px_rgba(0,0,0,0.18)] ring-1 ring-black/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 ${
        isBrown
          ? "border-amber-900/55 bg-amber-700"
          : "border-emerald-700/70 bg-emerald-600"
      }`}
      title={isBrown ? "Switch to green theme" : "Switch to brown theme"}
    >
      <span className="sr-only">Theme toggle</span>
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.28)] transition-transform duration-200 ${
          isBrown ? "translate-x-1" : "translate-x-6"
        }`}
      />
    </button>
  )
}
