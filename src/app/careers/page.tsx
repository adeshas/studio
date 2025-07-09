import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Users, BrainCircuit, Mail } from "lucide-react";

const whyJoinUs = [
    {
        icon: <Award className="h-10 w-10 text-accent" />,
        title: "Unparalleled Opportunities",
        description: "Engage in challenging work and manage complex transactions that will accelerate your professional development."
    },
    {
        icon: <Users className="h-10 w-10 text-accent" />,
        title: "Collaborative Culture",
        description: "Join a team that values collaboration, where you can easily fit in with colleagues and clients."
    },
    {
        icon: <BrainCircuit className="h-10 w-10 text-accent" />,
        title: "Continuous Growth",
        description: "We encourage and provide unique opportunities for professional growth and understanding of the law."
    }
]

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-64 md:h-80 bg-primary/20">
             <Image
                src="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/05/hunters-race-MYbhN8KaaEc-unsplash.jpg"
                alt="Careers background"
                fill
                className="object-cover"
                data-ai-hint="recruitment office"
             />
             <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center text-center text-white z-20">
                <h1 className="text-4xl md:text-6xl font-bold font-headline">Join Our Team</h1>
                <div className="mt-4 text-lg">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <span>Careers</span>
                </div>
            </div>
        </section>
        
        <section id="why-join" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Why Join Oyewole & Adesina?</h2>
                <p className="max-w-[900px] mx-auto mt-4 text-muted-foreground md:text-xl/relaxed">We are looking for individuals with an appetite for challenging work and the ability to deliver under pressure.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {whyJoinUs.map((item, index) => (
                    <Card key={index} className="text-center p-6 shadow-lg rounded-xl h-full flex flex-col items-center">
                        <div className="mb-4">{item.icon}</div>
                        <h3 className="text-xl font-bold font-headline mt-2 mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm flex-grow">{item.description}</p>
                    </Card>
                ))}
            </div>
          </div>
        </section>

        <section id="apply" className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                     <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Become a Part of Our Team</h2>
                     <p className="text-muted-foreground md:text-xl mt-4 mb-8">
                        We welcome applications from talented lawyers who want to contribute to our team. If you have a detailed understanding of the law and can manage complex transactions, we would love to hear from you.
                     </p>
                     <Button asChild size="lg">
                        <a href="mailto:info@oyewoleadesina.com">
                            <Mail className="mr-2 h-5 w-5" />
                            Apply Now
                        </a>
                     </Button>
                     <p className="mt-4 text-sm text-muted-foreground">Please send your resume and a covering letter to <a href="mailto:info@oyewoleadesina.com" className="text-accent font-semibold hover:underline">info@oyewoleadesina.com</a>.</p>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
