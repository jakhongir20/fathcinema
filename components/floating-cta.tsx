'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone } from 'lucide-react'
import { getTranslations } from '@/lib/translations'

export default function FloatingCTA({ locale }: { locale: string }) {
  const t = getTranslations(locale)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="tel:+998998161610"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={t.floatingCta.ariaLabel}
        >
          <Phone className="w-5 h-5 text-white" />

          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 animate-ping opacity-20" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
