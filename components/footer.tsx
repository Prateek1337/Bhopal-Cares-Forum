import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <Image
            src="/logo-4.png"
            alt="Bhopal Cares Forum logo"
            width={180}
            height={48}
            className="h-12 w-auto object-contain"
          />

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

        <div className="mt-6 border-t border-border pt-5 text-center">
          <Link
            href="https://github.com/Prateek1337/Bhopal-Cares-Forum"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Made with ❤️ for Bhopal Cares Forum
          </Link>
        </div>
      </div>
    </footer>
  )
}
