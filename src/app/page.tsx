import Header from '@/components/header';
import Hero from '@/components/hero';
import Services from '@/components/services';
import Portfolio from '@/components/portfolio';
import Team from '@/components/team';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Portfolio />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
