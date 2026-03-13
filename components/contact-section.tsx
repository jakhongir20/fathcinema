'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    position: '',
    phone: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const validate = () => {
    const newErrors: Record<string, boolean> = {}
    if (!formData.name.trim()) newErrors.name = true
    if (!formData.phone.trim()) newErrors.phone = true
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 lg:py-40 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-medium text-center leading-tight mb-16 md:mb-20 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          Biz bilan hamkorlik qilish uchun{' '}
          <span className="text-white/40">
            ro&apos;yxatdan o&apos;ting va siz bilan qayta bog&apos;lanamiz
          </span>
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
                  Rahmat!
                </h3>
                <p className="text-white/50">
                  Tez orada siz bilan bog&apos;lanamiz.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm text-white/40 mb-2 block">
                    Ismingiz <span className="text-red-400">*</span>
                  </label>
                  <Input
                    placeholder="Ismingizni kiriting"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={errors.name ? 'border-red-500/50' : ''}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1.5">
                      Ismingizni kiriting
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-white/40 mb-2 block">
                    Kompaniyangiz nomi
                  </label>
                  <Input
                    placeholder="Kompaniya nomi"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm text-white/40 mb-2 block">
                    Amaldagi lavozimingiz
                  </label>
                  <Input
                    placeholder="Lavozimingiz"
                    value={formData.position}
                    onChange={(e) => handleChange('position', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm text-white/40 mb-2 block">
                    Telefon raqamingiz <span className="text-red-400">*</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="+998"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={errors.phone ? 'border-red-500/50' : ''}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-400 mt-1.5">
                      Telefon raqamingizni kiriting
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <Button type="submit" size="lg" className="w-full">
                    Yuborish
                    <Send className="w-4 h-4 ml-2" />
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
