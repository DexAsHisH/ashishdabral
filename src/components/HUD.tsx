import { Shield, Sword, Book, Users, Mail } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export function HUD() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isScrolling, setIsScrolling] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement | null>(null);
  

  const { scrollYProgress } = useScroll();
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);
  const navBlur = useTransform(scrollYProgress, [0, 0.1], [3, 8]);
  

  const navItems = [
    { id: 'profile', icon: Shield, label: 'Profile', color: 'blue' },
    { id: 'skills', icon: Sword, label: 'Skills', color: 'purple' },
    { id: 'quests', icon: Book, label: 'Quests', color: 'green' },
    { id: 'party', icon: Users, label: 'Party', color: 'yellow' },
    { id: 'blog', icon: Mail, label: 'Blogs', color: 'red' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsScrolling(true);
      setActiveSection(id);

      const navHeight = navRef.current ? navRef.current.offsetHeight : 0;

      const elementPosition = element.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      

      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };
  
 
  useEffect(() => {
    const handleScroll = () => {
     
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY.current + 10) {
          setIsCollapsed(true);
        } else if (currentScrollY < lastScrollY.current - 10) {
          setIsCollapsed(false);
        }
      } else {
        setIsCollapsed(false);
      }
      
      lastScrollY.current = currentScrollY;
      

      if (!isScrolling) {
  
        const navHeight = navRef.current ? navRef.current.offsetHeight : 0;
        

        const sectionElements = navItems.map(item => ({
          id: item.id,
          element: document.getElementById(item.id)
        })).filter(item => item.element);
        
  
        const currentSection = sectionElements.find(({ element }) => {
          if (!element) return false;
          
          const rect = element.getBoundingClientRect();
   
          return rect.top <= navHeight + 50 && rect.bottom >= navHeight + 50;
        });
        
        if (currentSection) {
          setActiveSection(currentSection.id);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling, navItems]);


  const colorMap: Record<string, { bg: string, text: string, shadow: string }> = {
    blue: { bg: 'bg-blue-400', text: 'text-blue-400', shadow: 'shadow-blue-400/50' },
    purple: { bg: 'bg-purple-400', text: 'text-purple-400', shadow: 'shadow-purple-400/50' },
    green: { bg: 'bg-green-400', text: 'text-green-400', shadow: 'shadow-green-400/50' },
    yellow: { bg: 'bg-yellow-400', text: 'text-yellow-400', shadow: 'shadow-yellow-400/50' },
    red: { bg: 'bg-red-400', text: 'text-red-400', shadow: 'shadow-red-400/50' }
  };

  return (
    <motion.nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 px-2 py-3 bg-black/50 z-50 w-full transition-all duration-300"
      style={{ 
        opacity: navOpacity,
        backdropFilter: `blur(${navBlur.get()}px)`,
        transform: isCollapsed ? 'translateY(-100%)' : 'translateY(0)'
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="max-w-auto mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
  
        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 sm:gap-6 w-full sm:w-auto px-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const color = colorMap[item.color] || colorMap.blue;
            
            return (
              <motion.button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative p-2 rounded-lg flex flex-col items-center justify-center transition-all duration-300 ${
                  isActive ? `shadow-md ${color.shadow}` : ''
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 mb-1 ${color.text} ${
                  isActive ? 'animate-pulse' : ''
                }`} />
                
                <span className={`text-xs sm:text-sm font-medium ${color.text}`}>
                  {item.label}
                </span>
                

                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      className={`absolute -bottom-1 left-1/4 right-1/4 h-0.5 ${color.bg}`}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

 
        <div className="flex items-center gap-4 w-full sm:w-auto px-2 bg-black/30 rounded-lg p-2">
          <motion.div 
            className="text-blue-400 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-xs font-medium uppercase tracking-wider">LEVEL</div>
            <div className="text-lg sm:text-xl font-bold animate-pulse text-blue-400">99</div>
          </motion.div>
          
          <div className="w-full max-w-xs sm:w-36">

            <motion.div 
              className="h-2 w-full bg-blue-900/50 rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >

              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full shadow-md shadow-blue-400/50"
                initial={{ width: "0%" }}
                animate={{ width: "75%" }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeOut",
                  delay: 0.2
                }}
              />
            </motion.div>
            
            <motion.div 
              className="text-xs text-blue-400 text-center mt-1 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              75,000 / 100,000 XP
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}