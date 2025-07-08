import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { teamMembers } from "@/lib/team-data";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";

export default function OurPeoplePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <section id="our-people-full" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-6xl">Our People</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Meet our dedicated team of experienced and competent legal professionals.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="shadow-lg rounded-xl overflow-hidden h-full flex flex-col">
                   <div className="relative w-full h-[400px]">
                        <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="w-full h-full object-cover object-center"
                            data-ai-hint={member.hint}
                        />
                   </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold font-headline">{member.name}</h3>
                    <p className="text-md font-semibold text-accent mb-4">{member.role}</p>
                    <div className="text-muted-foreground text-sm flex-grow space-y-4">
                        {member.description.split('\n\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>
                    <div className="flex gap-4 mt-4 items-center">
                        {member.email && (
                            <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-accent">
                                <Mail className="h-5 w-5" />
                            </a>
                        )}
                        {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        )}
                    </div>
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
