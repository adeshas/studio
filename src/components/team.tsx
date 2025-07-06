import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const teamMembers = [
  {
    name: "Victor O. Akpeji",
    description: "Victor Akpeji is a Senior Associate in the firm with specialization in Dispute Resolution, corporate and commercial practice and …",
    image: "https://placehold.co/400x400.png",
    hint: "man portrait lawyer"
  },
  {
    name: "Moromoke Adegbosin",
    description: "Moromoke Adegbosin is an Associate in Oyewole & Adesina. She is actively involved in the Corporate and Commercial …",
    image: "https://placehold.co/400x400.png",
    hint: "woman portrait lawyer"
  },
  {
    name: "Chima Daniel Amako",
    description: "Chima Daniel Amako is an Associate with the firm’s Corporate and Commercial and Dispute Resolution Practice Group. Chima is a connoisseur …",
    image: "https://placehold.co/400x400.png",
    hint: "man portrait lawyer"
  },
  {
    name: "Sarah Chen",
    description: "Sarah is a specialist in intellectual property law, helping clients protect their valuable assets in the digital age.",
    image: "https://placehold.co/400x400.png",
    hint: "woman portrait professional"
  },
];

export default function Team() {
  return (
    <section id="our-people" className="w-full py-12 md:py-24 lg:py-32 bg-primary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Our Team</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Meet our team of experienced and competent lawyers
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl mt-12">
           <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {teamMembers.map((member, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="text-center border-none shadow-lg rounded-xl overflow-hidden h-full">
                      <div className="relative w-full aspect-square">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          data-ai-hint={member.hint}
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold font-headline">{member.name}</h3>
                        <p className="text-muted-foreground mt-2 text-sm">{member.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
