import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TECHINCEPTO - Professional IT Training Institute | Learn Digital Skills',
  description: 'Master digital skills with TECHINCEPTO\'s practical IT courses. From MS Office to Web Development, we offer hands-on training with small class sizes (max 25 students). Quality education for career growth.',
  keywords: 'IT training, computer courses, digital marketing, graphic design, web development, freelancing, MS Office, video editing, Pakistan, career development, practical training',
  authors: [{ name: 'TECHINCEPTO' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'TECHINCEPTO - Professional IT Training Institute',
    description: 'Master digital skills with practical IT courses. Small class sizes, hands-on training, and quality education.',
    type: 'website',
    locale: 'en_US',
    siteName: 'TECHINCEPTO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TECHINCEPTO - Professional IT Training Institute',
    description: 'Master digital skills with practical IT courses. Small class sizes, hands-on training, and quality education.',
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
        <link rel="canonical" href="https://techincepto.com" />
        <meta name="theme-color" content="#FF6B35" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}