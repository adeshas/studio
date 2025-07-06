import Image from "next/image";
import { Card } from "@/components/ui/card";

const portfolioItems = [
  {
    title: "Project Alpha",
    category: "Branding",
    image: "https://placehold.co/600x400.png",
    hint: "modern branding"
  },
  {
    title: "Project Beta",
    category: "Web Design",
    image: "https://placehold.co/600x400.png",
    hint: "website mockup"
  },
  {
    title: "Project Gamma",
    category: "Social Media",
    image: "https://placehold.co/600x400.png",
    hint: "social media campaign"
  },
  {
    title: "Project Delta",
    category: "SEO",
    image: "https://placehold.co/600x400.png",
    hint: "analytics dashboard"
  },
  {
    title: "Project Epsilon",
    category: "Web Design",
    image: "https://placehold.co/600x400.png",
    hint: "ecommerce website"
  },
  {
    title: "Project Zeta",
    category: "Branding",
    image: "https://placehold.co/600x400.png",
    hint: "logo design"
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Our Work</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Check out some of our recent projects. We take pride in our work.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {portfolioItems.map((item, index) => (
            <Card key={index} className="group relative overflow-hidden rounded-xl border-none shadow-lg">
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={400}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                data-ai-hint={item.hint}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                <h3 className="text-2xl font-bold font-headline">{item.title}</h3>
                <p className="text-lg">{item.category}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
