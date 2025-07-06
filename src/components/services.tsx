import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Palette, Laptop, Users, BarChart } from "lucide-react";

const services = [
  {
    icon: <Palette className="w-10 h-10 text-accent" />,
    title: "Branding",
    description: "We create strong brands that stand out from the competition.",
  },
  {
    icon: <Laptop className="w-10 h-10 text-accent" />,
    title: "Web Design",
    description: "We design beautiful and functional websites that convert visitors into customers.",
  },
  {
    icon: <Users className="w-10 h-10 text-accent" />,
    title: "Social Media",
    description: "We help businesses grow their social media presence and engage with their audience.",
  },
  {
    icon: <BarChart className="w-10 h-10 text-accent" />,
    title: "SEO",
    description: "We help businesses rank higher in search engines and get more organic traffic.",
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-primary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Our Services</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We offer a wide range of digital marketing services to help your business succeed.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {services.map((service, index) => (
            <Card key={index} className="bg-card border-border/20 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-xl overflow-hidden flex flex-col">
              <CardContent className="flex flex-col items-center text-center p-8 space-y-4 flex-grow">
                {service.icon}
                <CardTitle className="text-xl font-bold font-headline">{service.title}</CardTitle>
                <CardDescription className="text-base text-card-foreground/80">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
