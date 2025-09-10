
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { expertiseData } from "@/lib/expertise-data";
import Link from "next/link";
import Image from "next/image";
import { Scale, Briefcase, Landmark, Factory } from "lucide-react";

const expertiseIcons: { [key: string]: React.ReactNode } = {
  "Dispute Resolution": <Scale className="h-8 w-8 text-primary" />,
  "Corporate and Commercial Practice": <Briefcase className="h-8 w-8 text-primary" />,
  "Real Estate": <Landmark className="h-8 w-8 text-primary" />,
  "Energy": <Factory className="h-8 w-8 text-primary" />,
};

const MotionCard = ({ children, index }: { children: React.ReactNode, index: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? "visible" : "hidden"}>
      {children}
    </motion.div>
  );
};


export default function Expertise() {
  const featuredExpertise = expertiseData.filter(item => 
    ["Dispute Resolution", "Corporate and Commercial Practice", "Energy"].includes(item.title)
  );

  return (
    <section id="expertise" className="w-full py-20 md:py-32 bg-black text-white" aria-labelledby="expertise-heading">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, ease: "easeOut" }}
             viewport={{ once: true }}
          >
            <h2 id="expertise-heading" className="text-3xl font-light tracking-tighter sm:text-5xl">Our Expertise</h2>
            <p className="max-w-[900px] text-white/70 md:text-xl/relaxed mt-4">
              We provide expert legal counsel across a wide range of practice areas.
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExpertise.map((item, index) => (
                <MotionCard key={item.slug} index={index}>
                    <Card className="flex flex-col h-full bg-neutral-900 border border-white/10 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-primary/20 hover:-translate-y-2">
                        <CardContent className="p-8 flex flex-col flex-grow">
                            <div className="mb-4">
                                {expertiseIcons[item.title] || <Scale className="h-8 w-8 text-primary" />}
                            </div>
                            <h3 className="text-2xl font-bold font-headline mb-4 text-white">{item.title}</h3>
                            <p className="text-white/60 text-sm flex-grow mb-6">{item.shortDescription}</p>
                            <Button asChild variant="link" className="p-0 self-start mt-auto text-primary hover:text-primary/80">
                                <Link href={`/our-expertise/${item.slug}`}>Read More &raquo;</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </MotionCard>
            ))}
        </div>
        <div className="text-center mt-16">
           <Button asChild size="lg">
                <Link href="/our-expertise">View All Practice Areas</Link>
           </Button>
        </div>
      </div>
    </section>
  );
}
