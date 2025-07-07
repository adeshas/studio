"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import React from "react";

const heroSlides = [
  {
    title: "Innovation",
    image: "https://www.oyewoleadesina.com/wp-content/uploads/2019/05/analysis-blackboard-bubble-355952.jpg",
    hint: "innovation blackboard lightbulb"
  },
  {
    title: "Deeper Understanding",
    image: "https://www.oyewoleadesina.com/wp-content/uploads/2019/06/blur-book-stack-books-590493_1.jpg",
    hint: "books stack library"
  },
  {
    title: "Better Solutions",
    image: "https://www.oyewoleadesina.com/wp-content/uploads/2019/06/art-artist-artistic-316465_1.jpg",
    hint: "abstract art solutions"
  },
  {
    title: "Legal Insight",
    image: "https://www.oyewoleadesina.com/wp-content/uploads/2019/06/legal_insights_1.jpg",
    hint: "law books justice"
  },
  {
    title: "Business Instinct",
    image: "https://www.oyewoleadesina.com/wp-content/uploads/2019/06/businessinstinct_v2_1.jpg",
    hint: "business cityscape"
  }
];


export default function Hero() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full h-[calc(80vh)] text-white">
      <Carousel
        className="w-full h-full"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[calc(80vh)]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover absolute inset-0 z-0"
                  priority={index === 0}
                  data-ai-hint={slide.hint}
                />
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 h-full">
                  <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 animate-fade-in-down">
                    {slide.title}
                  </h1>
                   <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <Button size="lg" asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary-dark">
                            <Link href="#about-us" onClick={(e) => handleLinkClick(e, "#about-us")}>Learn More</Link>
                        </Button>
                        <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                            <Link href="#expertise" onClick={(e) => handleLinkClick(e, "#expertise")}>More About Our Expertise</Link>
                        </Button>
                    </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white bg-black/20 hover:bg-black/50 border-white/50 hover:border-white" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white bg-black/20 hover:bg-black/50 border-white/50 hover:border-white" />
      </Carousel>
    </section>
  );
}
