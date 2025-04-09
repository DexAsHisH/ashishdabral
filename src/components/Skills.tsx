import { SkillCard } from "./SkillCard";

const SKILLS = [
  { name: "React", level: 85, xp: 8500, maxXp: 10000, icon: "⚛️" },
  { name: "TypeScript", level: 80, xp: 8000, maxXp: 10000, icon: "📘" },
  { name: "PostgreSQL", level: 80, xp: 8000, maxXp: 10000, icon: "🐘" },
  { name: "Node.js", level: 75, xp: 7500, maxXp: 10000, icon: "🟢" },
  { name: "Python", level: 82, xp: 8200, maxXp: 10000, icon: "🐍" },
  { name: "AWS", level: 70, xp: 7000, maxXp: 10000, icon: "☁️" },
  { name: "Docker", level: 78, xp: 7800, maxXp: 10000, icon: "🐳" },
];

export default function Skills() {
  const infiniteSkills = [...SKILLS, ...SKILLS]; 

  return (
    <div
      id="skills"
      className="relative w-full overflow-hidden py-6 sm:py-8 [mask-image:linear-gradient(to_right,transparent_0%,white_10%,white_90%,transparent_100%)]"
    >
      <div className="w-max flex animate-infinite-scroll gap-4 sm:gap-6">
        {infiniteSkills.map((skill, index) => (
          <SkillCard key={`${skill.name}-${index}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}
