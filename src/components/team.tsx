import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { teamMembers } from "@/lib/team-data";
import { Button } from "./ui/button";
import Link from "next/link";

// Show a subset of team members on the homepage
const featuredTeamMembers = teamMembers.slice(0, 6);

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
              {featuredTeamMembers.map((member, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="text-center border-none shadow-lg rounded-xl overflow-hidden h-full flex flex-col">
                      <div className="relative w-full h-[400px]">
                        <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="w-full h-full object-cover object-center"
                            data-ai-hint={member.hint}
                        />
                      </div>
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold font-headline">{member.name}</h3>
                        <p className="text-sm font-semibold text-accent mb-2">{member.role}</p>
                        <p className="text-muted-foreground mt-2 text-sm flex-grow">
                          {member.description.replace(/\\n\\n/g, ' ').substring(0, 150)}...
                        </p>
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
        <div className="text-center mt-12">
          <Button asChild>
            <Link href="/our-people">Meet The Entire Team</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
