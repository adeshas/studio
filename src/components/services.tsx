import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const expertiseItems = [
  {
    title: "Finance & Insurance",
    description: "Oyewole & Adesina provides a comprehensive range of legal services for financial institutions, local and foreign …"
  },
  {
    title: "Energy",
    description: "Oyewole & Adesina’s energy practice covers oil and gas downstream, mid-stream and upstream, power and natural resources, our …"
  },
  {
    title: "Corporate and Commercial Practice",
    description: "Oyewole & Adesina’s corporate and commercial expertise spans through company/business entity formation to procurement of …"
  },
  {
    title: "Real Estate",
    description: "Our real estate practice offers a full spectrum of services, from acquisition and development to financing and leasing."
  },
];


export default function Expertise() {
  return (
    <section id="expertise" className="w-full py-12 md:py-24 lg:py-32 bg-primary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Our Expertise</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We provide expert legal counsel across a wide range of practice areas.
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
              {expertiseItems.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="flex flex-col justify-between h-full p-6 bg-card border-border/20 shadow-lg rounded-xl">
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold font-headline mb-2">{item.title}</h3>
                        <p className="text-card-foreground/80 mb-4">{item.description}</p>
                      </div>
                      <Button asChild variant="link" className="p-0 self-start mt-4">
                         <a href="#">Read More &raquo;</a>
                      </Button>
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
