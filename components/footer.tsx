'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 md:py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold tracking-tight mb-3">
              Fathcinema
            </h3>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Video production va performance marketing orqali brendingizni
              rivojlantiring.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-medium text-white/60 mb-4">
              Sahifalar
            </h4>
            <nav className="space-y-2.5">
              <a
                href="#about"
                className="block text-sm text-white/40 hover:text-white transition-colors"
              >
                Biz haqimizda
              </a>
              <a
                href="#services"
                className="block text-sm text-white/40 hover:text-white transition-colors"
              >
                Yo&apos;nalishlar
              </a>
              <a
                href="#partners"
                className="block text-sm text-white/40 hover:text-white transition-colors"
              >
                Hamkorlar
              </a>
              <a
                href="#contact"
                className="block text-sm text-white/40 hover:text-white transition-colors"
              >
                Bog&apos;lanish
              </a>
            </nav>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-medium text-white/60 mb-4">
              Aloqa
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+998998161610"
                className="flex items-center gap-2.5 text-sm text-white/40 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                +998 99 816 16 10
              </a>
              <a
                href="mailto:info@fathcinema.uz"
                className="flex items-center gap-2.5 text-sm text-white/40 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                info@fathcinema.uz
              </a>
              <p className="flex items-center gap-2.5 text-sm text-white/40">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                Toshkent, O&apos;zbekiston
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Fathcinema. Barcha huquqlar
            himoyalangan.
          </p>
          <div className="flex items-center gap-1 text-xs text-white/25">
            <span>Powered by</span>
            <span className="font-medium text-white/40">Fathcinema</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
