import Link from "next/link"
import { DomeSilhouette } from "@/components/bhopali-motifs"

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card overflow-hidden">
      {/* Dome silhouette decoration */}
      <div className="absolute bottom-0 left-0 right-0 text-foreground">
        <DomeSilhouette className="w-full h-16" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 relative z-10">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            {/* Dome logo */}
            <svg viewBox="0 0 36 36" className="size-7 text-primary" fill="none" aria-hidden="true">
              <path
                d="M6 36 V18 Q6 3 18 3 Q30 3 30 18 V36"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
              />
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
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-6">
              {["Mission", "Our Work", "Impact", "Drives", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Seva Bhopal Foundation &middot; City of Lakes, Madhya Pradesh, India
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            {"A volunteer-led initiative honouring Bhopal's heritage of seva."}
          </p>
        </div>
      </div>
    </footer>
  )
}
