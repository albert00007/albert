import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import CookieConsent from './components/shared/CookieConsent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MicroStateDev | Full-Stack Software Development Agency',
  description: 'Enterprise-grade web & mobile applications. Nest.js, Next.js, React Native experts in Yerevan, Armenia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className={`${inter.className} text-white overflow-x-hidden min-h-screen flex flex-col`}>
        <div id="root-container" className="flex-1 flex flex-col">
          {children}
        </div>
        <CookieConsent />
      </body>
    </html>
  )
}
