"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Mission", href: "#mission" },
  { label: "Our Work", href: "#what-we-do" },
  { label: "Impact", href: "#impact" },
  { label: "Drives", href: "#drives" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-primary/10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          {/* Mughal dome icon as logo */}
          <svg viewBox="0 0 36 36" className="size-8 text-primary" fill="none" aria-hidden="true">
            <path
              d="M6 36 V18 Q6 3 18 3 Q30 3 30 18 V36"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
            />
            <circle cx="18" cy="10" r="2" fill="currentColor" opacity="0.5" />
            <line x1="18" y1="3" x2="18" y2="0" stroke="currentColor" strokeWidth="2" />
            <circle cx="18" cy="0" r="1.5" fill="currentColor" />
          </svg>
          <div className="flex flex-col">
            <span className="text-lg font-bold font-serif tracking-tight text-foreground leading-none">
              Seva Bhopal
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Foundation
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild className="rounded-sm">
            <Link href="#contact">Join the Seva</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-primary/10 bg-background px-6 pb-6 pt-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Button className="w-full rounded-sm" asChild>
              <Link href="#contact" onClick={() => setOpen(false)}>
                Join the Seva
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
