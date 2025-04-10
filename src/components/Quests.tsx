import { HoverEffect } from "./ui/card-hover-effect";
import { motion } from "framer-motion";

type Level = "Epic" | "Rare" | "Uncommon" | "Common";

const content: {
  title: string;
  href: string;
  description: string;
  xp: number;
  level: Level;
  techStack: string[];
}[] = [
  {
    title: "Hitesh sir's persona Chat Bot",
    href: "https://hitesh-sir-s-bot.streamlit.app/",
    description:
      "A hitesh-(ChaiaurCode) sir's persona Bot, Where you can directly chat to him and get replies without any premium 😁.",
    xp: 1200,
    level: "Epic",
    techStack: ["LLM", "Gemini", "Python", "Streamlit","Prompting"],
  },
  {
    title: "Thoughtify",
    href: "https://thoughtify-eight.vercel.app/",
    description:
      "A full-stack X-like social media application using Next.js, Firebase, and Vercel, where users can post thoughts and interact with likes and comments.",
    xp: 1200,
    level: "Epic",
    techStack: ["Next.js", "Firebase", "Tailwind", "Vercel"],
  },
  {
    title: "Attendance Management System Using QR",
    href: "https://github.com/DexAsHisH/SmartAppBackend",
    description:
      "A web-based Attendance Management System utilizing QR code technology, reducing administrative tracking time and comprehensively eliminating proxy attendance risks.",
    xp: 900,
    level: "Rare",
    techStack: ["Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    title: "Messenger",
    href: "https://github.com/DexAsHisH/messenger",
    description:
      "A chat application using WebSocket for real-time communication between users.",
    xp: 1100,
    level: "Epic",
    techStack: ["Socket.io", "Node.js", "MongoDB", "React"],
  },
  {
    title: "Sentify",
    href: "https://github.com/DexAsHisH/Sentify-app",
    description:
      "Sentify is a web application that performs sentiment analysis on text input, determining whether the given text has a positive, negative, or neutral sentiment using natural language processing techniques.",
    xp: 750,
    level: "Uncommon",
    techStack: ["React", "API", "Express", "Tailwind"],
  },
];

const badgeColors = {
  Epic: "from-purple-500 to-indigo-500",
  Rare: "from-blue-500 to-cyan-500",
  Uncommon: "from-green-500 to-emerald-500",
  Common: "from-gray-500 to-gray-700",
};

const techBgColors = {
  Epic: "bg-purple-700/20 text-purple-300",
  Rare: "bg-blue-700/20 text-blue-300",
  Uncommon: "bg-green-700/20 text-green-300",
  Common: "bg-gray-700/20 text-gray-300",
};

export default function Quests() {
  const projects = content.map((project) => ({
    title: project.title,
    description: (
      <>
        <p>{project.description}</p>


        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-sm font-medium ${techBgColors[project.level]}`}
            >
              {tech}
            </span>
          ))}
        </div>

 
        <div className="mt-4 flex items-center justify-between">
          <motion.span
            className={`text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r ${badgeColors[project.level]} text-white shadow-lg`}
            initial={{ scale: 1 }}
            animate={{
              scale: project.level === "Epic" || project.level === "Rare" ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {project.level}
          </motion.span>

          <span className="text-xs text-yellow-400 font-mono">+{project.xp} XP</span>
        </div>
      </>
    ),
    link: project.href,
  }));

  return (
    <div className="">
      <HoverEffect items={projects} />
    </div>
  );
}
