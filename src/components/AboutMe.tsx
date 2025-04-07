import { motion } from "framer-motion";
import { useState, useEffect, useRef, memo } from "react";
import avatar from "../assets/avatar.jpg";

const formatTime = (date: Date) => {
  return date.toLocaleString();
};

// Memoized tech badge component to prevent unnecessary rerenders
const TechBadge = memo(({ children }: { children: React.ReactNode }) => (
  <span className="bg-[#0d1117] px-2 py-1 rounded-md text-lg border border-[rgba(139,92,246,0.15)]">
    {children}
  </span>
));

export function AboutMe() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Set up the interval and store the ID
    intervalRef.current = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Clean up on unmount
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <section id="about" className="relative w-full px-6 py-16 overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 max-w-auto mx-auto flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-20 lg:gap-40 xl:gap-80">
        {/* Left: Profile Info */}
        <div className="flex items-center shadow-lg w-full sm:w-auto p-6 rounded-xl bg-[#0d1117]/30 backdrop-blur-sm">
          <div className="relative group overflow-hidden rounded-3xl w-24 h-24 md:w-28 md:h-28 ml-6">
            <img
              src={avatar}
              alt="Profile"
              loading="lazy"
              width="112"
              height="112"
              className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-150"
            />
          </div>

          <div className="flex flex-col justify-center text-left ml-4">
            <h2 className="text-lg font-grotesk text-[#e2e8f0] whitespace-nowrap flex">
              @dabralashish
              <span className="text-[#8b5cf6] text-xs flex items-center ml-1">· he/him</span>
            </h2>
            <p className="text-[#10b981] text-xs">idle</p>
            <p className="text-[#e2e8f0]/60 text-xs">
              {formatTime(currentTime)}
            </p>
          </div>
        </div>

        {/* Right: About Text */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-[#e2e8f0] max-w-3xl text-sm md:text-xl leading-relaxed m-auto"
        >
          <p>
            Hey there, I'm{" "}
            <span className="text-[#8b5cf6] relative group cursor-pointer">
              Ashish Dabral
              {/* Tooltip */}
              <div className="absolute top-[-48px] left-1/2 -translate-x-1/2 bg-zinc-300 text-black text-base px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20 pointer-events-none">
                I love Coding, Coffee and Gaming.
              </div>
            </span>
            ! A{" "}
            <TechBadge>24</TechBadge>
            -year-old{" "}
            <TechBadge>full-stack developer</TechBadge>{" "}
            from India. I've been coding since{" "}
            <TechBadge>2020</TechBadge>{" "}
            and love building immersive web experiences.
          </p>
          <p className="mt-4">
            I specialize in{" "}
            <TechBadge>React.js</TechBadge>,{" "}
            <TechBadge>Express.js</TechBadge>,{" "}
            <TechBadge>PostgreSQL</TechBadge>, and more. Passionate about contributing to{" "}
            <TechBadge>open source</TechBadge>{" "}
            and constantly learning new tech.
          </p>
        </motion.div>
      </div>
    </section>
  );
}