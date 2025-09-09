import Header from '@/components/header';
import Hero from '@/components/hero';
import Expertise from '@/components/services';
import Footer from '@/components/footer';
import type { Metadata } from 'next';
import Contact from '@/components/contact';

export const metadata: Metadata = {
  title: 'Oyewole & Adesina - Premier Nigerian Law Firm',
  description: 'Welcome to Oyewole & Adesina, a leading Nigerian law firm specializing in dispute resolution, corporate law, energy, and real estate. Discover our expertise and meet our team.',
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <Hero />
        <Expertise />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
