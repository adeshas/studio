import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { publicationsData } from "@/lib/publications-data";
import Link from "next/link";
import Image from "next/image";

export default function PublicationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
         <section className="relative w-full h-64 md:h-80 bg-primary/20">
             <Image
                src="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/05/absolutvision-WYd_PkCa1BY-unsplash.jpg"
                alt="Publications background"
                fill
                className="object-cover"
                data-ai-hint="books library documents"
             />
             <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center text-center text-white z-20">
                <h1 className="text-4xl md:text-6xl font-bold font-headline">Publications</h1>
                <div className="mt-4 text-lg">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <span>Publications</span>
                </div>
            </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publicationsData.map((item, index) => (
                <Card key={index} className="flex flex-col justify-between h-full p-6 bg-card border shadow-lg rounded-xl">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold font-headline mb-2">{item.title}</h3>
                    <p className="text-card-foreground/80 mb-4">{item.description}</p>
                  </div>
                  <Button asChild variant="link" className="p-0 self-start mt-4">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">Read More &raquo;</a>
                  </Button>
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
