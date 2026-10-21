/** JSON-LD builders shared by pages (schema.org structured data). */
import type { FaqItem } from '../content/data/editorial';

/** Root home hierarchy: single-crumbs trail Homepage → current tool. */
export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://chinesebabypredictor.com/${item.path}`,
    })),
  };
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function webAppSchema(opts: { name: string; path: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: opts.name,
    url: `https://chinesebabypredictor.com/${opts.path}`,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    description: opts.description,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    isAccessibleForFree: true,
    inLanguage: ['en', 'hi', 'es', 'ru', 'fr', 'nl', 'de', 'it', 'pt', 'bn', 'ja', 'ko', 'ms', 'pl', 'id', 'ar', 'bg', 'tr', 'sv'],
  };
}

export function orgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Chinese Baby Predictor',
    url: 'https://chinesebabypredictor.com/',
    logo: 'https://chinesebabypredictor.com/favicon.svg',
    email: 'hello@chinesebabypredictor.com',
  };
}

export function articleSchema(opts: { title: string; description: string; slug: string; publishDate: string; modifiedDate?: string; author: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: `https://chinesebabypredictor.com/blog/${opts.slug}/`,
    datePublished: opts.publishDate,
    dateModified: opts.modifiedDate ?? opts.publishDate,
    author: { '@type': 'Organization', name: opts.author, url: 'https://chinesebabypredictor.com/about-us/' },
    publisher: { '@type': 'Organization', name: 'Chinese Baby Predictor', logo: { '@type': 'ImageObject', url: 'https://chinesebabypredictor.com/favicon.svg' } },
    image: 'https://chinesebabypredictor.com/og-default.png',
    inLanguage: 'en',
  };
}
