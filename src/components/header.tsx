
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, MotionValue, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/the-firm", label: "The Firm" },
  { href: "/our-expertise", label: "Our Expertise" },
  { href: "/our-people", label: "Our People" },
  { href: "/careers", label: "Careers" },
  { href: "/publications", label: "Publications" },
  { href: "/contact", label: "Contact Us" },
];

type HeaderProps = {
  scrollYProgress: MotionValue<number>;
}

export default function Header({ scrollYProgress }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);
  const pointerEvents = useTransform(scrollYProgress, [0.9, 1], ["auto", "none"]);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.5,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.header
        style={{ opacity, pointerEvents }}
        className="sticky top-0 z-40 w-full bg-black/20 backdrop-blur-sm"
      >
        <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-40 lg:w-48">
              <Logo variant="white" />
            </div>
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-white" />
          </Button>
        </div>
      </motion.header>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          >
            <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <Link href="/" onClick={() => setIsOpen(false)}>
                 <div className="w-40 lg:w-48">
                    <Logo variant="white" />
                 </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-white" />
              </Button>
            </div>
            <nav className="flex flex-col items-center justify-center h-[calc(100vh-80px)] space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-light text-white transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
