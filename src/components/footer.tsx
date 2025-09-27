
"use client";

import { motion } from 'framer-motion';
import Link from "next/link";
import Logo from "./logo";
import { Mail, MapPin, Phone } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.59-11.018-3.714v-2.155z" />
    </svg>
);


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
      className="bg-black border-t border-white/10 text-white pt-16 pb-8"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="inline-block w-48">
              <Logo variant="white" />
            </Link>
            <p className="font-bold">Oyewole & Adesina</p>
            <p className="text-sm font-semibold">Legal Practitioners, Consultants and Notaries</p>
            <p className="text-sm text-muted-foreground">
                A top-tier law firm delivering client-focused, detailed-oriented legal solutions guided by commercial insights and unwavering integrity.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Useful Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/the-firm" className="hover:text-white">The Firm</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link href="/publications" className="hover:text-white">Publications</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
             <h3 className="font-bold text-lg">Contact Us</h3>
             <div className="space-y-3 text-sm text-muted-foreground">
                 <p className="font-bold text-white">Lagos Office</p>
                <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-accent mt-1 shrink-0" />
                    <span>19A, Udi Street,<br/>Osborne Foreshore Estate Phase 1,<br/>Ikoyi, Lagos</span>
                </div>
                 <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-accent mt-1 shrink-0" />
                    <div>
                        <p>M: <a href="tel:+2347062103941" className="hover:text-white">+234 706 210 3941</a></p>
                        <p>O: <a href="tel:+2342012932390" className="hover:text-white">+234 201 293 2390</a></p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-accent mt-1 shrink-0" />
                    <a href="mailto:info@oyewoleadesina.com" className="hover:text-white">info@oyewoleadesina.com</a>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>Copyright &copy; {year} Oyewole &amp; Adesina. All Rights Reserved.</p>
           <div className="flex items-center gap-4 mt-4 sm:mt-0">
             <a href="https://twitter.com/oyewoleadesina" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-white/60 hover:text-white transition-colors">
                <TwitterIcon className="h-5 w-5 fill-current" />
              </a>
              <a href="https://www.linkedin.com/company/oyewoleadesina/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/60 hover:text-white transition-colors">
                <LinkedInIcon className="h-5 w-5 fill-current" />
              </a>
              <Link href="#" className="hover:text-white">Legal Disclaimer</Link>
            </div>
        </div>
      </div>
    </motion.footer>
  );
}
