import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { locales, defaultLocale, type Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import '../globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

const SITE_URL = 'https://fathcinema.uz'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale)

  const canonicalUrl =
    locale === defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`

  const alternates: Record<string, string> = { 'x-default': SITE_URL }
  for (const l of locales) {
    alternates[l] = l === defaultLocale ? SITE_URL : `${SITE_URL}/${l}`
  }

  return {
    title: t.metadata.title,
    description: t.metadata.description,
    keywords: [
      'video production',
      'marketing agency',
      'brand positioning',
      'performance marketing',
      'fathcinema',
      'reklama agentligi',
      'video ishlab chiqarish',
      'видеопродакшн',
      'маркетинговое агентство',
    ],
    authors: [{ name: 'Fathcinema' }],
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: t.metadata.title,
      description: t.metadata.description,
      type: 'website',
      locale: t.metadata.ogLocale,
      url: canonicalUrl,
      siteName: 'Fathcinema',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.metadata.title,
      description: t.metadata.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

function JsonLd({ locale }: { locale: string }) {
  const t = getTranslations(locale)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fathcinema',
    url: SITE_URL,
    logo: `${SITE_URL}/logo_white.svg`,
    description: t.metadata.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tashkent',
      addressCountry: 'UZ',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+998998161610',
      contactType: 'customer service',
      availableLanguage: ['Uzbek', 'Russian', 'English'],
    },
    sameAs: [],
    serviceArea: {
      '@type': 'Country',
      name: 'Uzbekistan',
    },
    knowsAbout: [
      'Video Production',
      'Performance Marketing',
      'Brand Positioning',
      'Content Marketing',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <JsonLd locale={locale} />
      </head>
      <body className={`${inter.className} noise-overlay`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
