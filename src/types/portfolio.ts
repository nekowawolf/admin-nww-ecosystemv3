export interface Portfolio {
  _id?: string;
  hero: HeroProfile;
  certificates: Certificate[];
  designs: Design[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  skills: Skills;
}

export interface HeroProfile {
  name: string;
  summary: string;
  avatar_url: string;
  cv_url: string;
  github: string;
  twitter: string;
  linkedin: string;
  email: string;
}

export interface Certificate {
  id: string;
  title: string;
  image_url: string;
}

export interface Design {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
  video_url?: string;
  category: string;
  tools?: string[];
  screenshots?: string[];
  ss_desc?: string;
  color_palette?: VisualAsset;
  typography?: VisualAsset;
}

export interface Screenshot {
  image_url: string;
  description?: string;
}

export interface DiagramItem {
  image_url: string;
  description: string;
}

export interface VisualAsset {
  image_url: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
  github_url?: string;
  screenshots?: string[];
  ss_desc?: string;
  video_url?: string;
  use_case?: DiagramItem;
  activity?: DiagramItem;
  erd?: DiagramItem;
  flowchart?: DiagramItem;
  stack?: string[];
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  subjects: string[];
  start_year: number;
  end_year: number;
}

export interface Education {
  id: string;
  title: string;
  description: string;
  subjects: string[];
  start_year: number;
  end_year: number;
}

export interface Skills {
  tech: SkillItem[];
  design: SkillItem[];
}

export interface SkillItem {
  id: string;
  name: string;
  icon_url: string;
}