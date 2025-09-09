
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-[calc(80vh)] text-white">
      <div className="relative w-full h-full">
        <Image
          src="https://www.oyewoleadesina.com/wp-content/uploads/2019/06/legal_insights_1.jpg"
          alt="A premier law firm"
          fill
          className="object-cover absolute inset-0 z-0"
          priority
          data-ai-hint="law books justice"
        />
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 h-full max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-headline font-bold mb-4 animate-fade-in-down">
            A Premier Law Firm
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fade-in-up max-w-2xl" style={{ animationDelay: '0.2s' }}>
            Delivering expert legal solutions with integrity and a client-focused approach. Your trusted partner in navigating complex legal landscapes.
          </p>
          <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" asChild>
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
                <Link href="/our-expertise">Explore Our Expertise</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
