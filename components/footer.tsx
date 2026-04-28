import Link from "next/link"
import { Leaf } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="size-5 text-primary" />
            <span className="text-lg font-bold font-serif tracking-tight text-foreground">
              Bhopal Cares Forum
            </span>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-6">
              {["Mission", "Our Work", "Impact", "Gallery", "Donate"].map(
                (item) => (
                  <li key={ item}>
                    <Link
                      href={
                        item === "Gallery"
                          ? "/#gallery"
                          : `/#${item.toLowerCase().replace(/\s+/g, "-")}`
                      }
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
            Bhopal Cares Forum &middot; Bhopal, Madhya Pradesh, India
          </p>
        </div>
      </div>
    </footer>
  )
}
