'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Film, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getTranslations } from '@/lib/translations'

const marketingImages = [
  '/hero-2.jpg',
  '/hero-1.jpg',
  '/hero-2.jpg',
  '/hero-1.jpg',
  '/hero-2.jpg',
]

const videoImages = ['/hero-1.jpg', '/hero-2.jpg', '/hero-1.jpg']

function ServiceBlock({
  title,
  shortDescription,
  icon: Icon,
  items,
  images,
}: {
  title: string
  shortDescription: string
  icon: typeof BarChart3
  items: { title: string; description: string }[]
  images: string[]
}) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const prev = () => goTo(current === 0 ? items.length - 1 : current - 1)
  const next = useCallback(
    () => goTo(current === items.length - 1 ? 0 : current + 1),
    [current, items.length] // eslint-disable-line react-hooks/exhaustive-deps
  )

  // Auto slide every 1.5s
  useEffect(() => {
    const timer = setInterval(next, 2500)
    return () => clearInterval(timer)
  }, [next])

  const item = items[current]
  const image = images[current % images.length]

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  }

  return (
    <div>
      {/* Service title header */}
      <motion.div
        className="mb-14 md:mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/25 to-violet-500/25 border border-white/[0.1] flex items-center justify-center">
            <Icon className="w-5 h-5 text-blue-400" />
          </div>
        </div>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4">
          {title}
        </h3>
        <p className="text-base md:text-lg text-white/40 max-w-xl leading-relaxed">
          {shortDescription}
        </p>
      </motion.div>

      {/* Desktop: image left + content right */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-0 items-stretch">
        {/* Left: Image with number + arrows overlaid */}
        <div className="relative aspect-[4/3] rounded-l-2xl overflow-visible">
          {/* Image */}
          <div className="relative w-full h-full overflow-hidden rounded-l-2xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 rounded-l-2xl border border-white/[0.08] border-r-0" />

          </div>

          {/* Number block + arrows — bottom-right, extends below image */}
          <div className="absolute bottom-0 right-0 w-3/5 h-36 bg-gradient-to-br from-blue-600 to-violet-600 rounded-tl-2xl flex items-start justify-between z-10">
            {/* Number */}
            <div className="flex items-end h-full p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={current}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="text-7xl font-bold text-white/90 leading-none"
                >
                  {current + 1}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Arrows — top right of indicator block */}
            <div className="flex gap-2 p-4">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="border border-white/[0.06] border-l-white/[0.03] rounded-r-2xl p-10 lg:p-14 flex flex-col justify-center relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <span className="text-xs font-mono text-blue-400/50 mb-5 block">
                / {String(current + 1).padStart(2, '0')}
              </span>

              <h4 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-5 tracking-tight">
                {item.title}
              </h4>

              <p className="text-sm md:text-base text-white/45 leading-relaxed max-w-md">
                {item.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots indicator */}
          <div className="flex gap-2 mt-10">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  'h-1 rounded-full transition-all duration-400',
                  i === current
                    ? 'w-8 bg-gradient-to-r from-blue-400 to-violet-400'
                    : 'w-2 bg-white/10 hover:bg-white/20'
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: card slider */}
      <div className="lg:hidden">
        {/* Image */}
        <div className="relative aspect-[16/9] rounded-t-2xl overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 rounded-t-2xl border border-white/[0.08] border-b-0" />

          {/* Number block + arrows — bottom-right, 60% width */}
          <div className="absolute bottom-0 right-0 w-3/5 h-20 sm:h-28 bg-gradient-to-br from-blue-600 to-violet-600 rounded-tl-2xl flex items-start justify-between z-10">
            {/* Number */}
            <div className="flex items-end h-full p-4">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-5xl font-bold text-white/90 leading-none"
                >
                  {current + 1}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Arrows — top right */}
            <div className="flex gap-2 p-3">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-b-2xl border border-white/[0.08] border-t-0 bg-white/[0.03] p-6 min-h-[180px] relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <span className="text-xs font-mono text-blue-400/50 mb-3 block">
                / {String(current + 1).padStart(2, '0')}
              </span>
              <h4 className="text-xl font-medium mb-2">{item.title}</h4>
              <p className="text-sm text-white/45 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex gap-2 mt-5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  'h-1 rounded-full transition-all duration-400',
                  i === current
                    ? 'w-6 bg-gradient-to-r from-blue-400 to-violet-400'
                    : 'w-1.5 bg-white/10'
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesSection({ locale }: { locale: string }) {
  const t = getTranslations(locale)

  return (
    <>
      <section
        id="services"
        className="relative py-24 md:py-32 lg:py-40 px-6 overflow-hidden"
      >
        {/* Background: gradient orbs */}
        <div className="absolute -left-32 top-10 w-[500px] h-[500px] rounded-full bg-blue-500/15 blur-[170px] pointer-events-none" />
        <div className="absolute -right-40 bottom-10 w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-[150px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Section header */}
          <motion.p
            className="text-xs sm:text-sm uppercase tracking-[0.25em] text-blue-400/70 mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            {t.services.badge}
          </motion.p>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-center mb-20 md:mb-28"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t.services.title}
          </motion.h2>

          {/* Service blocks */}
          <div className="space-y-28 md:space-y-36">
            <ServiceBlock
              title={t.services.marketing.title}
              shortDescription={t.services.marketing.shortDescription}
              icon={BarChart3}
              items={t.services.marketing.items}
              images={marketingImages}
            />

            <ServiceBlock
              title={t.services.video.title}
              shortDescription={t.services.video.shortDescription}
              icon={Film}
              items={t.services.video.items}
              images={videoImages}
            />
          </div>
        </div>
      </section>
      <div className="gradient-divider" />
    </>
  )
}
