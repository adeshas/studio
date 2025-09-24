
"use client";

import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import React, { useState } from "react";
import { Linkedin, Mail, ArrowDown, Plus, Minus } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { teamMembers } from "@/lib/team-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type TeamMember = (typeof teamMembers)[0];

const formatDescription = (text: string | undefined) => {
  if (!text) return null;
  const lines = text.split('\n');
  
  let listItems: string[] = [];
  const content = lines.flatMap((line, lineIndex) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('✓')) {
      listItems.push(trimmedLine.substring(1).trim());
      // If the next line is not a list item, render the list
      if (!lines[lineIndex + 1]?.trim().startsWith('✓')) {
        const list = (
          <ul key={`list-${lineIndex}`} className="space-y-2 my-4 list-disc pl-6">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        );
        listItems = []; // Reset for next potential list
        return [list];
      }
      return []; // Don't render individual list items yet
    }

    if (trimmedLine === '') {
      return [<div key={lineIndex} className="h-4" />];
    }
    
    const parts = line.split(/(\*\*.*?\*\*)/g).filter(part => part);
    return (
      <p key={lineIndex}>
        {parts.map((part, partIndex) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    );
  });

  return <>{content}</>;
};

export default function ProfileClientPage({ member }: { member: TeamMember }) {
  const { scrollYProgress: pageScrollYProgress } = useScroll();
  const scaleX = useSpring(pageScrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [openAccordion, setOpenAccordion] = useState<string[]>([]);
  const [isBioExpanded, setIsBioExpanded] = useState(false);

  const sections = ['Expertise', 'Education', 'Certifications', 'Associations', 'Awards'];
  const memberData: { [key: string]: string | undefined } = {
    Expertise: member.description,
    Education: member.description,
    Certifications: member.description,
    Associations: member.description,
    Awards: member.description,
  };

  const bioText = member.description?.split('**EDUCATION**')[0];
  const bioParagraphs = bioText?.split('\n\n').filter(p => p.trim() !== '') || [];
  const truncatedBio = bioParagraphs.slice(0, 2).join('\n\n');
  const showReadMore = bioParagraphs.length > 2;

  const extractSection = (text: string | undefined, sectionTitle: string) => {
    if (!text) return null;
  
    const lines = text.split('\n');
    let inSection = false;
    let sectionContent = '';
  
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        const currentTitle = trimmedLine.slice(2,-2).toUpperCase();
        if (sections.map(s => s.toUpperCase()).includes(currentTitle)) {
            if (currentTitle === sectionTitle.toUpperCase()) {
                inSection = true;
            } else if (inSection) {
                // We've hit the next section title, so stop.
                break;
            }
        }
      } else if (inSection) {
        sectionContent += line + '\n';
      }
    }
    return sectionContent.trim() ? formatDescription(sectionContent.trim()) : null;
  };


  return (
    <>
      <div className="flex flex-col min-h-screen bg-background font-body">
        <motion.div className="progress-bar" style={{ scaleX }} />
        <Header />
        <main className="flex-1">

          <section className="relative w-full bg-black flex flex-col items-center justify-end min-h-screen pt-20 pb-16">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl h-full flex flex-col justify-end">
              <div className="relative h-full w-full">
                  <Image
                      src={member.maskedImage || member.image}
                      alt={`Portrait of ${member.name}, ${member.role}`}
                      fill
                      className="object-cover object-top"
                      priority
                      data-ai-hint={member.hint}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8 text-center text-white flex flex-col justify-end items-center">
                    <h1 className="text-4xl md:text-6xl font-light font-headline tracking-widest">{member.name}</h1>
                    <p className="mt-2 text-lg text-white/80 uppercase tracking-[0.2em]">{member.role}</p>
                  </div>
              </div>
            </div>
            <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            >
                <ArrowDown className="h-8 w-8 text-white" />
            </motion.div>
          </section>
          
          <section id="member-details" className="w-full py-12 md:py-24 lg:py-32 bg-neutral-900 relative z-10">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
              <div className="mb-8">
                  <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Bio</h2>
                  <div className="w-16 h-px bg-primary mt-2"></div>
              </div>
              
              <div className="text-lg text-muted-foreground space-y-6">
                {formatDescription(isBioExpanded ? bioText : truncatedBio)}
              </div>

              {showReadMore && !isBioExpanded && (
                <div className="mt-6">
                  <Button variant="link" onClick={() => setIsBioExpanded(true)} className="p-0 text-accent">
                    Read more
                  </Button>
                </div>
              )}

              <div className="mt-16">
                <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">Credentials</h2>
                <Accordion type="multiple" value={openAccordion} onValueChange={setOpenAccordion} className="w-full">
                  {sections.map(section => {
                      const content = extractSection(member.description, section);
                      if (!content) return null;
                      
                      const value = section.toLowerCase();

                      return (
                        <AccordionItem value={value} key={value} className="border-b border-white/20">
                            <AccordionTrigger className="text-lg hover:no-underline">
                                {section}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="py-4 text-muted-foreground space-y-4">
                                    {content}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                      );
                  })}
                </Accordion>
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
