import Header from '@/components/header';
import Hero from '@/components/hero';
import Intro from '@/components/intro';
import Expertise from '@/components/services';
import About from '@/components/about';
import Team from '@/components/team';
import Publications from '@/components/portfolio';
import Footer from '@/components/footer';

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
