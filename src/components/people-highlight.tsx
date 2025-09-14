
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const variants = {
  hidden: { opacity: 0, y: 90 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 2.0, 
      ease: "easeOut",
      staggerChildren: 0.8
    } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } },
};

export default function PeopleHighlight() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.section
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="w-full py-20 md:py-32 lg:py-40 bg-background"
      aria-labelledby="people-highlight-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
            <motion.div className="relative w-full h-[480px] rounded-xl overflow-hidden shadow-xl" variants={itemVariants}>
                <Image
                src="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/09/ABISOLA%201.jpg"
                alt="Abisola Ayodele, Associate at Oyewole & Adesina"
                fill
                className="object-cover object-top"
                data-ai-hint="woman portrait lawyer"
                />
            </motion.div>
            <motion.div className="space-y-6" variants={itemVariants}>
                <h2 id="people-highlight-heading" className="text-3xl font-light font-headline tracking-tighter sm:text-5xl">Our People</h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    The people behind our excellence—dedicated, skilled, and trusted.
                </p>
                <Button asChild size="lg" variant="outline">
                    <Link href="/our-people">
                        Meet The Team
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
