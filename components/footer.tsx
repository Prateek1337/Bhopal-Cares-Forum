import Link from "next/link"
import { Leaf } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="size-6 text-primary" />
            <span className="text-lg font-bold font-serif tracking-tight text-foreground">
              Seva Bhopal
            </span>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-6">
              {["Mission", "What We Do", "Impact", "Drives", "Contact"].map(
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
            Seva Bhopal Foundation, Bhopal, Madhya Pradesh, India
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            {'A volunteer-led initiative for a better Bhopal.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
