import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export default function Achievements() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [showToast, setShowToast] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const achievements = [
    {
      title: "AWS Cloud Quest: Practitioner",
      icon: "🏆",
      description: "Cloud computing fundamentals and AWS services",
      details: "Demonstrated proficiency in core AWS services including EC2, S3, IAM, and CloudWatch."
    },
    {
      title: "MTA: Introduction to Programming Using Python",
      icon: "🐍",
      description: "Microsoft certification for Python programming",
      details: "Mastered fundamental Python concepts like data structures, functions, classes, and file operations."
    },
    {
      title: "CompTIA Network+ (N10-009)",
      icon: "🌐",
      description: "Networking concepts, infrastructure, and troubleshooting",
      details: "Acquired expertise in network configurations, security principles, and troubleshooting methodologies."
    },
    {
      title: "Fundamentals of Backend Engineering",
      icon: "⚙️",
      description: "Server-side development and API design",
      details: "Built robust RESTful APIs, implemented authentication systems, and optimized database operations."
    },
    {
      title: "Fundamentals of Network Engineering",
      icon: "🔌",
      description: "Network architecture and protocols",
      details: "Designed network topologies and implemented routing protocols for efficient data transmission."
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  useEffect(() => {
    if (inView) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <section ref={ref} id="achievements" className=" relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.2 } 
              }}
              className="bg-black/20 p-6 rounded-xl backdrop-blur-sm transition-all border border-gray-700/50 cursor-pointer hover:bg-black/30"
              onClick={() => setSelectedAchievement(achievement)}
            >
              <div className="w-12 h-12 bg-black/40 rounded-lg flex items-center justify-center mb-4 border border-[#bb4d22]/30">
                <span className="text-2xl">{achievement.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-[#ff6629] mb-3">
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-300">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Toast Notification */}
      <AnimatedToast show={showToast} />

      {/* Achievement Details Modal */}
      <AnimatedModal 
        isOpen={selectedAchievement !== null} 
        onClose={() => setSelectedAchievement(null)}
        achievement={selectedAchievement}
      />
    </section>
  );
}

// Toast component
const AnimatedToast = ({ show }: { show: boolean }) => {
  if (!show) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 right-6 bg-black/40 text-gray-200 px-6 py-3 rounded-lg shadow-lg z-50 backdrop-blur-md border border-gray-700/50"
    >
      <div className="flex items-center">
        <span className="mr-2">✨</span>
        <span>Achievements unlocked!</span>
      </div>
    </motion.div>
  );
};

// Modal component for achievement details
interface Achievement {
  title: string;
  icon: string;
  description: string;
  details: string;
}

const AnimatedModal = ({ isOpen, onClose, achievement }: { isOpen: boolean; onClose: () => void; achievement: Achievement | null }) => {
  if (!isOpen || !achievement) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-black/80 border border-gray-700/50 rounded-xl p-6 max-w-md w-full backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{achievement.icon}</span>
            <h3 className="text-xl font-bold text-[#bb4d22]">{achievement.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>
        
        <p className="text-gray-300 mb-4">{achievement.description}</p>
        <div className="border-t border-gray-700/50 pt-4 mt-4">
          <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Key Skills</h4>
          <p className="text-gray-300">{achievement.details}</p>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-[#bb4d22]/80 hover:bg-[#bb4d22] text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};