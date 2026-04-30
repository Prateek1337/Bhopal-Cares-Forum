"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Mission", href: "/#mission" },
  { label: "Our Work", href: "/#what-we-do" },
  { label: "Impact", href: "/#impact" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Donate", href: "/#donate" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/85 backdrop-blur-md shadow-[0_10px_30px_-22px_color-mix(in_oklab,var(--primary)_65%,transparent)]">
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-2.png"
            alt="Bhopal Cares Forum logo"
            width={180}
            height={48}
            priority
            className="h-12 w-auto object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.28)]"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-pop text-sm font-medium text-muted-foreground drop-shadow-[0_1px_1px_rgba(0,0,0,0.22)] transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button asChild>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSccNIrhpQ8-JnMktQOGPkDN5H61Wu15WtitbBdW7Gjpe4cFEA/viewform?pli=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Us
            </Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="text-foreground"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 pb-6 pt-4">
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
            <Button className="w-full" asChild>
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSccNIrhpQ8-JnMktQOGPkDN5H61Wu15WtitbBdW7Gjpe4cFEA/viewform?pli=1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                Join Us
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
