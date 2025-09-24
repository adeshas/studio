
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { teamMembers } from "@/lib/team-data";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { Linkedin, Mail } from "lucide-react";

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


export default function OurPeoplePage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <>
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

              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {teamMembers.map((member) => (
                  <div key={member.name} onClick={() => setSelectedMember(member)} className="cursor-pointer">
                    <Card className="shadow-lg rounded-xl overflow-hidden h-full flex flex-col group">
                      <div className="relative w-full aspect-[4/5]">
                            <Image
                                src={member.image}
                                alt={`Portrait of ${member.name}, ${member.role}`}
                                fill
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                style={member.imageStyle || {}}
                                data-ai-hint={member.hint}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 text-left text-white">
                                <h3 className="text-2xl font-bold font-headline">{member.name}</h3>
                                <p className="text-md font-semibold text-white/80">{member.role}</p>
                            </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>

      {selectedMember && (
        <Dialog open={!!selectedMember} onOpenChange={(isOpen) => !isOpen && setSelectedMember(null)}>
          <DialogContent className="max-w-4xl w-[95vw] sm:w-[90vw] h-[90vh] p-0 flex flex-col">
            <div className="grid md:grid-cols-2 h-full">
              <div className="relative h-full hidden md:block">
                <Image
                    src={selectedMember.maskedImage || selectedMember.image}
                    alt={`Portrait of ${selectedMember.name}, ${selectedMember.role}`}
                    fill
                    className="object-cover rounded-l-lg"
                    style={selectedMember.imageStyle || {}}
                    data-ai-hint={selectedMember.hint}
                />
              </div>
              <div className="flex flex-col p-6 sm:p-8 overflow-hidden">
                <DialogHeader className="mb-4 text-left">
                  <DialogTitle className="text-3xl lg:text-4xl font-bold font-headline">{selectedMember.name}</DialogTitle>
                  <p className="text-lg text-muted-foreground font-semibold">{selectedMember.role}</p>
                </DialogHeader>
                <ScrollArea className="flex-1 pr-4 -mr-4">
                  <div className="text-foreground space-y-4">
                      {formatDescription(selectedMember.description)}
                  </div>
                </ScrollArea>
                 <div className="flex gap-4 mt-6 items-center border-t pt-4">
                    {selectedMember.email && (
                        <a href={`mailto:${selectedMember.email}`} className="text-muted-foreground hover:text-accent flex items-center gap-2">
                            <Mail className="h-5 w-5" /> <span>Email</span>
                        </a>
                    )}
                    {selectedMember.linkedin && (
                        <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent flex items-center gap-2">
                            <Linkedin className="h-5 w-5" /> <span>LinkedIn</span>
                        </a>
                    )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
