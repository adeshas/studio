
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
  scrollYProgress?: MotionValue<number>;
}

export default function Header({ scrollYProgress }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const opacity = scrollYProgress ? useTransform(scrollYProgress, [0.9, 1], [1, 0]) : 1;
  const pointerEvents = scrollYProgress ? useTransform(scrollYProgress, [0.9, 1], ["auto", "none"]) : "auto";

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
        <div className="container mx-auto flex h-28 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-64 lg:w-72">
              <Logo variant="white" />
            </div>
          </Link>
          
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              className="h-auto p-1"
              aria-label="LinkedIn"
            >
              <a href="https://www.linkedin.com/company/oyewoleadesina/" target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-auto"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.59-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </div>
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
            <div className="container mx-auto flex h-28 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <Link href="/" onClick={() => setIsOpen(false)}>
                 <div className="w-64 lg:w-72">
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
            <nav className="flex flex-col items-center justify-center h-[calc(100vh-112px)] space-y-6">
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
