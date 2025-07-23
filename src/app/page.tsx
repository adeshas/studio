import Header from '@/components/header';
import Hero from '@/components/hero';
import Intro from '@/components/intro';
import Expertise from '@/components/services';
import About from '@/components/about';
import Team from '@/components/team';
import Publications from '@/components/portfolio';
import Footer from '@/components/footer';
import type { Metadata } from 'next';

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
        <Intro />
        <Expertise />
        <About />
        <Team />
        <Publications />
      </main>
      <Footer />
    </div>
  );
}
