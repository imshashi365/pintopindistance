import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'Pin to Pin Distance Calculator – Accurate Pincode Distance for e-Way Bill India',
  description: 'Free and accurate pin to pin distance calculator for e-Way Bill in India. Enter any two pincodes and get valid driving distance and travel time. GST-compliant tool.',
  keywords: 'pin to pin distance, distance between pincodes, e-way bill distance calculator, gst distance, pincode distance india',
  metadataBase: new URL('https://pin-to-pin-distance.in'),
  openGraph: {
    title: 'Pin to Pin Distance Calculator – Accurate Pincode Distance for e-Way Bill',
    description: 'Free and accurate pin to pin distance calculator for e-Way Bill in India. Get valid driving distance and travel time between any two pincodes.',
    url: 'https://pin-to-pin-distance.in',
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
    canonical: '/',
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
    <html lang="en" className="h-full bg-gray-50 scroll-smooth">
      <body className="min-h-full flex flex-col bg-white">
    <div itemScope itemType="https://schema.org/WebApplication">
      <meta itemProp="name" content="Pin to Pin Distance Calculator" />
      <meta itemProp="description" content="Free and accurate pin to pin distance calculator for e-Way Bill in India. Calculate driving distance between any two pincodes." />
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
