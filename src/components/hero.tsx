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
    <section id="home" className="relative w-full h-[calc(100vh-4rem)] flex items-center justify-center text-white">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Hero background"
        fill
        className="object-cover absolute inset-0 z-0"
        priority
        data-ai-hint="abstract creative"
      />
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="relative z-20 flex flex-col items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 animate-fade-in-down" style={{animationDelay: '0.2s'}}>
          WE ARE A DIGITAL MARKETING AGENCY
        </h1>
        <p className="text-xl md:text-3xl font-headline font-semibold mb-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          THAT HELPS BUSINESSES GROW.
        </p>
        <Button size="lg" asChild className="animate-fade-in bg-accent hover:bg-accent/90 text-accent-foreground" style={{animationDelay: '0.6s'}}>
          <Link href="#contact" onClick={(e) => handleLinkClick(e, "#contact")}>Get Started</Link>
        </Button>
      </div>
    </section>
  );
}
