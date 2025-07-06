import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Twitter } from "lucide-react";

const teamMembers = [
  {
    name: "Jane Doe",
    role: "CEO & Founder",
    image: "https://placehold.co/400x400.png",
    hint: "woman portrait"
  },
  {
    name: "John Smith",
    role: "Chief Operating Officer",
    image: "https://placehold.co/400x400.png",
    hint: "man portrait"
  },
  {
    name: "Peter Jones",
    role: "Chief Technology Officer",
    image: "https://placehold.co/400x400.png",
    hint: "man portrait tech"
  },
  {
    name: "Sarah Miller",
    role: "Creative Director",
    image: "https://placehold.co/400x400.png",
    hint: "woman portrait creative"
  },
];

export default function Team() {
  return (
    <section id="team" className="w-full py-12 md:py-24 lg:py-32 bg-primary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Meet Our Team</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The passionate people behind our creative work.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center border-none shadow-lg rounded-xl overflow-hidden transform transition-transform duration-300 hover:-translate-y-2">
              <div className="relative w-full aspect-square">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  data-ai-hint={member.hint}
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold font-headline">{member.name}</h3>
                <p className="text-accent font-semibold">{member.role}</p>
                <div className="flex justify-center gap-4 mt-4">
                  <a href="#" aria-label={`${member.name} on Twitter`} className="text-muted-foreground hover:text-accent"><Twitter /></a>
                  <a href="#" aria-label={`${member.name} on LinkedIn`} className="text-muted-foreground hover:text-accent"><Linkedin /></a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
