// Portfolio Data Types

export type SocialIconType = 
  | 'github'
  | 'linkedin'
  | 'twitter'
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'discord'
  | 'email'
  | 'website'
  | 'medium'
  | 'dev'
  | 'stackoverflow'
  | 'behance'
  | 'dribbble'
  | 'figma'
  | 'tiktok'
  | 'twitch'
  | 'reddit';

export interface SocialLink {
  id?: string;
  name: string;
  icon: SocialIconType;
  url: string;
  order?: number;
}

export interface PersonalInfo {
  id?: string;
  profilePicture?: string;
  greeting: string;
  position: string;
  aboutMe: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'other';
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon?: string;
  order?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  images: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  features?: string[];
  status?: 'completed' | 'in-progress' | 'planned';
  startDate?: string;
  endDate?: string;
  isFeatured?: boolean;
  order?: number;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  location: string;
  startDate: string;
  endDate?: string;
  isCurrentRole?: boolean;
  logo?: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  skills: string[];
  order?: number;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  logo?: string;
  description?: string;
  courses?: string[];
  achievements?: string[];
  gpa?: string;
  order?: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  logo?: string;
  description: string;
  skills: string[];
  validationDetails?: string;
  order?: number;
}

export interface PortfolioData {
  id?: string;
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Supabase Database Types
export interface Database {
  public: {
    Tables: {
      portfolio_config: {
        Row: {
          id: string;
          profile_picture: string | null;
          greeting: string;
          position: string;
          about_me: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['portfolio_config']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['portfolio_config']['Insert']>;
      };
      social_links: {
        Row: {
          id: string;
          name: string;
          icon: SocialIconType;
          url: string;
          order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['social_links']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['social_links']['Insert']>;
      };
      skills: {
        Row: Skill & {
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Skill, 'id'>;
        Update: Partial<Skill>;
      };
      projects: {
        Row: Project & {
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Project, 'id'>;
        Update: Partial<Project>;
      };
      experiences: {
        Row: Experience & {
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Experience, 'id'>;
        Update: Partial<Experience>;
      };
      educations: {
        Row: Education & {
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Education, 'id'>;
        Update: Partial<Education>;
      };
      certifications: {
        Row: Certification & {
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Certification, 'id'>;
        Update: Partial<Certification>;
      };
    };
  };
}
