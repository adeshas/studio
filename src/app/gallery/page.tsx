
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Explore the Oyewole & Adesina office space. View our modern and professional work environment.',
}

const officeImages = [
    {
        src: "https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/new/BUILDING.JPG",
        alt: "Exterior of the Oyewole & Adesina office building",
        hint: "office building"
    },
    {
        src: "https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/new/CONFERENCE%20ROOM%201.JPG",
        alt: "Modern conference room at Oyewole & Adesina",
        hint: "conference room"
    },
    {
        src: "https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/new/CONFERENCE%20ROOM%202.JPG",
        alt: "Second conference room at Oyewole & Adesina",
        hint: "meeting room"
    },
    {
        src: "https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/new/COURTYARD%20%283%29.jpg",
        alt: "Courtyard of the Oyewole & Adesina office",
        hint: "office courtyard"
    },
    {
        src: "https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/new/ENTRANCE.JPG",
        alt: "Entrance of the Oyewole & Adesina office",
        hint: "office entrance"
    },
    {
        src: "https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/new/GROUND%20FLOOR%20WALKWAY.jpg",
        alt: "Ground floor walkway in the office",
        hint: "office hallway"
    },
    {
        src: "https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/new/HOME%20PAGE.JPG",
        alt: "Homepage image for Oyewole & Adesina",
        hint: "office interior"
    },
    {
        src: "https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/new/LIBRARY.jpg",
        alt: "The law library at Oyewole & Adesina",
        hint: "law library"
    },
    {
        src: "https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/new/LOUNGE.JPG",
        alt: "Lounge area at the office",
        hint: "office lounge"
    },
    {
        src: "https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/new/SIGN.JPG",
        alt: "Oyewole & Adesina office sign",
        hint: "office sign"
    },
    {
        src: "https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/new/WAITING%20ROOM.JPG",
        alt: "Waiting room at the office",
        hint: "reception area"
    },
    {
        src: "https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/new/WORKSTATION.JPG",
        alt: "Workstation area at the office",
        hint: "office workstation"
    }
];

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-64 md:h-80 bg-primary/20">
             <Image
                src="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/05/hunters-race-MYbhN8KaaEc-unsplash.jpg"
                alt="Modern office interior"
                fill
                className="object-cover"
                data-ai-hint="modern office"
                priority
             />
             <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center text-center text-white z-20">
                <h1 className="text-4xl md:text-6xl font-bold font-headline">Gallery</h1>
                <div className="mt-4 text-lg">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <span>Gallery</span>
                </div>
            </div>
        </section>

        <section id="office-gallery" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold font-headline mb-8 text-center">Office</h2>
            <Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
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
        </section>
      </main>
      <Footer />
    </div>
  );
}
