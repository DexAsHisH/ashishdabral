import React from "react";
import { motion } from "framer-motion";

export function ColourfulText({ text }: { text: string }) {
  const colors = [
    "rgb(131, 179, 32)",
    "rgb(47, 195, 106)",
    "rgb(42, 169, 210)",
    "rgb(4, 112, 202)",
    "rgb(107, 10, 255)",
    "rgb(183, 0, 218)",
    "rgb(218, 0, 171)",
    "rgb(230, 64, 92)",
    "rgb(232, 98, 63)",
    "rgb(249, 129, 47)",
  ];

  const [colorIndex, setColorIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 4000); // Change color every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
   <span className="inline-block whitespace-normal md:whitespace-pre font-sans tracking-tight text-xl sm:text-2xl md:text-3xl">
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}-${colorIndex}`}
          initial={{
            y: 0,
          }}
          animate={{
            color: colors[colorIndex], // Change entire text to one color
            y: [0, -3, 0], // Slight bounce effect
            scale: [1, 1.01, 1], // Subtle scaling effect
            filter: ["blur(0px)", "blur(5px)", "blur(0px)"], // Blur effect
            opacity: [1, 0.8, 1], // Fading effect
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.05, // Staggered animation for each character
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
    </>
  );
}
