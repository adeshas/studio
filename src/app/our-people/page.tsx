
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { teamMembers } from "@/lib/team-data";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

type TeamMember = (typeof teamMembers)[0];

const formatDescription = (text: string) => {
  const paragraphs = text.split('\n\n');
  return paragraphs.map((paragraph, pIndex) => {
    const parts = paragraph.split(/(\*\*.*?\*\*)/g).filter(part => part);
    return (
      <p key={pIndex}>
        {parts.map((part, partIndex) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                  <Card key={member.name} className="shadow-lg rounded-xl overflow-hidden h-full flex flex-col">
                     <div className="relative w-full aspect-[600/1024]">
                          <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="w-full h-full object-cover"
                              style={member.imageStyle || {}}
                              data-ai-hint={member.hint}
                          />
                     </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold font-headline">{member.name}</h3>
                      <p className="text-md font-semibold text-accent mb-4">{member.role}</p>
                      <p className="text-muted-foreground text-sm flex-grow">
                        {member.description.substring(0, 150)}...
                      </p>
                       <Button onClick={() => setSelectedMember(member)} className="mt-4 self-start">
                        Read Full Profile
                      </Button>
                    </CardContent>
                  </Card>
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
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    className="object-cover rounded-l-lg"
                    style={selectedMember.imageStyle || {}}
                    data-ai-hint={selectedMember.hint}
                />
              </div>
              <div className="flex flex-col p-6 sm:p-8">
                <DialogHeader className="mb-4 text-left">
                  <DialogTitle className="text-3xl lg:text-4xl font-bold font-headline">{selectedMember.name}</DialogTitle>
                  <p className="text-lg text-accent font-semibold">{selectedMember.role}</p>
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
