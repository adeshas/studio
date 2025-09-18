
"use client";

import { motion } from 'framer-motion';
import Link from "next/link";
import Logo from "./logo";
import { Mail } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 90 },
    visible: { opacity: 1, y: 0, transition: { duration: 2.0, ease: "easeOut" } },
  };

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <motion.footer
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-black border-t border-white/10 text-white"
    >
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Logo variant="white" />
            </Link>
            <div className="max-w-xs text-muted-foreground">
              <h4 className="font-light font-headline text-foreground">Oyewole & Adesina</h4>
              <h5 className="font-semibold text-foreground/90 mb-1 text-sm">Legal Practitioners, Consultants and Notaries</h5>
              <p>A top-tier law firm delivering client-focused, detailed-oriented legal solutions guided by commercial insights and unwavering integrity.</p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-light font-headline text-foreground">Useful Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-accent">Home</Link></li>
              <li><Link href="/the-firm" className="text-muted-foreground hover:text-accent">The Firm</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-accent">Contact Us</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-accent">Careers</Link></li>
              <li><Link href="/publications" className="text-muted-foreground hover:text-accent">Publications</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-light font-headline text-foreground">Expertise</h4>
            <ul className="space-y-2">
              <li><Link href="/our-expertise/dispute-resolution" className="text-muted-foreground hover:text-accent">Dispute Resolution</Link></li>
              <li><Link href="/our-expertise/energy" className="text-muted-foreground hover:text-accent">Energy</Link></li>
              <li><Link href="/our-expertise/real-estate" className="text-muted-foreground hover:text-accent">Real Estate</Link></li>
              <li><Link href="/our-expertise/corporate-and-commercial-practice" className="text-muted-foreground hover:text-accent">Corporate & Commercial</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-light font-headline text-foreground">Contact Us</h4>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h5 className="font-semibold text-foreground/90 mb-1">Lagos Office</h5>
                <p>19A, Udi Street,<br/>Osborne Foreshore Estate Phase 1,<br/>Ikoyi, Lagos</p>
                <p>M: +234 706 210 3941</p>
                <p>O: +234 201 293 2390</p>
              </div>
              <div className="flex items-center gap-4">
                <a href="mailto:info@oyewoleadesina.com" className="hover:text-accent inline-flex items-center gap-2"><Mail className="h-4 w-4" />info@oyewoleadesina.com</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>Copyright &copy; {year} Oyewole &amp; Adesina. All Rights Reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}
