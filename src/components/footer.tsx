"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import Logo from "./logo";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-primary/20">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <p className="max-w-xs text-muted-foreground">
              Helping businesses grow through creative digital marketing solutions.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
            <div className="space-y-4">
              <h4 className="font-semibold font-headline text-foreground">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="text-muted-foreground hover:text-accent">Services</a></li>
                <li><a href="#portfolio" className="text-muted-foreground hover:text-accent">Portfolio</a></li>
                <li><a href="#team" className="text-muted-foreground hover:text-accent">Team</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-accent">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold font-headline text-foreground">Contact</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="mailto:hello@catalystcreative.com" className="hover:text-accent">hello@catalystcreative.com</a></li>
                <li><a href="tel:+1234567890" className="hover:text-accent">+1 (234) 567-890</a></li>
                <li>123 Creative Lane, Suite 100</li>
                <li>New York, NY 10001</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold font-headline text-foreground">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-accent"><Twitter /></a>
                <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-accent"><Linkedin /></a>
                <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-accent"><Instagram /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {year} Catalyst Creative. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
