import './globals.css';
import { Metadata } from 'next';
import Script from 'next/script';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  metadataBase: new URL('https://www.pin-to-pin-distance.xyz'),
  title: 'Pin to Pin Distance Calculator – Accurate Pincode Distance for e-Way Bill',
  description: 'Free and accurate pin to pin distance calculator for e-Way Bill in India. Enter any two pincodes and get valid driving distance and travel time. GST-compliant tool.',
  keywords: 'pin to pin distance, distance between pincodes, e-way bill distance calculator, gst distance, pincode distance india',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Pin to Pin Distance Calculator – Accurate Pincode Distance for e-Way Bill',
    description: 'Free and accurate pin to pin distance calculator for e-Way Bill in India. Get valid driving distance and travel time between any two pincodes.',
    url: 'https://www.pin-to-pin-distance.xyz',
    siteName: 'Pincode Distance Calculator',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pin to Pin Distance Calculator – Accurate Pincode Distance for e-Way Bill',
    description: 'Free and accurate pin to pin distance calculator for e-Way Bill in India. Get valid driving distance and travel time.',
  },
  alternates: {
    canonical: 'https://www.pin-to-pin-distance.xyz',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className="flex flex-col min-h-screen">
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-W9ZLYN7PW3"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W9ZLYN7PW3');
          `}
        </Script>
        <div itemScope itemType="https://schema.org/WebApplication">
          <meta itemProp="name" content="Pin to Pin Distance Calculator" />
          <meta itemProp="description" content="Free and accurate pin to pin distance calculator for e-Way Bill in India. Calculate driving distance between any two pincodes." />
          <meta name="google-site-verification" content="YGXKmJCxxlsgPX4JBt4fzvEHr-4STHhCTzYS1c_7Er4" />
        </div>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
