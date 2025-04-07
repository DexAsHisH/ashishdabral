export interface Skill {
  name: string;
  level: number;
  xp: number;
  maxXp: number;
  icon: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  status: 'completed' | 'in-progress';
  link: string;
  image: string;
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
  icon: string;
}