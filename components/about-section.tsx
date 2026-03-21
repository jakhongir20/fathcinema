'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { getTranslations } from '@/lib/translations'

function useCountUp(end: number, duration = 2000, inView = false) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, end, duration])

  return count
}

function CountUpStats({ locale }: { locale: string }) {
  const t = getTranslations(locale)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const year = useCountUp(2023, 2000, inView)
  const projects = useCountUp(50, 2000, inView)
  const partners = useCountUp(30, 2000, inView)

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/[0.06]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div>
        <p className="text-2xl md:text-3xl font-semibold">{year}</p>
        <p className="text-xs md:text-sm text-white/40 mt-1">
          {t.about.statYear}
        </p>
      </div>
      <div>
        <p className="text-2xl md:text-3xl font-semibold">{projects}+</p>
        <p className="text-xs md:text-sm text-white/40 mt-1">
          {t.about.statProjects}
        </p>
      </div>
      <div>
        <p className="text-2xl md:text-3xl font-semibold">{partners}+</p>
        <p className="text-xs md:text-sm text-white/40 mt-1">
          {t.about.statPartners}
        </p>
      </div>
    </motion.div>
  )
}

export default function AboutSection({ locale }: { locale: string }) {
  const t = getTranslations(locale)

  return (
    <>
      <div className="gradient-divider" />
      <section id="about" className="relative py-24 md:py-32 lg:py-40 px-6 overflow-hidden">
        {/* Background: faded logo watermark */}
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-[0.04] pointer-events-none select-none">
          <Image
            src="/logo_white.svg"
            alt=""
            fill
            className="object-contain"
            aria-hidden="true"
          />
        </div>
        {/* Background: gradient orbs */}
        <div className="absolute -left-32 top-10 w-[500px] h-[500px] rounded-full bg-blue-500/15 blur-[170px] pointer-events-none" />
        <div className="absolute -right-40 bottom-10 w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-[150px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <Image
                src="/hero-1.jpg"
                alt="Fathcinema — professional videographer"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-violet-600/10 to-black/60" />

              {/* Border */}
              <div className="absolute inset-0 rounded-2xl border border-white/[0.08]" />
            </motion.div>

            {/* Text content */}
            <div>
              <motion.p
                className="text-xs sm:text-sm uppercase tracking-[0.25em] text-blue-400/70 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
              >
                {t.about.badge}
              </motion.p>

              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {t.about.title}
                <br />
                <span className="text-white/50">{t.about.titleAccent}</span>
              </motion.h2>

              <div className="space-y-5">
                {[t.about.p1, t.about.p2, t.about.p3, t.about.p4].map(
                  (text, i) => (
                    <motion.p
                      key={i}
                      className="text-base md:text-lg text-white/50 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                    >
                      {text}
                    </motion.p>
                  )
                )}
              </div>

              {/* Stats */}
              <CountUpStats locale={locale} />
            </div>
          </div>
        </div>
      </section>
      <div className="gradient-divider" />
    </>
  )
}
