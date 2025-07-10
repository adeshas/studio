
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import React from "react";

const heroSlides = [
  {
    title: "Trusted Legal Partners",
    subtitle: "Decades of collective experience guiding clients through Nigeria’s most complex commercial and regulatory challenges.",
    buttonText: "Learn About Us",
    buttonLink: "/the-firm",
    image: "https://www.oyewoleadesina.com/wp-content/uploads/2019/06/blur-book-stack-books-590493_1.jpg",
    hint: "books stack library"
  },
  {
    title: "Comprehensive Expertise",
    subtitle: "From dispute resolution to finance, real estate to IP—our full-service teams deliver tailored, sector-focused counsel.",
    buttonText: "View Practice Areas",
    buttonLink: "/our-expertise",
    image: "https://www.oyewoleadesina.com/wp-content/uploads/2019/06/legal_insights_1.jpg",
    hint: "law books justice"
  },
  {
    title: "Client-Centric Solutions",
    subtitle: "We dive deep into your business, crafting practical strategies that protect your interests and drive results.",
    buttonText: "Our Approach",
    buttonLink: "/the-firm#why-choose-us",
    image: "https://www.oyewoleadesina.com/wp-content/uploads/2019/06/businessinstinct_v2_1.jpg",
    hint: "business cityscape"
  },
    {
    title: "Integrity & Excellence",
    subtitle: "Unwavering commitment to ethical standards, efficiency and clear communication at every step.",
    buttonText: "Contact Us",
    buttonLink: "/contact",
    image: "https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/05/maarten-van-den-heuvel-_pc8aMbI9UQ-unsplash.jpg",
    hint: "abstract art solutions"
  }
];


export default function Hero() {

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
                <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 h-full max-w-4xl mx-auto">
                  <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 animate-fade-in-down">
                    {slide.title}
                  </h1>
                  <p className="bg-black/30 p-4 rounded-md text-lg md:text-xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {slide.subtitle}
                  </p>
                   <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <Button size="lg" asChild>
                            <Link href={slide.buttonLink}>{slide.buttonText}</Link>
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
