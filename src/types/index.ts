export interface Profile {
  name: string;
  title: string;
  subtitles: string[];
  bio: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  twitter?: string;
  resume: string;
  avatar: string;
  stats: {
    yearsOfExperience: number;
    projectsCompleted: number;
    testsAutomated: string;
    companiesWorked: number;
  };
  aboutText: string;
  availability: string;
}

export interface ExperienceInitiative {
  name: string;
  description: string;
}

export interface ExperienceAward {
  name: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  clientNote?: string;
  logo?: string;
  role: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  initiatives?: ExperienceInitiative[];
  awards?: ExperienceAward[];
}

export interface Education {
  id: string;
  degree: string;
  status?: string;
  institution: string;
  shortInstitution: string;
  duration: string;
  location: string;
  relevantAreas: string[];
  color: string;
}

export interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  technologies: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  category: string;
  stars?: number;
  forks?: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuerLogo?: string;
  date: string;
  expiryDate?: string;
  status?: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  skills: string[];
  color: string;
}

export interface AutomationItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

export interface AITool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  useCases: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
