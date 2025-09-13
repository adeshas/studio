
"use client";

import Header from '@/components/header';
import Hero from '@/components/hero';
import Clients from '@/components/clients';
import Expertise from '@/components/services';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import { motion, useScroll, useSpring } from 'framer-motion';
import About from '@/components/about';
import { useRef } from 'react';
import Intro from '@/components/intro';
import FirmIntroduction from '@/components/firm-introduction';
import PeopleHighlight from '@/components/people-highlight';


export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroScrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="flex flex-col min-h-screen bg-background font-body text-foreground">
      <motion.div className="progress-bar" style={{ scaleX }} />
      <Header scrollYProgress={heroScrollYProgress} />
      <main className="flex-1">
        <div ref={heroRef} className="-mt-20">
          <Hero />
        </div>
        <Intro />
        <FirmIntroduction />
        <Clients />
        <About />
        <Expertise />
        <PeopleHighlight />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
