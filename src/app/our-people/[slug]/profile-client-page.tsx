
"use client";

import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import React, { useRef } from "react";
import { Linkedin, Mail, ArrowDown, ArrowLeft } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { teamMembers } from "@/lib/team-data";

type TeamMember = (typeof teamMembers)[0];

const formatDescription = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, lineIndex) => {
    if (line.trim() === '') {
      return <div key={lineIndex} className="h-4" />;
    }
    const parts = line.split(/(\*\*.*?\*\*)/g).filter(part => part);
    return (
      <p key={lineIndex} className="mb-2">
        {parts.map((part, partIndex) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith('✓')) {
            return <span key={partIndex}><span className="mr-2">✓</span>{part.substring(1)}</span>;
          }
          return part;
        })}
      </p>
    );
  });
};

export default function ProfileClientPage({ member }: { member: TeamMember }) {
  const { scrollYProgress: pageScrollYProgress } = useScroll();
  const scaleX = useSpring(pageScrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background font-body">
        <motion.div className="progress-bar" style={{ scaleX }} />
        <Header />
        <main className="flex-1 pt-24 md:pt-32">
          
          <section className="w-full bg-background relative z-10 pb-12">
              <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                  <div className="relative mx-auto w-full max-w-md h-[400px] md:h-[500px] mb-8">
                      <Image
                          src={member.image}
                          alt={`Portrait of ${member.name}, ${member.role}`}
                          fill
                          className="object-contain object-bottom"
                          priority
                          data-ai-hint={member.hint}
                      />
                  </div>
              </div>
          </section>

          <section id="member-details" className="w-full pb-12 md:pb-24 lg:pb-32 bg-background relative z-10">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">

              <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-6xl font-bold font-headline">{member.name}</h1>
                  <p className="mt-2 text-lg text-white/80">{member.role}</p>
              </div>
              
              <div className="text-lg text-muted-foreground space-y-6">
                {formatDescription(member.description)}
              </div>

               <div className="flex flex-col sm:flex-row gap-4 mt-12 items-start sm:items-center border-t pt-8">
                  {member.email && (
                      <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-accent flex items-center gap-2 text-lg">
                          <Mail className="h-6 w-6" /> <span>{member.email}</span>
                      </a>
                  )}
                  {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent flex items-center gap-2 text-lg">
                          <Linkedin className="h-6 w-6" /> <span>LinkedIn</span>
                      </a>
                  )}
              </div>

              <div className="mt-12">
                  <Button asChild variant="outline">
                      <Link href="/our-people">
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Back to Our People
                      </Link>
                  </Button>
              </div>

            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
