import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { locales, defaultLocale, type Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { GoogleAnalytics, YandexMetrica } from '@/components/analytics'
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
      'video production tashkent',
      'marketing agency',
      'marketing agency uzbekistan',
      'brand positioning',
      'performance marketing',
      'fathcinema',
      'reklama agentligi',
      'video ishlab chiqarish',
      'видеопродакшн',
      'видеопродакшн ташкент',
      'маркетинговое агентство',
      'рекламное агентство узбекистан',
    ],
    authors: [{ name: 'Fathcinema' }],
    creator: 'Fathcinema',
    publisher: 'Fathcinema',
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
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => getTranslations(l).metadata.ogLocale),
      url: canonicalUrl,
      siteName: 'Fathcinema',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: t.metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.metadata.title,
      description: t.metadata.description,
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    },
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

function JsonLd({ locale }: { locale: string }) {
  const t = getTranslations(locale)

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Fathcinema',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo_white.svg`,
      width: 180,
      height: 50,
    },
    description: t.metadata.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tashkent',
      addressRegion: 'Tashkent',
      addressCountry: 'UZ',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+998998161610',
      contactType: 'customer service',
      email: 'info@fathcinema.uz',
      availableLanguage: ['Uzbek', 'Russian', 'English'],
    },
    sameAs: [],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#business`,
    name: 'Fathcinema',
    url: SITE_URL,
    telephone: '+998998161610',
    email: 'info@fathcinema.uz',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tashkent',
      addressRegion: 'Tashkent',
      addressCountry: 'UZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.2995,
      longitude: 69.2401,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Uzbekistan',
    },
    priceRange: '$$',
    image: `${SITE_URL}/og-image.jpg`,
    description: t.metadata.description,
    knowsAbout: [
      'Video Production',
      'Performance Marketing',
      'Brand Positioning',
      'Content Marketing',
      'Google Ads',
      'Meta Ads',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.services.title,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t.services.marketing.title,
            description: t.services.marketing.description,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t.services.video.title,
            description: t.services.video.description,
          },
        },
      ],
    },
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: t.metadata.title,
    description: t.metadata.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: locale,
  }

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Fathcinema',
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: locales,
  }

  const schemas = [
    organizationSchema,
    localBusinessSchema,
    webPageSchema,
    webSiteSchema,
  ]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
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
      <body
        className={`${inter.className} noise-overlay`}
        suppressHydrationWarning
      >
        {children}
        <GoogleAnalytics />
        <YandexMetrica />
      </body>
    </html>
  )
}
