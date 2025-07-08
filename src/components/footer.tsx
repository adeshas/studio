
"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import Logo from "./logo";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-primary/20">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <p className="max-w-xs text-muted-foreground">
              A premier Nigerian law firm providing expert legal services.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold font-headline text-foreground">Useful Links</h4>
            <ul className="space-y-2">
              <li><Link href="#home" className="text-muted-foreground hover:text-accent">Home</Link></li>
              <li><Link href="#about-us" className="text-muted-foreground hover:text-accent">Who We Are</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-accent">Contact Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-accent">Terms of Use</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-accent">Careers</Link></li>
              <li><Link href="#publications" className="text-muted-foreground hover:text-accent">News and Publications</Link></li>
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
            <h4 className="font-semibold font-headline text-foreground">Latest News</h4>
            <ul className="space-y-2">
              <li className="text-sm"><a href="#publications" className="text-muted-foreground hover:text-accent">The Finance Act, 2020: A veritable tool for effective amendment...</a></li>
              <li className="text-sm"><a href="#publications" className="text-muted-foreground hover:text-accent">COVID-19: Implication on the enforcement of contracts in Nigeria</a></li>
              <li className="text-sm"><a href="#publications" className="text-muted-foreground hover:text-accent">Enforcement of the Penalty Provisions in the DPR Guidelines...</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>Copyright &copy; {year} Oyewole &amp; Adesina. All Rights Reserved.</p>
          <p>Powered by eloquence Systems Ltd</p>
        </div>
      </div>
    </footer>
  );
}
