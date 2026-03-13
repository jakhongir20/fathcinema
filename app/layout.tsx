import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz" className={inter.variable}>
      <body className={`${inter.className} noise-overlay`}>{children}</body>
    </html>
  )
}
