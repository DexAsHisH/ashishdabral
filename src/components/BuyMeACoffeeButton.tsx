import React from "react";
import { motion } from "framer-motion";

interface BuyMeACoffeeButtonProps {
  fixed?: boolean;
}

export const BuyMeACoffeeButton: React.FC<BuyMeACoffeeButtonProps> = ({
  fixed = false,
}) => {
  return (
    <motion.a
      href="https://buymeacoffee.com/ashishdabral"
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center justify-center gap-2
        text-base sm:text-lg md:text-sm
        bg-[#391db4]/20 
        hover:bg-[#1f115d]
        text-slate-400
        hover:text-white
        px-4 sm:px-6 py-2
        rounded-xl 
        transition-all duration-300 
        border border-[#8b5cf6]/30
        backdrop-blur-sm
        shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]
        ${fixed ? "fixed bottom-6 right-6 z-50" : ""}
      `}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{ 
        scale: 0.98 
      }}
    >
      <span>Buy Me a Momo</span>
      <span className="text-yellow-400">🥟</span>
    </motion.a>
  );
};