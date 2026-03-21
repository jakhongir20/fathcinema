'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X, ChevronDown, Languages } from 'lucide-react'
import { cn } from '@/lib/utils'
import { locales, defaultLocale, localeNames, type Locale } from '@/lib/i18n'

const navLinks = [
  { href: '#hero', label: 'Bosh sahifa' },
  { href: '#about', label: 'Biz haqimizda' },
  { href: '#services', label: "Yo'nalishlar" },
  { href: '#partners', label: 'Hamkorlar' },
  { href: '#contact', label: "Bog'lanish" },
]

function LanguageSwitcher({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const currentLocale = locale as Locale

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLocale = (target: Locale) => {
    setOpen(false)
    const hash = window.location.hash
    if (target === defaultLocale) {
      window.location.href = `/${hash}`
    } else {
      window.location.href = `/${target}${hash}`
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors duration-300"
      >
        <Languages className="w-4 h-4" />
        {localeNames[currentLocale]}
        <ChevronDown
          className={cn(
            'w-3.5 h-3.5 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] rounded-lg overflow-hidden min-w-[60px]"
          >
            {locales
              .filter((l) => l !== currentLocale)
              .map((l) => (
                <button
                  key={l}
                  onClick={() => switchLocale(l)}
                  className="block w-full px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors text-left"
                >
                  {localeNames[l]}
                </button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Header({ locale }: { locale: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleActiveSection = () => {
      const sectionIds = navLinks.map((link) => link.href.replace('#', ''))
      let current = ''

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2) {
          current = id
        }
      }

      setActiveSection(current)
    }

    handleActiveSection()
    window.addEventListener('scroll', handleActiveSection)
    return () => window.removeEventListener('scroll', handleActiveSection)
  }, [])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a
            href="#hero"
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo_white.svg"
              alt="Fathcinema"
              width={180}
              height={50}
              className="h-10 md:h-11 w-auto"
              priority
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-sm transition-colors duration-300 pb-1',
                  activeSection === link.href.replace('#', '')
                    ? 'text-white'
                    : 'text-white/50 hover:text-white'
                )}
              >
                {link.label}
                {activeSection === link.href.replace('#', '') && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher locale={locale} />

            <a
              href="tel:+998998161610"
              className="hidden sm:flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors duration-300"
            >
              <Phone className="w-3.5 h-3.5" />
              +998 99 816 16 10
            </a>

            <button
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-2xl font-light transition-colors',
                    activeSection === link.href.replace('#', '')
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                  )}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.label}
                  {activeSection === link.href.replace('#', '') && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                  )}
                </motion.a>
              ))}
              <motion.a
                href="tel:+998998161610"
                className="flex items-center gap-2 text-lg text-white/50 hover:text-white transition-colors mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Phone className="w-4 h-4" />
                +998 99 816 16 10
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
