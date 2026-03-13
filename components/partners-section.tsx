'use client'

import { motion } from 'framer-motion'

const partners = [
  { name: 'TechCorp', initials: 'TC' },
  { name: 'MediaFlow', initials: 'MF' },
  { name: 'BuildStudio', initials: 'BS' },
  { name: 'GrowthLab', initials: 'GL' },
  { name: 'DataPrime', initials: 'DP' },
  { name: 'CloudNine', initials: 'CN' },
  { name: 'VisionArt', initials: 'VA' },
  { name: 'NextLevel', initials: 'NL' },
]

export default function PartnersSection() {
  return (
    <section
      id="partners"
      className="py-24 md:py-32 lg:py-40 px-6 border-t border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-xs sm:text-sm uppercase tracking-[0.25em] text-blue-400/70 mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          Ishonch
        </motion.p>

        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Hamkorlarimiz
        </motion.h2>

        <motion.p
          className="text-white/40 text-center max-w-lg mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Turli sohalardagi yetakchi kompaniyalar bilan hamkorlik qilamiz
        </motion.p>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              className="group relative h-24 md:h-32 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04]"
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5 },
                },
              }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Placeholder logo — replace with actual partner logos */}
              <div className="flex items-center gap-3 transition-all duration-500 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-500/30 to-violet-500/30 flex items-center justify-center border border-white/[0.08]">
                  <span className="text-xs md:text-sm font-semibold text-white/80">
                    {partner.initials}
                  </span>
                </div>
                <span className="text-sm md:text-base font-medium text-white/60 group-hover:text-white/90 transition-colors duration-500">
                  {partner.name}
                </span>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
