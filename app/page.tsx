import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Mission } from "@/components/mission"
import { WhatWeDo } from "@/components/what-we-do"
import { Impact } from "@/components/impact"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <WhatWeDo />
        <Impact />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
