
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Target, Handshake, BrainCircuit, Users, Award, Briefcase, Landmark, Scale, PiggyBank, Factory, Anchor, Lightbulb } from "lucide-react";

const practiceAreas = [
  { title: "Dispute Resolution", icon: <Scale className="h-8 w-8 text-accent mb-4" />, description: "Expert representation in domestic and international arbitration and litigation" },
  { title: "Corporate & Commercial Law", icon: <Briefcase className="h-8 w-8 text-accent mb-4" />, description: "From entity formation to M&A and joint ventures" },
  { title: "Real Estate", icon: <Landmark className="h-8 w-8 text-accent mb-4" />, description: "Advising on transactions, leasing, and development projects" },
  { title: "Finance & Insurance", icon: <PiggyBank className="h-8 w-8 text-accent mb-4" />, description: "Regulatory compliance, structured finance, and risk management" },
  { title: "Energy & Natural Resources", icon: <Factory className="h-8 w-8 text-accent mb-4" />, description: "Licensing, project development, and regulatory matters" },
  { title: "Labour & Employment", icon: <Users className="h-8 w-8 text-accent mb-4" />, description: "Workforce policies, dispute avoidance, and litigation" },
  { title: "Shipping, Admiralty & Maritime", icon: <Anchor className="h-8 w-8 text-accent mb-4" />, description: "Vessel registration, charter parties, and casualty response" },
  { title: "Intellectual Property", icon: <Lightbulb className="h-8 w-8 text-accent mb-4" />, description: "Protection, enforcement, and licensing of IP assets" },
];

const whyChooseUs = [
    { title: "Client-Focused Solutions", description: "We immerse ourselves in your business to craft strategies that work in practice" },
    { title: "Business-Savvy Advice", description: "Our lawyers deliver legal outcomes grounded in commercial reality" },
    { title: "Cost-Effective Strategies", description: "We employ efficient processes to optimize both time and expense" },
    { title: "Seamless Service", description: "End-to-end support from initial consultation through dispute resolution or transaction closing" },
    { title: "Reputation for Excellence", description: "A proven track record of achieving client objectives across diverse sectors" },
];

const values = [
    { icon: <ShieldCheck className="h-8 w-8 text-accent" />, title: "Integrity", description: "in every engagement" },
    { icon: <Award className="h-8 w-8 text-accent" />, title: "Excellence", description: "in legal analysis and advocacy" },
    { icon: <Handshake className="h-8 w-8 text-accent" />, title: "Collaboration", description: "across disciplines and with our clients" },
    { icon: <BrainCircuit className="h-8 w-8 text-accent" />, title: "Innovation", description: "in anticipating and addressing emerging challenges" },
    { icon: <Users className="h-8 w-8 text-accent" />, title: "Professionalism", description: "in service delivery and ethical standards" },
];

export default function TheFirmPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-64 md:h-80 bg-primary/20">
          <Image
            src="https://placehold.co/1920x400.png"
            alt="Modern office building"
            fill
            className="object-cover"
            data-ai-hint="corporate building modern"
          />
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center text-center text-white z-20">
            <h1 className="text-4xl md:text-6xl font-bold font-headline">The Firm</h1>
            <div className="mt-4 text-lg">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">/</span>
              <span>The Firm</span>
            </div>
          </div>
        </section>

        <section id="who-we-are" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Who We Are</h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Founded in 2014, Oyewole & Adesina is a partnership law firm headquartered in Lagos, Nigeria, with deep roots in the country’s major commercial centres. We combine a lean, highly experienced team of legal practitioners to deliver first-class, cost-efficient services tailored to our clients’ needs.
              </p>
            </div>
          </div>
        </section>

        <section id="practice-areas" className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Our Practice Areas</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {practiceAreas.map((area) => (
                        <Card key={area.title} className="text-center p-6 shadow-lg rounded-xl h-full flex flex-col">
                           <div className="flex justify-center items-center">{area.icon}</div>
                            <h3 className="text-xl font-bold font-headline mt-2 mb-2">{area.title}</h3>
                            <p className="text-muted-foreground text-sm flex-grow">{area.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section id="mission-vision" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4 text-center md:text-left">
                        <h3 className="text-3xl font-bold font-headline">Our Mission</h3>
                        <p className="text-muted-foreground md:text-lg">To provide integrity-driven, solution-oriented legal services through a practical, client-focused approach—delivering results that protect and advance your interests.</p>
                    </div>
                    <div className="space-y-4 text-center md:text-left">
                        <h3 className="text-3xl font-bold font-headline">Our Vision</h3>
                        <p className="text-muted-foreground md:text-lg">To be the premier Nigerian law firm renowned for excellence, innovation, and unwavering commitment to client success.</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="why-choose-us" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Why Choose Us</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {whyChooseUs.slice(0,5).map((item, index) => (
                    <Card key={index} className="p-6 shadow-lg rounded-xl border-l-4 border-accent">
                        <h3 className="text-xl font-bold font-headline mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                    </Card>
                  ))}
                  <div className="lg:col-span-3 flex justify-center">
                     <Card className="p-6 shadow-lg rounded-xl border-l-4 border-accent max-w-md">
                        <h3 className="text-xl font-bold font-headline mb-2">{whyChooseUs[5]?.title || "Our Values"}</h3>
                        <p className="text-muted-foreground">{whyChooseUs[5]?.description || "Our core principles guide every action we take."}</p>
                    </Card>
                  </div>
                </div>
            </div>
        </section>

        <section id="our-values" className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Our Values</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
                    {values.map((value) => (
                        <div key={value.title} className="flex flex-col items-center">
                            {value.icon}
                            <h4 className="text-lg font-bold font-headline mt-4">{value.title}</h4>
                            <p className="text-muted-foreground text-sm">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>


      </main>
      <Footer />
    </div>
  );
}
