import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Target, Handshake, BrainCircuit, Users, Award, Briefcase, Landmark, Scale, PiggyBank, Factory, Anchor, Lightbulb, CheckCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About The Firm',
  description: 'Learn about Oyewole & Adesina, our mission, vision, and core values. We are a leading law firm in Lagos, Nigeria, dedicated to excellence and client success.',
}

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
    { icon: <ShieldCheck className="h-10 w-10 text-accent" />, title: "Integrity", description: "in every engagement" },
    { icon: <Award className="h-10 w-10 text-accent" />, title: "Excellence", description: "in legal analysis and advocacy" },
    { icon: <Handshake className="h-10 w-10 text-accent" />, title: "Collaboration", description: "across disciplines and with our clients" },
    { icon: <BrainCircuit className="h-10 w-10 text-accent" />, title: "Innovation", description: "in anticipating and addressing emerging challenges" },
    { icon: <Users className="h-10 w-10 text-accent" />, title: "Professionalism", description: "in service delivery and ethical standards" },
];

export default function TheFirmPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-64 md:h-80 bg-primary/20">
          <Image
            src="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/07/patrick-fore-H5Lf0nGyetk-unsplash.jpg"
            alt="An abstract image representing the law firm's solid foundation"
            fill
            className="object-cover"
            data-ai-hint="law books gavel"
            priority
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
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Who We Are</h2>
                <div className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-left space-y-4">
                    <p>
                        Oyewole &amp; Adesina is a law firm based in Nigeria, renowned for its proficiency in a wide spectrum of legal domains. Our practice areas encompass dispute resolution (including arbitration, litigation, and mediation), corporate and commercial law, criminal litigation, real estate, projects, finance, energy, labor and employment, maritime, and intellectual property law. At Oyewole &amp; Adesina, we are strategically positioned to deliver top-notch, cost-efficient legal services to clients operating across Nigeria's major economic centers and sectors. Our unwavering commitment to excellence is a cornerstone of our practice.
                    </p>
                    <p>
                        We have built an exceptional reputation for our deep understanding of our clients' unique business challenges and issues. Our strength lies in providing legal and business-savvy solutions tailored to individual client needs. Anchored in a commercial approach, we consistently endeavor to employ cost-efficient and effective strategies to achieve desired outcomes.
                    </p>
                    <p>
                        One of our core strengths is our multifaceted expertise across various areas of the law. Our carefully curated team of lawyers boasts excellent academic backgrounds and specialized experience in diverse legal facets. This collective proficiency enables us to offer a comprehensive suite of legal services that seamlessly support our clients' businesses.
                    </p>
                    <p>
                        At Oyewole &amp; Adesina, we take pride in our solution-oriented approach. Our legal professionals bring a diverse range of skills and experience to the table, assisting clients in efficiently realizing their objectives. We are dedicated to delivering streamlined and effective legal services across all matters, consistently applying a practical and commercial perspective to resolve our clients' challenges.
                    </p>
                </div>
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
                        <p className="text-muted-foreground md:text-lg">Our mission is to provide professional, highest quality, solution and integrity-driven legal services to our clients using a practical and client-focused approach.</p>
                    </div>
                    <div className="space-y-4 text-center md:text-left">
                        <h3 className="text-3xl font-bold font-headline">Our Vision</h3>
                        <p className="text-muted-foreground md:text-lg">Our vision is to be the leading law firm providing comprehensive and skilled legal advice in a timely and efficient manner to international and domestic businesses, institutions and organizations.</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="why-choose-us" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Why Choose Us</h2>
                </div>
                <div className="max-w-4xl mx-auto">
                    <Card className="shadow-lg rounded-xl">
                        <Table>
                            <TableBody>
                                {whyChooseUs.map((item, index) => (
                                    <TableRow key={index} className={index === whyChooseUs.length - 1 ? 'border-b-0' : ''}>
                                        <TableCell className="font-bold font-headline text-lg w-1/3 align-top p-6">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="h-6 w-6 text-accent shrink-0" />
                                                {item.title}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground p-6 align-middle">{item.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </div>
        </section>

        <section id="our-values" className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Our Values</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {values.slice(0, 3).map((value) => (
                        <Card key={value.title} className="bg-card p-6 shadow-lg rounded-xl flex items-center gap-6">
                            <div className="shrink-0">{value.icon}</div>
                            <div>
                                <h4 className="text-xl font-bold font-headline">{value.title}</h4>
                                <p className="text-muted-foreground">{value.description}</p>
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
                     {values.slice(3).map((value) => (
                        <Card key={value.title} className="bg-card p-6 shadow-lg rounded-xl flex items-center gap-6">
                            <div className="shrink-0">{value.icon}</div>
                            <div>
                                <h4 className="text-xl font-bold font-headline">{value.title}</h4>
                                <p className="text-muted-foreground">{value.description}</p>
                            </div>
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
