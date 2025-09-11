
"use client";

import Header from '@/components/header';
import Hero from '@/components/hero';
import Clients from '@/components/clients';
import Expertise from '@/components/services';
import Testimonials from '@/components/testimonials';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import { motion, useScroll, useSpring } from 'framer-motion';
import About from '@/components/about';


export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="flex flex-col min-h-screen bg-background font-body text-foreground">
      <motion.div className="progress-bar" style={{ scaleX }} />
      <main className="flex-1">
        <Header />
        <Hero />
        <Clients />
        <About />
        <Expertise />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
