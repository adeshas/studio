
"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import Logo from "./logo";
import { Mail } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const footerClasses = cn(
    "transition-colors duration-300",
    mounted && theme === 'dark' && 'bg-primary',
    mounted && (theme === 'light' || !theme) && 'bg-primary/20'
  );
  
  const logoVariant = mounted && (theme === 'purple' || theme === 'dark') ? 'white' : 'color';


  return (
    <footer className={footerClasses}>
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Logo variant={logoVariant} />
            </Link>
            <div className="max-w-xs text-muted-foreground">
              <h4 className="font-semibold font-headline text-foreground">Oyewole & Adesina</h4>
              <h5 className="font-semibold text-foreground/90 mb-1 text-sm">Legal Practitioners, Consultants and Notary Public</h5>
              <p>A premier Nigerian law firm delivering meticulous, client-focused legal solutions grounded in commercial insight and unwavering integrity.</p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold font-headline text-foreground">Useful Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-accent">Home</Link></li>
              <li><Link href="/#about-us" className="text-muted-foreground hover:text-accent">Who We Are</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-accent">Contact Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-accent">Terms of Use</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-accent">Careers</Link></li>
              <li><Link href="/publications" className="text-muted-foreground hover:text-accent">News and Publications</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold font-headline text-foreground">Expertise</h4>
            <ul className="space-y-2">
              <li><a href="#expertise" className="text-muted-foreground hover:text-accent">Dispute Resolution</a></li>
              <li><a href="#expertise" className="text-muted-foreground hover:text-accent">Energy</a></li>
              <li><a href="#expertise" className="text-muted-foreground hover:text-accent">Real Estate</a></li>
              <li><a href="#expertise" className="text-muted-foreground hover:text-accent">Labour and Employment</a></li>
              <li><a href="#expertise" className="text-muted-foreground hover:text-accent">Finance &amp; Insurance</a></li>
              <li><a href="#expertise" className="text-muted-foreground hover:text-accent">Corporate and Commercial Practice</a></li>
              <li><a href="#expertise" className="text-muted-foreground hover:text-accent">Shipping, Admiralty and Maritime</a></li>
              <li><a href="#expertise" className="text-muted-foreground hover:text-accent">Intellectual Property</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold font-headline text-foreground">Contact Us</h4>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h5 className="font-semibold text-foreground/90 mb-1">Lagos Office</h5>
                <p>19A, Udi Street<br/>Osborne Foreshore Estate Phase 1, Ikoyi, Lagos</p>
                <p>M: +234 706 210 3941</p>
              </div>
              <div>
                <h5 className="font-semibold text-foreground/90 mb-1">Abuja Office</h5>
                <p>Block 33b, 24 Cairo Street,<br/>Off Ademola Adetokunbo Crescent, Wuse II, Abuja</p>
                <p>M: +234 803 657 8169</p>
              </div>
              <div className="flex items-center gap-4">
                <a href="mailto:info@oyewoleadesina.com" className="hover:text-accent inline-flex items-center gap-2"><Mail className="h-4 w-4" />info@oyewoleadesina.com</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>Copyright &copy; {year} Oyewole &amp; Adesina. All Rights Reserved.</p>
          {/* <p>Powered by eloquence Systems Ltd</p> */}
        </div>
      </div>
    </footer>
  );
}
