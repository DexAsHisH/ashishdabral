import { motion } from "framer-motion";
import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className = "",
}) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={`scroll-mt-24 relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 ${className}`}
    >
      {children}
    </motion.section>
  );
};
