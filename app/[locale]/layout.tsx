import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'
import '../globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Fathcinema — Video Production & Marketing Agency',
  description:
    "Fathcinema — to'g'ri brend pozitsiya shakllantirib, sotuvlarni oshirishga yordam beruvchi agentlik. Video Production, Performance Marketing, Brand Positioning.",
  keywords: [
    'video production',
    'marketing agency',
    'brand positioning',
    'performance marketing',
    'fathcinema',
    'reklama agentligi',
    'video ishlab chiqarish',
  ],
  authors: [{ name: 'Fathcinema' }],
  openGraph: {
    title: 'Fathcinema — Video Production & Marketing Agency',
    description:
      "Fathcinema — to'g'ri brend pozitsiya shakllantirib, sotuvlarni oshirishga yordam beruvchi agentlik.",
    type: 'website',
    locale: 'uz_UZ',
    siteName: 'Fathcinema',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fathcinema — Video Production & Marketing Agency',
    description:
      "Fathcinema — to'g'ri brend pozitsiya shakllantirib, sotuvlarni oshirishga yordam beruvchi agentlik.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  return (
    <html lang={locale} className={inter.variable}>
      <body className={`${inter.className} noise-overlay`}>{children}</body>
    </html>
  )
}
