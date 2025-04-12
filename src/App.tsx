import { HUD } from "./components/HUD";
import { AboutMe } from "./components/AboutMe";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { Briefcase, Award, PenSquare } from "lucide-react";
import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { BackgroundBeamsWithCollision } from "./components/ui/background-beams-with-collision";
import { AboutMeHero } from "./components/AboutMeHero";
import { CursorBubble } from "./components/CursorBubble";
import HeroVideo from "./components/HeroVideo";


const Achievements = lazy(() => import("./components/Achievements"));
const Skills = lazy(() => import("./components/Skills"));
const EasterOrb = lazy(() => import("./components/EasterOrb"));
const EasterEgg = lazy(() => import("./components/EasterEgg"));
const Footer = lazy(() => import("./components/Footer"));
const Quests = lazy(() => import("./components/Quests"));
const Blogs = lazy(() => import("./components/Blogs"));

function App() {
  const [openEgg, setOpenEgg] = useState(false);
  const [targetSection, setTargetSection] = useState<string | null>(null);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleOpenEgg = useCallback(() => {
    setOpenEgg(true);
  }, []);

 
  useEffect(() => {
    const sectionIds = [
      "profile",
      "about",
      "skills",
      "quests",
      "party",
    ];

    const pickRandomSection = () => {
      const randomId =
        sectionIds[Math.floor(Math.random() * sectionIds.length)];
      setTargetSection(randomId);
    };

    pickRandomSection();
    const interval = setInterval(pickRandomSection, 60000);
    return () => clearInterval(interval);
  }, []);

  const LoadingFallback = () => (
    <div className="flex items-center justify-center p-8">
      <div className="w-6 h-6 border-2 border-t-2 border-[#10b981] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#080c18] text-[#ffffff] overflow-y-auto relative font-grotesk">
        <CursorBubble />
        <div className="fixed inset-0 z-0 pointer-events-none">
          <BackgroundBeamsWithCollision children={undefined} />
        </div>

        <HUD />

        <main className="pt-24 w-full h-full relative z-10 ">
          <Suspense fallback={<LoadingFallback />}>
              <AboutMeHero
                scrollToSection={() => scrollToSection("about")}
                targetSection={targetSection || ""}
                setOpenEgg={handleOpenEgg}
              />

              <div id="about" className="relative">
                {targetSection === "about" && (
                  <EasterOrb onClick={handleOpenEgg} />
                )}
                <AboutMe />
              </div>
            

            <motion.section
              id="skills"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.1 }}
              className="scroll-mt-24 relative"
            >
              {targetSection === "skills" && (
                <EasterOrb onClick={handleOpenEgg} />
              )}
            
              <Skills />
       
            </motion.section>

            <motion.section
              id="blog"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.1 }}
              className="scroll-mt-24 relative"
            >
              {targetSection === "blog" && (
                <EasterOrb onClick={handleOpenEgg} />
              )}
              <div className="flex gap-3 mt-5 mb-5 items-center justify-center">
                <PenSquare
                  className="drop-shadow-[0_0_8px_#f43f5e] text-red-500"
                  size={24}
                />
                <h2 className="text-3xl text-[#e2e8f0] font-semibold drop-shadow-[0_0_8px_#f43f5e]">
                  Blogs
                </h2>
              </div>
              <Blogs />
            </motion.section>

            <motion.section
              id="quests"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.1 }}
              className="scroll-mt-24 relative"
            >
              {targetSection === "quests" && (
                <EasterOrb onClick={handleOpenEgg} />
              )}
              <div className="flex items-center gap-3 mt-20 justify-center">
                <Briefcase
                  className="text-[#10b981] drop-shadow-[0_0_6px_#10b981]"
                  size={24}
                />
                <h2 className="text-3xl font-semibold text-[#10b981] drop-shadow-[0_0_6px_#10b981]">
                  Quest <span className="text-[#e2e8f0]">Log</span>
                </h2>
              </div>
              <HeroVideo />
                <Quests />
              
            </motion.section>

            
              <motion.section
                id="party"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.1 }}
                className="space-y-8 scroll-mt-24 relative"
              >
                {targetSection === "party" && (
                  <EasterOrb onClick={handleOpenEgg} />
                )}
                <div className="flex items-center gap-2 justify-center text-3xl drop-shadow-[0_0_6px_#f97316]">
                  <Award className="text-[#f97316]" size={24} />
                  <h2 className="text-[#f97316] font-semibold flex">
                    Achiev{" "}
                    <span className="text-[#e2e8f0] font-semibold">ements</span>
                  </h2>
                </div>

                <Achievements />
              </motion.section>
           
          </Suspense>
        </main>

        <motion.section
          id="contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-8 scroll-mt-24 relative"
        >
          {targetSection === "contact" && <EasterOrb onClick={handleOpenEgg} />}
          <Suspense fallback={<LoadingFallback />}>
            <Footer />
          </Suspense>
        </motion.section>
      </div>

      <Suspense fallback={null}>
        <EasterEgg open={openEgg} setOpen={setOpenEgg} />
      </Suspense>
    </LazyMotion>
  );
}

export default App;
