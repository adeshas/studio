
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const variants = {
    hidden: { opacity: 0, y: 90 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 2.0, 
        ease: "easeOut" 
      } 
    },
  };

  return (
    <motion.section 
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      id="contact" 
      className="w-full py-20 md:py-32 lg:py-40 bg-primary"
    >
      <div className="container mx-auto px-4 md:px-6 text-center text-primary-foreground">
        <h2 className="text-3xl md:text-5xl font-light font-headline">NEED A LAWYER?</h2>
        <p className="max-w-2xl mx-auto mt-4 text-lg md:text-xl text-primary-foreground/80">
            Let's discuss how we can assist you. Our team is prepared to provide the guidance and representation you need to achieve your objectives.
        </p>
        <div className="mt-8">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">
              Schedule a Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
