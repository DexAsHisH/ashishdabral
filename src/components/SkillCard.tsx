import { motion } from "framer-motion";
import type { Skill } from "../types";

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const xpPercent = (skill.xp / skill.maxXp) * 100;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative p-4 px-6 rounded-2xl border border-white/10 backdrop-blur-sm bg-black/5 transition-all duration-300 w-[180px] sm:w-[200px]"
    >
  
      <div className="flex items-center gap-1 text-gray-100 text-md truncate">
        <span className="text-md">{skill.icon}</span>
        {skill.name}
      </div>
      

      <div className="text-xs text-white/40">Lvl {skill.level}</div>

  
      <div className="mt-3">
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-purple-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${xpPercent}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <p className="text-xs text-white/30 mt-2 text-right">
          {skill.xp.toLocaleString()} XP
        </p>
      </div>
    </motion.div>
  );
}
