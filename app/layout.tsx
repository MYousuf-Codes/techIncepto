import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import { MobileMenu } from '@/components/MobileMenu';

// Lazy load components that are not immediately needed
const LazyMobileMenu = dynamic(() => import('@/components/MobileMenu').then(mod => ({ default: mod.MobileMenu })), {
  ssr: false
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TECHINCEPTO - Online IT Courses in Pakistan | Computer Training Institute',
  description: 'Learn online IT courses in Pakistan with TECHINCEPTO. Master computer courses, digital marketing, web development, graphic design, and freelancing skills. Practical training with small class sizes for career growth.',
  keywords: 'online IT courses Pakistan, computer courses online, digital marketing course Pakistan, web development training, graphic design course, freelancing skills, MS Office training, video editing course, IT training institute Pakistan, online computer classes',
  authors: [{ name: 'TECHINCEPTO' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'TECHINCEPTO - Online IT Courses in Pakistan',
    description: 'Learn online IT courses in Pakistan. Master computer skills, digital marketing, web development with practical training.',
    type: 'website',
    locale: 'en_US',
    siteName: 'TECHINCEPTO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TECHINCEPTO - Online IT Courses in Pakistan',
    description: 'Learn online IT courses in Pakistan. Master computer skills, digital marketing, web development with practical training.',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://techincepto.com" />
        <meta name="theme-color" content="#FF6B35" />
      </head>
      <body className={inter.className}>
        {children}
        <LazyMobileMenu />
      </body>
    </html>
  );
}