import Header from '@/components/header';
import Hero from '@/components/hero';
import Expertise from '@/components/services';
import Footer from '@/components/footer';
import type { Metadata } from 'next';
import Contact from '@/components/contact';

export const metadata: Metadata = {
  title: 'Home 2 | Oyewole & Adesina',
  description: 'Welcome to Oyewole & Adesina, a leading law firm specializing in dispute resolution, corporate law, energy, and real estate. Discover our expertise and meet our team.',
}

export default function Home2Page() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <Hero />
        <Expertise items={[]} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
