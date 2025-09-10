
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
        duration: 0.5,
        ease: "easeOut"
    }
  },
};

type ExpertiseListItemProps = {
  href: string;
  title: string;
};

export default function ExpertiseListItem({ href, title }: ExpertiseListItemProps) {
  return (
    <motion.div variants={itemVariants}>
      <Link href={href} className="group block relative overflow-hidden">
        <div className="highlight-swoop"></div>
        <div className="relative flex items-center justify-between border-b border-white/20 py-4">
          <span className="text-xl text-primary-foreground/80 group-hover:text-accent transition-colors duration-300">{title}</span>
          <ArrowRight className="h-6 w-6 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4" />
        </div>
      </Link>
    </motion.div>
  );
}
