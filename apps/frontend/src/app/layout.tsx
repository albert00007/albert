import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MicroStateDev — Full-Stack Software Development Agency",
  description: "MSD (MicroStateDev) delivers enterprise-grade web, backend, and mobile solutions using React, Next.js, NestJS, GraphQL, and React Native. Based in Yerevan, Armenia.",
  keywords: "software development, web development, React, Next.js, NestJS, GraphQL, React Native, Armenia, Yerevan",
  openGraph: {
    title: "MicroStateDev — Full-Stack Software Development Agency",
    description: "MSD (MicroStateDev) delivers enterprise-grade web, backend, and mobile solutions using React, Next.js, NestJS, GraphQL, and React Native. Based in Yerevan, Armenia.",
    url: "https://microstatedev.com",
    siteName: "MicroStateDev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MicroStateDev — Full-Stack Software Development Agency",
    description: "MSD (MicroStateDev) delivers enterprise-grade web, backend, and mobile solutions using React, Next.js, NestJS, GraphQL, and React Native. Based in Yerevan, Armenia.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://microstatedev.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "MicroStateDev",
                  "alternateName": "MSD",
                  "description": "MSD (MicroStateDev) delivers enterprise-grade web, backend, and mobile solutions using React, Next.js, NestJS, GraphQL, and React Native. Based in Yerevan, Armenia.",
                  "email": "tech@microstatedev.com",
                  "telephone": "+37441355605",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Yerevan",
                    "addressCountry": "Armenia"
                  },
                  "url": "https://microstatedev.com"
                },
                {
                  "@type": "WebSite",
                  "name": "MicroStateDev",
                  "url": "https://microstatedev.com"
                }
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
