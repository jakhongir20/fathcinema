import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import AboutSection from '@/components/about-section'
import ServicesSection from '@/components/services-section'
import PartnersSection from '@/components/partners-section'
import ContactSection from '@/components/contact-section'
import FloatingCTA from '@/components/floating-cta'
import Footer from '@/components/footer'

export default async function Home({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = await params

  return (
    <>
      <Header locale={locale} />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PartnersSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}
