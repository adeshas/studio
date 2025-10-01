
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export default function Testimonials() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const variants = {
    hidden: { opacity: 0, y: 90 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2.0,
        ease: "easeOut"
      }
    },
  };

  return (
    <motion.section
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      id="testimonials"
      className="w-full py-20 md:py-32 lg:py-40 bg-neutral-900 text-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-4">
            <img
              src="https://rmh.jsl.mybluehost.me/wp-content/uploads/2025/10/NEW_DAYO.JPG"
              alt="Adedayo Adesina"
              className="object-cover rounded-full mx-auto mb-6 w-[180px] h-[180px]"
              style={{ maxWidth: 180, maxHeight: 180, objectFit: 'cover' }}
              loading="eager"
            />
          </div>
          <blockquote className="text-xl md:text-2xl font-light italic">
            &ldquo;Oyewole & Adesina stands out for its exceptional legal acumen and unwavering commitment to client success. Their commercially-minded approach consistently delivers results that matter.&rdquo;
          </blockquote>
          <cite className="block mt-6 font-semibold not-italic">
            Adedayo Adesina, SAN
            <span className="block text-sm font-light text-white/60">Co-Founder, Oyewole & Adesina</span>
          </cite>
        </div>
      </div>
    </motion.section>
  );
}
