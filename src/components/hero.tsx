"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full h-[calc(80vh)] flex items-center justify-center text-white">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Law library background"
        fill
        className="object-cover absolute inset-0 z-0"
        priority
        data-ai-hint="law library books"
      />
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="relative z-20 flex flex-col items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 animate-fade-in-down" style={{animationDelay: '0.2s'}}>
          Legal Insight
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl font-light mb-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          A premier Nigerian law firm providing expert legal counsel for today's complex challenges.
        </p>
        <Button size="lg" asChild className="animate-fade-in bg-accent hover:bg-accent/90 text-accent-foreground" style={{animationDelay: '0.6s'}}>
          <Link href="#expertise" onClick={(e) => handleLinkClick(e, "#expertise")}>More About Our Expertise</Link>
        </Button>
      </div>
    </section>
  );
}
