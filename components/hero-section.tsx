'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
  },
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-blue-600/20 blur-[150px]"
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 60, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-violet-600/20 blur-[150px]"
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 40, -50, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-[40%] right-[15%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full bg-cyan-500/10 blur-[120px]"
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -40, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/40 mb-6 md:mb-8"
        >
          Creative Agency
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-medium tracking-tight leading-[0.95]"
        >
          Video production
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
            va marketing
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 md:mt-8 text-base md:text-lg text-white/40 max-w-xl mx-auto leading-relaxed"
        >
          Brend pozitsiyasini shakllantirish, video kontent ishlab chiqarish va
          performance marketing orqali biznesingizni rivojlantiring.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10 md:mt-12"
        >
          <Button size="lg" asChild>
            <a href="#contact">Bog&apos;lanish</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#about">Biz haqimizda</a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.6 },
          y: { delay: 1.5, duration: 2, repeat: Infinity },
        }}
      >
        <ArrowDown className="w-5 h-5 text-white/20" />
      </motion.div>
    </section>
  )
}
