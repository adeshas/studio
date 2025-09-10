
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const clients = [
  "Microsoft",
  "Google",
  "Amazon",
  "Netflix",
  "Facebook",
  "Apple",
  "Tesla",
];

export default function Clients() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.section
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      id="clients"
      className="w-full py-12 bg-black"
    >
      <div className="container mx-auto text-center">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-8">
          Trusted by leading organizations
        </h3>
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee">
            {[...clients, ...clients].map((client, index) => (
              <div key={index} className="flex-shrink-0 mx-8">
                <span className="text-2xl font-semibold text-white/70">{client}</span>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
        </div>
      </div>
    </motion.section>
  );
}
