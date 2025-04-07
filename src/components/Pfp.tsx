import { useRef, useState, useEffect, useCallback } from "react";
import jinWoo from "../assets/jinwoo.jpg";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Pfp() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smoother animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add spring physics for more natural movement
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  // Transform rotation values to CSS
  const transform = useTransform(
    [rotateX, rotateY],
    ([rx, ry]) => `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`
  );

  // Add parallax effect for more depth
  const glowX = useTransform(rotateY, [-15, 15], [-20, 20]);
  const glowY = useTransform(rotateX, [-15, 15], [20, -20]);

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setIsVisible(!(width < 640 || height < 500));
  }, []);

  useEffect(() => {
    handleResize();

    // Use passive listener for better performance
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate normalized position (-1 to 1)
      const normalizedX = (e.clientX - centerX) / (rect.width / 2);
      const normalizedY = (e.clientY - centerY) / (rect.height / 2);

      // Set motion values with increased sensitivity for more dramatic effect
      rotateY.set(normalizedX * 15);
      rotateX.set(-normalizedY * 15);

      // Update mouse position for glow effect
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY, rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  }, [rotateX, rotateY]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="relative ml-6 group perspective-1000 "
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      ref={containerRef}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 blur-xl"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(139, 92, 246, 0) 70%)",
          transform: isHovered
            ? `translate(${glowX.get()}px, ${glowY.get()}px)`
            : "translate(0px, 0px)",
          transition: "transform 0.2s ease-out",
        }}
        aria-hidden="true"
      />

      {/* Main profile image */}
      <motion.div className="overflow-hidden rounded-3xl" style={{ transform }}
      >
        <motion.img
          src={jinWoo}
          alt="Ashish Dabral"
          width="300"
          height="300"
          loading="eager"
          
          className="w-[90vw] max-w-[450px] h-auto object-contain rounded-3xl shadow-xl will-change-transform 
          grayscale group-hover:grayscale-0 group-hover:saturate-150 
          transition-all duration-500 ease-out 
          group-hover:shadow-[0_0_40px_#8b5cf6] 
          scale-105 group-hover:scale-100"
        />

        {/* Overlay effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100"
          style={{
            transition: "opacity 0.3s ease-out",
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Optional border highlight */}
      <motion.div
        className="absolute inset-0 rounded-3xl border border-purple-300/0 group-hover:border-purple-300/50"
        style={{ transform }}
        transition={{
          duration: 0.5,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
