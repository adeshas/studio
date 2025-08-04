import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import PageProgress from '@/components/page-progress';
import { Inter, Playfair_Display } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Oyewole & Adesina - Premier Nigerian Law Firm',
    template: '%s | Oyewole & Adesina',
  },
  description: 'Oyewole & Adesina is a top-tier law firm in Nigeria with proficiency in dispute resolution, corporate and commercial law, real estate, finance, energy, and more.',
  keywords: ['Nigerian law firm', 'Lagos law firm', 'corporate law Nigeria', 'dispute resolution', 'energy law', 'real estate law', 'Oyewole & Adesina'],
  authors: [{ name: 'Oyewole & Adesina' }],
  creator: 'Oyewole & Adesina',
  publisher: 'Oyewole & Adesina',
  metadataBase: new URL('https://www.oyewoleadesina.com'),
  openGraph: {
    title: 'Oyewole & Adesina - Premier Nigerian Law Firm',
    description: 'Expert legal services in dispute resolution, corporate law, real estate, and more in Nigeria.',
    url: 'https://www.oyewoleadesina.com',
    siteName: 'Oyewole & Adesina',
    images: [
      {
        url: 'https://www.oyewoleadesina.com/wp-content/uploads/2025/07/oa3-logo.png', // Must be an absolute URL
        width: 1024,
        height: 332,
        alt: 'Oyewole & Adesina Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oyewole & Adesina - Premier Nigerian Law Firm',
    description: 'Expert legal services in dispute resolution, corporate law, real estate, and more in Nigeria.',
    // images: ['https://www.oyewoleadesina.com/og-image.png'], // Must be an absolute URL
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
      { url: '/favicon.ico', sizes: 'any' },
      { url: 'https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/07/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: 'https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/07/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: 'https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/07/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("!scroll-smooth", inter.variable, playfairDisplay.variable)} suppressHydrationWarning>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="purple"
          themes={['purple', 'light', 'dark']}
          enableSystem={false}
        >
          <PageProgress />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
