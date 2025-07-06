import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const publications = [
  {
    title: "COVID-19: Implication on the enforcement of contracts in Nigeria",
    description: "Disclaimer: This article is only intended to provide general information on the subject matter and does not by itself …",
  },
  {
    title: "Enforcement of the Penalty Provisions in the Department of Petroleum Resources (DPR) Guidelines...",
    description: "The Guidelines issued on 7th October 2019 by the DPR established procedures for releasing Nigerian workers in the o …",
  },
  {
    title: "HURILAW Condemns Piecemeal Constitution Amendment",
    description: "The Human Rights Law Services (HURILAW), on 28 March 2016, called on the National Assembly to shun the piecemeal approach in …",
  },
  {
    title: "The Finance Act, 2020: A veritable tool for effective amendment of existing fiscal legislations",
    description: "A deep dive into the implications and applications of the Finance Act 2020 for modern businesses in Nigeria.",
  },
];

export default function Publications() {
  return (
    <section id="publications" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Latest Publications</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stay informed with our latest legal insights and analysis.
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
              {publications.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="flex flex-col justify-between h-full p-6 bg-card border shadow-lg rounded-xl">
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
