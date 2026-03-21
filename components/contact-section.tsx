'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Send, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getTranslations } from '@/lib/translations'

export default function ContactSection({ locale }: { locale: string }) {
  const t = getTranslations(locale)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    position: '',
    phone: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const validate = () => {
    const newErrors: Record<string, boolean> = {}
    if (!formData.name.trim()) newErrors.name = true
    if (!formData.phone.trim()) newErrors.phone = true
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          position: formData.position,
          phone: formData.phone.replace(/\D/g, ''),
        }),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').replace(/^998/, '')
    const d = digits.slice(0, 9)
    let result = '+998'
    if (d.length > 0) result += ' (' + d.slice(0, 2)
    if (d.length >= 2) result += ') '
    if (d.length > 2) result += d.slice(2, 5)
    if (d.length > 5) result += '-' + d.slice(5, 7)
    if (d.length > 7) result += '-' + d.slice(7, 9)
    return result
  }

  const handleChange = (field: string, value: string) => {
    const newValue = field === 'phone' ? formatPhone(value) : value
    setFormData((prev) => ({ ...prev, [field]: newValue }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 lg:py-40 px-6 overflow-hidden">
      {/* Background: logo watermark left */}
      <div className="absolute -left-10 bottom-10 w-[350px] h-[350px] md:w-[500px] md:h-[500px] opacity-[0.035] pointer-events-none select-none rotate-12">
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

      <div className="relative max-w-2xl mx-auto">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-center leading-tight mb-16 md:mb-20 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {t.contact.title}
          <span className="text-white/40">{t.contact.titleAccent}</span>
        </motion.h2>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Gradient glow behind card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-blue-500/10 rounded-3xl blur-xl opacity-60" />

          <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8 md:p-12">
            {submitted ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle2 className="w-14 h-14 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl md:text-2xl font-medium mb-2">
                  {t.contact.successTitle}
                </h3>
                <p className="text-white/50">{t.contact.successMessage}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm text-white/40 mb-2 block">
                    {t.contact.nameLabel}{' '}
                    <span className="text-red-400">*</span>
                  </label>
                  <Input
                    placeholder={t.contact.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={errors.name ? 'border-red-500/50' : ''}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1.5">
                      {t.contact.nameError}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-white/40 mb-2 block">
                    {t.contact.companyLabel}
                  </label>
                  <Input
                    placeholder={t.contact.companyPlaceholder}
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm text-white/40 mb-2 block">
                    {t.contact.positionLabel}
                  </label>
                  <Input
                    placeholder={t.contact.positionPlaceholder}
                    value={formData.position}
                    onChange={(e) => handleChange('position', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm text-white/40 mb-2 block">
                    {t.contact.phoneLabel}{' '}
                    <span className="text-red-400">*</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder={t.contact.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={errors.phone ? 'border-red-500/50' : ''}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-400 mt-1.5">
                      {t.contact.phoneError}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? t.contact.submitting : t.contact.submit}
                    {!loading && <Send className="w-4 h-4 ml-2" />}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
