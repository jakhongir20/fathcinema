'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Play, X } from 'lucide-react'

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

const DEMO_VIDEO_URL =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'

function CountUpStats() {
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
        <p className="text-xs md:text-sm text-white/40 mt-1">yildan beri</p>
      </div>
      <div>
        <p className="text-2xl md:text-3xl font-semibold">{projects}+</p>
        <p className="text-xs md:text-sm text-white/40 mt-1">loyihalar</p>
      </div>
      <div>
        <p className="text-2xl md:text-3xl font-semibold">{partners}+</p>
        <p className="text-xs md:text-sm text-white/40 mt-1">hamkorlar</p>
      </div>
    </motion.div>
  )
}

export default function AboutSection() {
  const [videoOpen, setVideoOpen] = useState(false)

  const closeVideo = useCallback(() => setVideoOpen(false), [])

  useEffect(() => {
    if (!videoOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeVideo()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [videoOpen, closeVideo])

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
            {/* Video / Image placeholder */}
            <motion.div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              onClick={() => setVideoOpen(true)}
            >
              {/* Poster — preview thumbnail from demo video */}
              <video
                className="absolute inset-0 w-full h-full object-cover opacity-50"
                src={DEMO_VIDEO_URL}
                muted
                playsInline
                preload="metadata"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-violet-600/15 to-black/80" />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-6 h-6 md:w-7 md:h-7 text-white ml-1" />
                </motion.div>
              </div>

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
                Biz haqimizda
              </motion.p>

              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Natijaga yo&apos;naltirilgan
                <br />
                <span className="text-white/50">marketing agentligi</span>
              </motion.h2>

              <div className="space-y-5">
                <motion.p
                  className="text-base md:text-lg text-white/50 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Fathcinema — bu to&apos;g&apos;ri brend pozitsiya shakllantirib,
                  sotuvlarni oshirishga yordam beruvchi agentlik!
                </motion.p>

                <motion.p
                  className="text-base md:text-lg text-white/50 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Biz 2023-yildan beri o&apos;z faoliyatimizni olib boramiz. Shu
                  vaqt davomida turli sohalardagi bizneslar bilan ishlab, ularning
                  bozoridagi o&apos;rnini aniqlash, aniq brend pozitsiyasini
                  shakllantirish va samarali marketing tizimini yo&apos;lga
                  qo&apos;yishga yordam berdik.
                </motion.p>

                <motion.p
                  className="text-base md:text-lg text-white/50 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Ish jarayonida biz avvalo marketing tadqiqotlari
                  o&apos;tkazamiz, biznesning kuchli tomonlari va auditoriyasini
                  aniqlaymiz. Shundan so&apos;ng brend uchun aniq pozitsiya va
                  marketing strategiya ishlab chiqiladi.
                </motion.p>

                <motion.p
                  className="text-base md:text-lg text-white/50 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Keyingi bosqichda esa video kontent va performance marketing
                  orqali ushbu strategiyani amaliyotga tatbiq qilib, biznesga
                  ko&apos;proq mijoz jalb qilish va sotuvlarni oshirishga yordam
                  beramiz.
                </motion.p>
              </div>

              {/* Stats */}
              <CountUpStats />
            </div>
          </div>
        </div>
      </section>
      <div className="gradient-divider" />

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={closeVideo}
            />

            {/* Close button */}
            <motion.button
              className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
              onClick={closeVideo}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.15 }}
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Video container */}
            <motion.div
              className="relative z-10 w-[90vw] max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/50"
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <video
                className="w-full h-full object-cover bg-black"
                src={DEMO_VIDEO_URL}
                controls
                autoPlay
                playsInline
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
