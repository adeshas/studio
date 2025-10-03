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
    <>
      <motion.section
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-full bg-background"
        aria-labelledby="people-highlight-heading"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-24 min-h-[480px]">
            <motion.div
              className="space-y-6 text-center lg:text-left pt-12 lg:pt-0"
              variants={itemVariants}
            >
              <h2 id="people-highlight-heading" className="text-3xl font-light font-headline tracking-tighter sm:text-5xl">Our People</h2>
              <Button asChild size="lg" variant="outline">
                <Link href="/our-people">
                  Meet The Team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div className="relative w-full max-w-md h-[480px] image-container" variants={itemVariants}>
              <Image
                src="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/new/MASKED/MEET_THE_TEAM-masked.png"
                alt="Meet the team at Oyewole & Adesina"
                fill
                className="object-contain object-bottom w-full h-full absolute inset-0"
                data-ai-hint="lawyers team portrait"
                style={{ objectFit: 'contain', objectPosition: 'bottom', position: 'absolute', inset: 0 }}
                priority
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
      <style jsx>{`
      .image-container {
        position: relative;
        overflow: visible;
      }
      .image-container::before {
        content: '';
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border: 3px solid;
        border-image: linear-gradient(45deg, hsl(var(--primary)), hsl(var(--primary) / 0.5)) 1;
        transform: rotate(-15deg) scale(0.9);
        z-index: -1;
        border-radius: 1.5rem;
        transition: transform 0.4s ease;
        background: radial-gradient(
            circle at bottom center,
            hsl(var(--primary) / 0.15),
            transparent 60%
          );
      }
      .image-container:hover::before {
        transform: rotate(-10deg) scale(0.95);
      }
      .image-container > :global(img) {
         border-radius: 0.75rem;
         box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4);
      }
    `}</style>
    </>
  );
}
