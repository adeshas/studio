import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const expertiseItems = [
    {
        title: "Notary Public Services",
        description: "A Notary Public in Nigeria is appointed by the Chief Justice of the Federal Republic of...",
        image: "https://ddb73aed.sitepreview.org/wp-content/uploads/2019/08/notary_public_service_featured.jpg",
        hint: "notary seal stamp"
    },
    {
        title: "Finance & Insurance",
        description: "Oyewole & Adesina provides a comprehensive range of legal services for financial institutions, local and foreign...",
        image: "https://ddb73aed.sitepreview.org/wp-content/uploads/2019/04/finance_insurance_featured.jpg",
        hint: "finance money coins"
    },
    {
        title: "Energy",
        description: "Oyewole & Adesina’s energy practice covers oil and gas (downstream, mid-stream and upstream), power and natural resources, our...",
        image: "https://ddb73aed.sitepreview.org/wp-content/uploads/2019/04/energy_featured.jpg",
        hint: "oil rig energy"
    },
    {
        title: "Corporate and Commercial Practice",
        description: "Oyewole & Adesina’s corporate and commercial experience spans through company/business entity formation to procurement of...",
        image: "https://ddb73aed.sitepreview.org/wp-content/uploads/2019/04/corporate_commercial_featured.jpg",
        hint: "corporate building office"
    },
    {
        title: "Dispute Resolution",
        description: "Oyewole & Adesina’s dispute resolution practice handles issues relating to litigation, arbitration and alternative dispute resolution, the...",
        image: "https://ddb73aed.sitepreview.org/wp-content/uploads/2019/04/dispute_resolution_featured.jpg",
        hint: "gavel judge court"
    },
    {
        title: "Labour and Employment",
        description: "Oyewole & Adesina offers both litigation based and solicitor’s services in employment related matters. We are...",
        image: "https://ddb73aed.sitepreview.org/wp-content/uploads/2019/04/labour_employment_featured.jpg",
        hint: "people meeting office"
    },
    {
        title: "Shipping, Admiralty and Maritime",
        description: "Oyewole & Adesina’s shipping, admiralty and maritime practice covers advisory services, admiralty litigation, processing of...",
        image: "https://ddb73aed.sitepreview.org/wp-content/uploads/2019/04/shipping_maritime_featured.jpg",
        hint: "cargo ship sea"
    },
    {
        title: "Intellectual Property",
        description: "Oyewole & Adesina has extensive experience in patent, trademark, copyright and industrial designs registration, assignment, renewal and...",
        image: "https://ddb73aed.sitepreview.org/wp-content/uploads/2019/04/intellectual_property_featured.jpg",
        hint: "lightbulb idea"
    },
];

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
              {expertiseItems.map((item, index) => (
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
                            <p className="text-muted-foreground mb-4">{item.description}</p>
                        </div>
                        <Button asChild variant="link" className="p-0 self-start mt-4 text-primary-dark hover:text-primary-dark/80">
                           <a href="#">Read More &raquo;</a>
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
