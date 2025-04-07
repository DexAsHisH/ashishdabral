import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export const CursorBubble = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const [isClicked, setIsClicked] = useState(false);
  const [isMoving, setIsMoving] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 3000); // Adjust idle time here
    };

    const handleClick = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 150);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", handleClick);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    controls.start({
      x: position.x - 12,
      y: position.y - 12,
      transition: { type: "spring", stiffness: 250, damping: 25 },
    });
  }, [position, controls]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      animate={controls}
    >
      <motion.div
        className="w-6 h-6 border border-white rounded-full"
        animate={{
          scale: isClicked ? 2 : 1,
          opacity: isMoving ? 0.5 : 0, // fade when idle
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 50,
          opacity: { duration: 0.5 },
        }}
        style={{
          backgroundColor: "transparent",
          mixBlendMode: "exclusion",
        }}
      />
    </motion.div>
  );
};
