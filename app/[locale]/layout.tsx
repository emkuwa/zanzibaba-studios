import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { siteConfig } from '@/lib/site';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { WhatsAppFloat } from '@/components/site/WhatsAppFloat';
import { CookieConsent } from '@/components/site/CookieConsent';
import { ChatAssistant } from '@/components/site/ChatAssistant';
import { Cursor } from '@/components/site/Cursor';
import { ScrollProgress } from '@/components/site/ScrollProgress';
import '../globals.css';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#050608' },
    { media: '(prefers-color-scheme: dark)', color: '#050608' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'brand' });
  const title = `${t('name')} — ${t('tagline')}`;
  const description = siteConfig.description;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s • ${t('name')}`,
    },
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    applicationName: siteConfig.name,
    category: 'Media Production',
    alternates: {
      canonical: '/',
      languages: {
        en: '/en',
        sw: '/sw',
        'x-default': '/',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'sw' ? 'sw_TZ' : 'en_US',
      url: siteConfig.url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
          type: siteConfig.ogImageType,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
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
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/favicon.svg`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phoneRaw,
    foundingDate: '2025',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Stone Town & Paje',
      addressLocality: 'Zanzibar',
      addressRegion: 'Zanzibar Urban-West',
      addressCountry: 'TZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phoneRaw,
      contactType: 'customer service',
      email: siteConfig.email,
      availableLanguage: ['English', 'Swahili'],
      areaServed: ['TZ', 'KE', 'UG', 'RW', 'BI', 'ZM'],
    },
    sameAs: Object.values(siteConfig.social),
  };

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}#localbusiness`,
    name: siteConfig.name,
    alternateName: 'Zanzibaba Studios Zanzibar',
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    url: siteConfig.url,
    telephone: siteConfig.phoneRaw,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Stone Town & Paje',
      addressLocality: 'Zanzibar',
      addressCountry: 'TZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: ['Zanzibar', 'Dar es Salaam', 'Arusha', 'Kenya Coast', 'Rwanda'],
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Bank Transfer, Credit Card',
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '20:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '120',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Sarah Mitchell' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Zanzibaba Studios produced a stunning promotional video for our resort. The drone footage of the coastline was breathtaking and perfectly captured the essence of our brand.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Hassan Ali' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Professional team with incredible attention to detail. They handled our hotel photography project flawlessly — the images increased our direct bookings by 40%.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Emily Carter' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'From concept to delivery, Zanzibaba Studios exceeded expectations. Their live streaming setup for our event was seamless and the production quality was outstanding.',
      },
    ],
  };

  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Zanzibar Studios Services',
    numberOfItems: 10,
    itemListElement: [
      'Tourism Video Production',
      'Resort & Hotel Photography',
      'Drone Videography',
      'Luxury Villa Marketing',
      'Travel Documentary Production',
      'Tourism Promotional Campaigns',
      'Social Media Content Creation',
      'Event Coverage',
      'Live Streaming Services',
      'Commercial Video Production',
    ].map((name, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name,
        provider: { '@id': `${siteConfig.url}#organization` },
        areaServed: 'Zanzibar, East Africa',
      },
    })),
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { '@id': `${siteConfig.url}#organization` },
    inLanguage: ['en', 'sw'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang={locale} dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&family=Cormorant+Garamond:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://videos.pexels.com" />
      </head>
      <body className="bg-ink-950 text-white antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-coral-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:outline-none focus:ring-2 focus:ring-white"
          >
            Skip to content
          </a>
          <Cursor />
          <ScrollProgress />
          <Navbar />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
          <ChatAssistant />
          <CookieConsent />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
