
"use client";

import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import React, { useRef } from "react";
import { Linkedin, Mail, ArrowDown } from "lucide-react";
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
        <main className="flex-1">

          <section className="relative w-full bg-black pt-20">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
              <div className="relative aspect-[3/4] w-full">
                  <Image
                      src={member.maskedImage || member.image}
                      alt={`Portrait of ${member.name}, ${member.role}`}
                      fill
                      className="object-cover object-top"
                      priority
                      data-ai-hint={member.hint}
                  />
              </div>
            </div>
          </section>
          
          <section id="member-intro" className="w-full py-8 bg-black text-white relative z-10">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
              <h1 className="text-4xl md:text-6xl font-light font-headline tracking-widest">{member.name}</h1>
              <p className="mt-2 text-lg text-white/80 uppercase tracking-[0.2em]">{member.role}</p>
            </div>
          </section>

          <section id="member-details" className="w-full py-12 md:py-24 lg:py-32 bg-neutral-900 relative z-10">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
              <div className="mb-8">
                  <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Bio</h2>
                  <div className="w-16 h-px bg-primary mt-2"></div>
              </div>
              
              <div className="text-lg text-muted-foreground space-y-6">
                {formatDescription(member.description)}
              </div>

               <div className="flex flex-col sm:flex-row gap-4 mt-12 items-start sm:items-center border-t border-border pt-8">
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

            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
