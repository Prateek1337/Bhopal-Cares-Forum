import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-dm-serif" });

export const metadata: Metadata = {
  title: 'Bhopal Cares Forum - Cleanliness, Plantation & Donation Drives',
  description: 'Bhopal Cares Forum is a community-driven NGO in Bhopal, India dedicated to cleanliness drives, plantation drives, and donation drives for a cleaner, greener, and kinder city.',
  icons: {
    icon: '/favicon-2.png',
    apple: '/favicon-2.png',
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${dmSerif.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="green"
          enableSystem={false}
          themes={["brown", "green"]}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
