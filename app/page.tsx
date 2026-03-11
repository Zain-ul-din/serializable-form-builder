import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "./_components/hero-section"
import { FeaturesSection } from "./_components/features-section"
import { DemoSection } from "./_components/demo-section"

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
      </main>
      <Footer />
    </>
  )
}
