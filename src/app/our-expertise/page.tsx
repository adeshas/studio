
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { expertiseData } from "@/lib/expertise-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OurExpertisePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-6xl">Our Expertise</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We provide expert legal counsel across a wide range of practice areas.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {expertiseData.map((item) => (
                <Card key={item.slug} className="flex flex-col h-full bg-card border shadow-lg rounded-xl overflow-hidden">
                  <div className="relative w-full h-48">
                    <Image src={item.image} alt={item.title} fill className="object-cover" data-ai-hint={item.hint} />
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold font-headline mb-4">{item.title}</h3>
                    <p className="text-muted-foreground text-sm flex-grow mb-4">{item.shortDescription}</p>
                    <Button asChild className="self-start mt-auto">
                      <Link href={`/our-expertise/${item.slug}`}>Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
