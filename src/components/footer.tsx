
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
      className="profile-footer bg-black border-t border-white/10 text-white"
    >
      <div className="shell">
        <div className="profile-footer__inner">
            <div className="space-y-4">
            <Link href="/" className="inline-block w-48">
              <Logo variant="white" />
            </Link>
          </div>
          <nav className="footer-nav">
              <Link href="/the-firm">About</Link>
              <Link href="/our-expertise">Expertise</Link>
              <Link href="/our-people">Team</Link>
              <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>Copyright &copy; {year} Oyewole &amp; Adesina. All Rights Reserved.</p>
           <nav className="footer-nav">
              <Link href="#">Legal Disclaimer</Link>
            </nav>
        </div>
        <style jsx>{`
        .profile-footer {
          background: rgba(4, 2, 8, 0.95);
          padding: 3rem 0 2rem;
        }

        .shell {
          width: min(1120px, 92vw);
          margin: 0 auto;
        }

        .profile-footer__inner {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .footer-nav {
          display: flex;
          gap: 1.25rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          font-size: 0.75rem;
        }

        .footer-nav a {
          color: rgba(255, 255, 255, 0.62);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-nav a:hover {
          color: rgba(255, 255, 255, 0.95);
        }
        
        @media (max-width: 768px) {
           .profile-footer__inner {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
      </div>
    </motion.footer>
  );
}
