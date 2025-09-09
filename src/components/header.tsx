
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./logo";
import { ThemeSwitcher } from "./theme-switcher";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/the-firm", label: "The Firm" },
  { href: "/our-expertise", label: "Our Expertise" },
  { href: "/our-people", label: "Our People" },
  { href: "/careers", label: "Careers" },
  { href: "/publications", label: "Publications" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-40 lg:w-48">
            <Logo />
          </div>
        </Link>
        
        <div className="flex items-center gap-2">
            <ThemeSwitcher />
             <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md bg-background p-0">
                <SheetHeader className="p-6 border-b border-border/40 flex-row justify-between items-center">
                  <SheetTitle>Navigation</SheetTitle>
                   <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Close menu"
                    >
                      <X className="h-6 w-6" />
                  </Button>
                </SheetHeader>
                <nav className="flex flex-col p-6 space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "text-xl text-left py-2 transition-colors hover:text-accent focus:outline-none",
                        pathname === link.href ? "text-accent font-semibold" : "text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
