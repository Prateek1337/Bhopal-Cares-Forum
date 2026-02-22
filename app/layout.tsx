import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-dm-serif" });

export const metadata: Metadata = {
  title: 'Seva Bhopal Foundation - Cleaning, Plantation & Cloth Donation Drives',
  description: 'Seva Bhopal Foundation is a community-driven NGO in Bhopal, India dedicated to cleaning drives, plantation drives, and cloth donation drives for a cleaner, greener, and kinder city.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#4a8c5c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${dmSerif.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
