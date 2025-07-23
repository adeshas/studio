import Header from "@/components/header";
import Footer from "@/components/footer";
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Oyewole & Adesina. Find our office address in Lagos, phone number, and email. We look forward to hearing from you.',
}

const officeImages = [
    {
        src: "https://oyewoleadesina.com/wp-content/uploads/2025/07/office1.webp",
        alt: "Reception area of Oyewole & Adesina law office",
        hint: "office reception"
    },
    {
        src: "https://oyewoleadesina.com/wp-content/uploads/2025/07/office2.webp",
        alt: "Collaborative workspace at Oyewole & Adesina",
        hint: "office workspace"
    },
    {
        src: "https://oyewoleadesina.com/wp-content/uploads/2025/07/office3.webp",
        alt: "Professional meeting room at Oyewole & Adesina",
        hint: "office meeting room"
    }
];

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-64 md:h-80 bg-primary/20">
             <Image
                src="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/05/nastuh-abootalebi-yWwob8kwOCk-unsplash.jpg"
                alt="Abstract architectural lines of a modern building"
                fill
                className="object-cover"
                data-ai-hint="abstract building lines"
                priority
             />
             <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center text-center text-white z-20">
                <h1 className="text-4xl md:text-6xl font-bold font-headline">Contact Us</h1>
                <div className="mt-4 text-lg">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <span>Contact Us</span>
                </div>
            </div>
        </section>

        <section id="contact-details" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-16 md:grid-cols-2 max-w-5xl mx-auto items-start">
              <div>
                  <h2 className="text-3xl font-bold font-headline mb-6">Lagos Office</h2>
                  <div className="space-y-4 text-lg text-muted-foreground">
                      <div className="flex items-start gap-4">
                          <MapPin className="h-6 w-6 text-accent mt-1 shrink-0" />
                          <span>19A, Udi Street<br/>Osborne Foreshore Estate Phase 1, Ikoyi, Lagos</span>
                      </div>
                      <div className="flex items-start gap-4">
                          <Phone className="h-6 w-6 text-accent mt-1 shrink-0" />
                          <div>
                              <p>Mobile: +234 706 210 3941</p>
                              <p>Office: 02012932390</p>
                          </div>
                      </div>
                      <div className="flex items-start gap-4">
                          <Mail className="h-6 w-6 text-accent mt-1 shrink-0" />
                          <a href="mailto:info@oyewoleadesina.com" className="hover:text-accent">info@oyewoleadesina.com</a>
                      </div>
                  </div>
              </div>
              <div>
                <Carousel className="w-full max-w-md mx-auto" opts={{ loop: true }}>
                  <CarouselContent>
                    {officeImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <Card className="overflow-hidden rounded-xl shadow-lg">
                          <div className="relative aspect-video">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover"
                              data-ai-hint={image.hint}
                            />
                          </div>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
                </Carousel>
              </div>
            </div>
          </div>
        </section>

        <section id="map" className="w-full h-[500px] bg-muted">
            <iframe
                src="https://maps.google.com/maps?q=19A,%20Udi%20Street%20Osborne%20Foreshore%20Estate%20Phase%201,%20Ikoyi,%20Lagos&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map of Oyewole & Adesina Office Location"
            ></iframe>
        </section>

      </main>
      <Footer />
    </div>
  );
}
