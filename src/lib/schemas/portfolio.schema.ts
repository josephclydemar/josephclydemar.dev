import { z } from 'zod';

// Personal Info Schema
export const personalInfoSchema = z.object({
  greeting: z.string().min(1, 'Greeting is required'),
  name: z.string().min(1, 'Name is required'),
  position: z.string().min(1, 'Position is required'),
  tagline: z.string().optional(),
  profileImage: z.string().url().optional().or(z.literal('')),
  resumeUrl: z.string().url().optional().or(z.literal('')),
});

// Social Links Schema
export const socialLinksSchema = z.object({
  email: z.string().email().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
  instagram: z.string().url().optional().or(z.literal('')),
  facebook: z.string().url().optional().or(z.literal('')),
  discord: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
});

// About Me Schema
export const aboutMeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  highlights: z.array(z.string()).optional(),
  yearsOfExperience: z.number().min(0).optional(),
  location: z.string().optional(),
});

// Skill Schema
export const skillSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Skill name is required'),
  category: z.enum(['frontend', 'backend', 'database', 'devops', 'tools', 'other']),
  proficiency: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
  icon: z.string().optional(),
  order: z.number().optional(),
});

// Project Schema
export const projectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  longDescription: z.string().optional(),
  thumbnail: z.string().url('Invalid thumbnail URL'),
  images: z.array(z.string().url()).default([]),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  githubUrl: z.string().url().optional().or(z.literal('')),
  liveUrl: z.string().url().optional().or(z.literal('')),
  features: z.array(z.string()).optional(),
  status: z.enum(['completed', 'in-progress', 'planned']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isFeatured: z.boolean().optional(),
  order: z.number().optional(),
});

// Experience Schema
export const experienceSchema = z.object({
  id: z.string().optional(),
  position: z.string().min(1, 'Position is required'),
  company: z.string().min(1, 'Company is required'),
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'freelance', 'internship']),
  location: z.string().min(1, 'Location is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isCurrentRole: z.boolean().optional(),
  logo: z.string().url().optional().or(z.literal('')),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  responsibilities: z.array(z.string()).min(1, 'At least one responsibility is required'),
  achievements: z.array(z.string()).default([]),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  order: z.number().optional(),
});

// Education Schema
export const educationSchema = z.object({
  id: z.string().optional(),
  school: z.string().min(1, 'School name is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().min(1, 'Field of study is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isCurrentlyEnrolled: z.boolean().optional(),
  logo: z.string().url().optional().or(z.literal('')),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  courses: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  gpa: z.string().optional(),
  order: z.number().optional(),
});

// Certification Schema
export const certificationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Certification name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url().optional().or(z.literal('')),
  logo: z.string().url().optional().or(z.literal('')),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  validationDetails: z.string().optional(),
  order: z.number().optional(),
});

// Complete Portfolio Schema
export const portfolioSchema = z.object({
  id: z.string().optional(),
  personalInfo: personalInfoSchema,
  socialLinks: socialLinksSchema,
  aboutMe: aboutMeSchema,
  skills: z.array(skillSchema).default([]),
  projects: z.array(projectSchema).default([]),
  experiences: z.array(experienceSchema).default([]),
  educations: z.array(educationSchema).default([]),
  certifications: z.array(certificationSchema).default([]),
  isActive: z.boolean().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Export types inferred from schemas
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type SocialLinks = z.infer<typeof socialLinksSchema>;
export type AboutMe = z.infer<typeof aboutMeSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type PortfolioData = z.infer<typeof portfolioSchema>;
