import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Oyewole & Adesina',
  description: 'Oyewole & Adesina is a law firm in Nigeria with proficiency in dispute resolution, corporate and commercial law, real estate, finance, energy, labour and employment, shipping, admiralty and intellectual property law.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/07/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/07/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/07/favicon-16x16.png" />
        <link rel="manifest" href="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/07/site.webmanifest" />
        <link rel="shortcut icon" href="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/07/favicon.ico" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="purple"
          themes={['light', 'dark', 'purple']}
          enableSystem={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
