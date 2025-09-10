
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      staggerChildren: 0.2
    } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.section
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      id="about-us"
      className="w-full py-20 md:py-32 lg:py-40 bg-background"
      aria-labelledby="about-us-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
          <motion.div className="space-y-4" variants={itemVariants}>
            <h2 id="about-us-heading" className="text-3xl font-light font-headline tracking-tighter sm:text-5xl">About Us</h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              <span className="font-semibold text-foreground">Oyewole &amp; Adesina</span> is a law firm in Nigeria with proficiency in dispute resolution, corporate and commercial law, real estate, finance, energy, labour and employment, shipping, admiralty and intellectual property law. <span className="font-semibold text-foreground">Oyewole &amp; Adesina</span> is strategically placed to offer quality and first-class cost-efficient legal services to clients across the major economic hubs and sectors of Nigeria.
            </p>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We have built a reputation for understanding our clients’ peculiar business issues and challenges, and then proffering a legal and business-savvy solution.
            </p>
          </motion.div>
          <motion.div className="relative w-full h-80 lg:h-96 rounded-xl overflow-hidden shadow-xl" variants={itemVariants}>
            <Image
              src="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/08/CONFERENCE.jpg"
              alt="The modern and professional interior of the Oyewole & Adesina law office"
              fill
              className="object-cover"
              data-ai-hint="office conference"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
