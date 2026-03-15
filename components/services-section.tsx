'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Film, BarChart3, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  {
    id: 'marketing',
    number: '01',
    title: 'Performance marketing',
    icon: BarChart3,
    description:
      "Maqsadli auditoriyangizga samarali yetib borish uchun to'liq marketing xizmatlarini taqdim etamiz.",
    items: [
      'Tadqiqot',
      'Strategiya',
      'Kontent marketing',
      'Target (Meta / Google Ads)',
      'Analitika & optimizatsiya',
    ],
  },
  {
    id: 'video',
    number: '02',
    title: 'Video production',
    icon: Film,
    description:
      'Yuqori sifatli video kontent ishlab chiqarish orqali brendingizni yangi darajaga olib chiqamiz.',
    items: [
      'Promo roliklar',
      'Brend videolari',
      'Intervyu & ekspert videolar',
    ],
  },
]

export default function ServicesSection() {
  const [openId, setOpenId] = useState<string | null>('marketing')

  return (
    <>
    <section id="services" className="relative py-24 md:py-32 lg:py-40 px-6 overflow-hidden">
      {/* Background: gradient orbs */}
      <div className="absolute -left-32 top-10 w-[500px] h-[500px] rounded-full bg-blue-500/15 blur-[170px] pointer-events-none" />
      <div className="absolute -right-40 bottom-10 w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-[150px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <motion.p
          className="text-xs sm:text-sm uppercase tracking-[0.25em] text-blue-400/70 mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          Xizmatlar
        </motion.p>

        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Yo&apos;nalishlar
        </motion.h2>

        <div className="space-y-4">
          {services.map((service, index) => {
            const isOpen = openId === service.id
            const Icon = service.icon

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div
                  className={cn(
                    'rounded-2xl border transition-all duration-500 overflow-hidden',
                    isOpen
                      ? 'bg-white/[0.03] border-white/[0.08]'
                      : 'bg-transparent border-white/[0.06] hover:bg-white/[0.02] hover:border-white/[0.1]'
                  )}
                >
                  {/* Header */}
                  <button
                    className="w-full px-6 md:px-10 py-6 md:py-8 flex items-center gap-4 md:gap-8 text-left cursor-pointer"
                    onClick={() =>
                      setOpenId(isOpen ? null : service.id)
                    }
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm md:text-base font-mono text-white/20">
                      {service.number}
                    </span>

                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                    </div>

                    <h3 className="text-lg md:text-2xl font-medium flex-grow">
                      {service.title}
                    </h3>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-white/30" />
                    </motion.div>
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                      >
                        <div className="px-6 md:px-10 pb-8 md:pb-10">
                          <div className="pl-0 md:pl-[88px]">
                            <p className="text-white/40 text-sm md:text-base leading-relaxed mb-6">
                              {service.description}
                            </p>

                            <motion.ul
                              className="space-y-3"
                              initial="hidden"
                              animate="visible"
                              variants={{
                                hidden: {},
                                visible: {
                                  transition: { staggerChildren: 0.08 },
                                },
                              }}
                            >
                              {service.items.map((item) => (
                                <motion.li
                                  key={item}
                                  className="flex items-center gap-3 text-white/60"
                                  variants={{
                                    hidden: { opacity: 0, x: -10 },
                                    visible: {
                                      opacity: 1,
                                      x: 0,
                                      transition: { duration: 0.4 },
                                    },
                                  }}
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 flex-shrink-0" />
                                  <span className="text-sm md:text-base">
                                    {item}
                                  </span>
                                </motion.li>
                              ))}
                            </motion.ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
    <div className="gradient-divider" />
    </>
  )
}
