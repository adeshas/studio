

"use client";


import { Card, CardContent } from "@/components/ui/card";
import { teamMembers } from "@/lib/team-data";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState, useRef, useEffect } from "react";
import React from "react";
import { ArrowDown } from "lucide-react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

type TeamMember = (typeof teamMembers)[0];

const cardVariants = {
  initial: { opacity: 0, y: 270 },
  animate: { opacity: 1, y: 0, transition: { duration: 1.8, ease: "easeOut" } },
};

function TeamMemberCard({ member, index }: { member: TeamMember, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const isInitialLoad = index < 3;

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial={isInitialLoad ? "animate" : "initial"}
      animate={isInView ? "animate" : "initial"}
    >
      <Link href={`/our-people/${member.slug}`} className="cursor-pointer">
        <Card className="shadow-lg rounded-xl overflow-hidden h-full flex flex-col group">
          <div className="relative w-full aspect-[4/5]">
            <img
              src={member.image}
              alt={`Portrait of ${member.name}, ${member.role}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 absolute inset-0"
              style={{ objectPosition: 'top', objectFit: 'cover', position: 'absolute', inset: 0 }}
              data-ai-hint={member.hint}
              loading={index < 3 ? "eager" : "lazy"}
            />
            <div className="absolute bottom-0 left-0 p-6 text-left text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent w-full">
              <h3 className="text-2xl font-bold font-headline">{member.name}</h3>
              <p className="text-md font-semibold text-white/80">{member.role}</p>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}


export default function OurPeoplePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const { scrollYProgress: pageScrollYProgress } = useScroll();
  const scaleX = useSpring(pageScrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { scrollYProgress: heroScrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background font-body relative">
        <motion.div className="progress-bar" style={{ scaleX }} />
        <Header scrollYProgress={heroScrollYProgress} />
        <main className="flex-1">

          <section ref={heroRef} className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden -mt-20">
            <div className="absolute inset-0 z-0">
              <img
                src="https://pub-dff2dcf3e9c045f2bd47bede1998375e.r2.dev/uploads/IMG_1162_v2.jpeg"
                alt="A premier law firm"
                className="object-cover fixed h-screen w-full h-full absolute inset-0"
                style={{ objectFit: 'cover', position: 'absolute', inset: 0 }}
                data-ai-hint="office building modern"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/80"></div>
            </div>
            <div className="relative z-10 container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold font-headline">Our People</h1>
              <div className="mt-4 text-lg">
                <Link href="/" className="hover:underline">Home</Link>
                <span className="mx-2">/</span>
                <span>Our People</span>
              </div>
            </div>
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-8 w-8 text-white" />
            </motion.div>
          </section>

          <section id="our-people-full" className="w-full py-12 md:py-24 lg:py-32 bg-background relative z-10">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Meet our Team</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Meet our dedicated team of experienced and competent legal professionals.
                  </p>
                </div>
              </div>

              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {teamMembers.map((member, index) => (
                  <TeamMemberCard
                    key={member.name}
                    member={member}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
