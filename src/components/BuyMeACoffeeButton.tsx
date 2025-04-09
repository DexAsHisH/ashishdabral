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
      href="https://www.buymeacoffee.com/ashishdabral"
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-block
        relative
        overflow-hidden
        rounded-lg
        border border-[rgba(139,92,246,0.25)]
        shadow-lg
        ${fixed ? "fixed bottom-6 right-6 z-50" : ""}
      `}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 4px 20px rgba(139, 92, 246, 0.3)"
      }}
      whileTap={{ 
        scale: 0.98 
      }}
    >
      {/* Purple gradient overlay to match site theme */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#211539]/20 to-[#391db4]/40 mix-blend-multiply pointer-events-none z-10" />
      
      <img
        src="https://img.buymeacoffee.com/button-api/?text=Buy me a momo&emoji=🥟&slug=ashishdabral&button_colour=2b2853&font_colour=ffffff&font_family=Comic&outline_colour=ffffff&coffee_colour=FFDD00"
        alt="Buy me a momo"
        className="h-12 w-auto relative transition-all duration-300"
      />
    </motion.a>
  );
};