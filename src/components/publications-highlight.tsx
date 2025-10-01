
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { publicationsData } from "@/lib/publications-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const featuredPublications = publicationsData.slice(0, 3);

const variants = {
  hidden: { opacity: 0, y: 90 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 2.0,
      ease: "easeOut",
      staggerChildren: 0.3
    }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } },
};

export default function PublicationsHighlight() {
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
      id="publications-highlight"
      className="w-full py-20 md:py-32 lg:py-40 bg-primary/10"
      aria-labelledby="publications-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="space-y-2">
            <h2 id="publications-heading" className="text-3xl font-light font-headline tracking-tighter sm:text-5xl">Publications</h2>
          </div>
          <p className="max-w-[900px] text-muted-foreground md:text-lg/relaxed mt-4 md:mt-0">
            Stay informed with our legal insights and analysis
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={variants}
        >
          {featuredPublications.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="flex flex-col h-full bg-transparent border-0 shadow-none rounded-none">
                <div className="relative w-full h-64 mb-6">
                  <img
                    src="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/folder-document-3.png"
                    alt={item.title}
                    className="object-contain w-full h-full absolute inset-0"
                    style={{ filter: 'hue-rotate(213deg) saturate(0.7)', objectFit: 'contain', position: 'absolute', inset: 0 }}
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-xl font-bold font-headline mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm flex-grow mb-4">{item.description}</p>
                  <Button asChild variant="outline" className="self-start mt-auto">
                    <a href={item.link} target="_blank" rel="noopener noreferrer" download>Read More &raquo;</a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
