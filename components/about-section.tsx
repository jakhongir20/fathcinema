'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 lg:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Video / Image placeholder */}
          <motion.div
            className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Placeholder gradient - replace with actual image/video */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-violet-600/10 to-black" />
            <div className="absolute inset-0 bg-[url('/placeholder-about.jpg')] bg-cover bg-center opacity-60" />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Play className="w-6 h-6 md:w-7 md:h-7 text-white ml-1" />
              </motion.div>
            </div>

            {/* Border glow */}
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
            <motion.div
              className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/[0.06]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div>
                <p className="text-2xl md:text-3xl font-semibold">2023</p>
                <p className="text-xs md:text-sm text-white/40 mt-1">
                  yildan beri
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-semibold">50+</p>
                <p className="text-xs md:text-sm text-white/40 mt-1">
                  loyihalar
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-semibold">30+</p>
                <p className="text-xs md:text-sm text-white/40 mt-1">
                  hamkorlar
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
