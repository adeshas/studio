
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeSwitcher } from "./theme-switcher";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
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
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex md:items-center md:gap-6 text-sm font-medium">
          {navLinks.map((link) =>
            link.items ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-accent focus:outline-none">
                  {link.label}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {link.items.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                onClick={(e) => handleLinkClick(e, link.href!)}
                className={cn(
                  "transition-colors hover:text-accent focus:outline-none",
                  pathname === link.href && "text-accent font-semibold"
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
        <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <div className="flex items-center md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border/40">
          <nav className="flex flex-col items-center gap-4 p-4">
            {navLinks.map((link) =>
              link.items ? (
                <div key={link.label} className="text-center w-full">
                  <span className="font-semibold text-foreground py-2">{link.label}</span>
                  <div className="flex flex-col items-center gap-2 mt-2">
                    {link.items.map(item => (
                       <Link
                        key={item.href}
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className={cn(
                          "w-full text-center py-2 text-muted-foreground transition-colors hover:text-accent",
                          pathname === item.href && "text-accent font-semibold"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  onClick={(e) => handleLinkClick(e, link.href!)}
                  className={cn(
                    "w-full text-center py-2 transition-colors hover:text-accent focus:outline-none",
                    pathname === link.href && "text-accent font-semibold"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
