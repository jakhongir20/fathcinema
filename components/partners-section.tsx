'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { getTranslations } from '@/lib/translations'

const partners = [
  // Row 1
  { name: 'SJ Academy', logo: '/logos/siluet.png' },
  { name: 'My5', logo: '/logos/my5.png' },
  { name: 'UzAuto Trailer', logo: '/logos/uzauto.png' },
  { name: 'Qamar', logo: '/logos/qamar.png' },
  { name: 'PDP Academy', logo: '/logos/pdp.png' },
  // Row 2
  { name: 'Shakhnoza Pardalari', logo: '/logos/parda.png' },
  { name: 'Avlo Mebel', logo: '/logos/avlo.png' },
  { name: 'DR Hasan', logo: '/logos/image135.png' },
  { name: 'Merit Chemicals', logo: '/logos/merit.png' },
  { name: 'Hamkor Residence', logo: '/logos/hamkor.png' },
  // Row 3
  { name: 'Canadian School of Tashkent', logo: '/logos/canada.png' },
  { name: 'Italy', logo: '/logos/image155.png' },
  { name: 'Gilam Saroy', logo: '/logos/gilam.png' },
  { name: 'GlobalSim', logo: '/logos/maskgroup.png' },
  { name: 'CNC Electric', logo: '/logos/cnc.png' },
  // Row 4
  { name: 'Bozorlik', logo: '/logos/chatgpt.png' },
  { name: 'YumaBIO', logo: '/logos/yumobio.png' },
  { name: 'Milliooner Club', logo: '/logos/image150.png' },
  { name: 'Chayxana', logo: '/logos/image148.png' },
  { name: 'De-luxe Cleaning', logo: '/logos/deluxe.png' },
]

export default function PartnersSection({ locale }: { locale: string }) {
  const t = getTranslations(locale)

  return (
    <>
    <section
      id="partners"
      className="relative py-24 md:py-32 lg:py-40 px-6 overflow-hidden"
    >
      {/* Background: gradient orbs */}
      <div className="absolute -left-32 top-10 w-[500px] h-[500px] rounded-full bg-blue-500/15 blur-[170px] pointer-events-none" />
      <div className="absolute -right-40 bottom-10 w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.p
          className="text-xs sm:text-sm uppercase tracking-[0.25em] text-blue-400/70 mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {t.partners.badge}
        </motion.p>

        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t.partners.title}
        </motion.h2>

        <motion.p
          className="text-white/40 text-center max-w-lg mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.partners.description}
        </motion.p>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              className="group flex flex-col items-center gap-3"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5 },
                },
              }}
            >
              <div className="relative w-full h-[58px] md:h-[66px] flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={150}
                  height={66}
                  className="object-contain max-h-[58px] md:max-h-[66px] w-auto opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-400"
                />
              </div>

              <span className="text-[11px] font-medium text-white/30 group-hover:text-white/60 transition-colors duration-400 tracking-wide">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    <div className="gradient-divider" />
    </>
  )
}
