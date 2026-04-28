"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function CtaSection() {
  return (
    <section id="donate" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-lg bg-primary p-10 text-center md:p-16">
          <h2 className="font-serif text-3xl tracking-tight text-primary-foreground sm:text-4xl md:text-5xl text-balance">
            Be the Change Bhopal Needs
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
            Whether you can spare an hour or a whole day, every bit of effort
            counts. Join our next drive, donate clothes, or help us spread the
            word.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-base px-8 py-3 h-auto"
              asChild
            >
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSccNIrhpQ8-JnMktQOGPkDN5H61Wu15WtitbBdW7Gjpe4cFEA/viewform?pli=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Us
              </Link>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 py-3 h-auto border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  Donate
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Donate via QR</DialogTitle>
                  <DialogDescription>
                    Scan this QR code to make your donation.
                  </DialogDescription>
                </DialogHeader>
                <img
                  src="/images/donate-qr.jpeg"
                  alt="Donate QR code"
                  className="mx-auto w-full max-w-xs rounded-md border border-border"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  )
}
