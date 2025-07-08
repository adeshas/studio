
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { expertiseData } from "@/lib/expertise-data";
import Link from "next/link";


export default function Expertise() {
  return (
    <section id="expertise" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Our Expertise</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We provide expert legal counsel across a wide range of practice areas.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl mt-12">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {expertiseData.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="flex flex-col justify-between h-full bg-card border shadow-lg rounded-xl overflow-hidden">
                        <div className="relative w-full h-48">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                                data-ai-hint={item.hint}
                            />
                        </div>
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="flex-grow">
                            <h3 className="text-xl font-bold font-headline mb-2 text-foreground">{item.title}</h3>
                            <p className="text-muted-foreground mb-4">{item.shortDescription}</p>
                        </div>
                        <Button asChild variant="link" className="p-0 self-start mt-4 text-primary-dark hover:text-primary-dark/80">
                           <Link href={`/our-expertise/${item.slug}`}>Read More &raquo;</Link>
                        </Button>
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
