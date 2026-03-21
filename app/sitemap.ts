import type { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/lib/i18n'

const SITE_URL = 'https://fathcinema.uz'

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: locale === defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [
          l,
          l === defaultLocale ? SITE_URL : `${SITE_URL}/${l}`,
        ])
      ),
    },
  }))
}
