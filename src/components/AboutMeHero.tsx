import {
  FaGithub,
  FaTwitter,
  FaEnvelope,
  FaDiscord,
  FaLinkedin,
} from "react-icons/fa";
import EasterOrb from "./EasterOrb";
import Pfp from "./Pfp";
import { ColourfulText } from "./ui/colourful-text";
import resume from "../assets/resume/resume.pdf";
import { FancyToolTip } from "./FancyToolTip";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface AboutMeHeroProps {
  scrollToSection: (section: string) => void;
  targetSection: string;
  setOpenEgg: (value: boolean) => void;
}

export function AboutMeHero({
  scrollToSection,
  targetSection,
  setOpenEgg,
}: AboutMeHeroProps) {
  const rotateControls = useAnimation();
  const handleMouseEnter = () => {
    rotateControls.set({ rotate: 0 }); 
    rotateControls.stop(); // pause rotation
  };

  const handleMouseLeave = () => {
    rotateControls.set({ rotate: 0 }); 
    rotateControls.start({
      rotate: 360,
      transition: {
        duration: 2,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  // Start rotating on mount
  useEffect(() => {
    rotateControls.start({
      rotate: 360,
      transition: {
        duration: 2,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [rotateControls]);  // Added dependency array to prevent unnecessary re-renders

  return (
    <div
      id="profile"
      className="w-full relative px-3 sm:px-6 lg:px-8 py-12 sm:py-10 overflow-hidden"
    >
      {/* Static Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a103a]/40 to-transparent -z-10" />

      {targetSection === "profile" && (
        <EasterOrb onClick={() => setOpenEgg(true)} />
      )}

      <div className="flex flex-col md:flex-row items-center md:items-start rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg gap-4 sm:gap-6 lg:gap-10 w-full max-w-auto mx-auto bg-[#10151c]/20 backdrop-blur-sm border border-[rgba(139,92,246,0.15)]">
        {/* Left Side */}
        <div className="flex flex-col space-y-4 sm:space-y-6 text-left md:w-2/3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent">
            Level 99 Full-Stack Developer
          </h1>

          <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-[#e2e8f0]">
            Welcome to my digital realm! I'm{" "}
            <a
              href="https://www.linkedin.com/in/ashish-dabral-6428ba195/"
              target="_blank"
              className="relative inline-block"
            >
              <ColourfulText text="Ashish Dabral" />
            </a>
            , A passionate developer crafting exceptional digital experiences
            through code.
          </p>

          {/* Social Icons */}
          <div className="flex flex-wrap space-x-3 xs:space-x-4 sm:space-x-6 md:space-x-8 text-xl sm:text-2xl md:text-3xl p-2 sm:p-3 text-gray-400 items-center">
            <a
              href="https://github.com/DexAsHisH"
              target="_blank"
              rel="noreferrer"
            >
              <FancyToolTip label="@DeXAsHisH">
                <div className="hover:bg-[#ffffff]/10 hover:text-[#ffffff] rounded-md p-2 transition">
                  <FaGithub />
                </div>
              </FancyToolTip>
            </a>
            <a
              href="https://discord.com/channels/@me"
              target="_blank"
              rel="noreferrer"
            >
              <FancyToolTip label="@dabral.ashish">
                <div className="hover:bg-[#ffffff]/10 hover:text-white rounded-md p-2 transition">
                  <FaDiscord />
                </div>
              </FancyToolTip>
            </a>
            <a
              href="https://x.com/dabral_ashishh"
              target="_blank"
              rel="noreferrer"
            >
              <FancyToolTip label="@dabral_ashishh">
                <div className="hover:bg-[#ffffff]/10 hover:text-[#ffffff] rounded-md p-2 transition">
                  <FaTwitter />
                </div>
              </FancyToolTip>
            </a>
            <a
              href="mailto:ashishdabral2014@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              <FancyToolTip label="@ashishdabral2014">
                <div className="hover:bg-[#ffffff]/10 hover:text-[#ffffff] rounded-md p-2 transition">
                  <FaEnvelope />
                </div>
              </FancyToolTip>
            </a>
            <a
              href="https://www.linkedin.com/in/ashish-dabral-6428ba195/"
              target="_blank"
              rel="noreferrer"
            >
              <FancyToolTip label="@ashish-dabral">
                <div className="hover:bg-[#ffffff]/10 hover:text-[#ffffff]/80 rounded-md p-2 transition">
                  <FaLinkedin />
                </div>
              </FancyToolTip>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-6">
            <motion.button
              onClick={() => scrollToSection("quests")}
              whileHover={{
                color: "white",
                scale: 1.05,
                backgroundColor: "#1f115d"
              }}
              className="w-full sm:w-auto text-base sm:text-lg md:text-xl lg:text-2xl bg-[#391db4]/20 text-slate-300 px-4 sm:px-6 py-2 rounded-full transition-all duration-300 border border-[#8b5cf6]/30 backdrop-filter shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
            >
              Discover my work ↓
            </motion.button>

            <a href={resume} download className="w-full sm:w-auto flex justify-center">
              <motion.div
                animate={rotateControls}
                initial={{ rotate: 0 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <motion.div 
                  className="relative group text-[#8b5cf6] bg-[#211539] rounded-full p-2 sm:p-3 border border-white/10 text-base sm:text-lg md:text-xl lg:text-2xl"
                  whileHover={{
                    color: "#9f89d2",
                    backgroundColor: "#271946",
                    scale: 1.2,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <span>CV</span>
                </motion.div>
              </motion.div>
            </a>
          </div>
        </div>

        {/* Right Side: Profile Picture */}
        <div className="w-full md:w-1/3 flex justify-center items-center mt-6 md:mt-0">
          <Pfp />
        </div>
      </div>
    </div>
  );
}