'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function HomePageClient({ hero, children }: { hero: React.ReactNode; children: React.ReactNode }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroScrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="flex flex-col min-h-screen bg-background font-body text-foreground relative">
      <motion.div className="progress-bar" style={{ scaleX }} />
      <Header scrollYProgress={heroScrollYProgress} />
      <main className="flex-1">
        <div ref={heroRef} className="-mt-20">
          {hero}
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}
