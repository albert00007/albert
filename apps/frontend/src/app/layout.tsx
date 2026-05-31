import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import CookieConsent from './components/shared/CookieConsent'
import { I18nProvider } from './i18nContext'

const inter = Inter({ subsets: ['latin'] })

// SEO and Social Metadata
const siteConfig = {
  title: 'MicroStateDev | AI-Powered Full-Stack Development Agency',
  description: 'MSD engineers enterprise-grade web and mobile applications with a focus on AI integration and scalable architecture. Based in Yerevan, we turn complex challenges into high-performance digital solutions using Next.js, Nest.js, and Python.',
  keywords: ['software development', 'web development', 'mobile development', 'AI integration', 'Yerevan', 'Armenia', 'Next.js', 'Nest.js', 'React Native', 'full-stack', 'agency'],
  url: 'https://microstatedev.com', // Assuming production URL
  ogImage: 'https://microstatedev.com/og-image.png',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MicroStateDev',
  url: siteConfig.url,
  logo: siteConfig.ogImage, // Use the same image for logo
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'hello@microstatedev.com', // Placeholder email
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} text-white overflow-x-hidden min-h-screen flex flex-col`}>
        <I18nProvider>
          <div id="root-container" className="flex-1 flex flex-col">
            {children}
          </div>
          <CookieConsent />
        </I18nProvider>
      </body>
    </html>
  )
}
