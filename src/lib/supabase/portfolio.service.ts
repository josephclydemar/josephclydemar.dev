import { createClient } from '@/lib/supabase/auth-client';
import type { Database } from './database.types';
import type {
  PersonalInfo,
  SocialLink,
  Skill,
  Project,
  Experience,
  Education,
  Certification,
} from '@/types/portfolio.types';

// Create a typed Supabase client
const supabase = createClient();

/**
 * Portfolio Service - Functions to fetch portfolio data from Supabase
 */

// Get Portfolio Configuration (Personal Info)
export async function getPortfolioConfig() {
  const { data, error } = await supabase
    .from('portfolio_config')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching portfolio config:', error);
    return null;
  }

  return {
    id: data.id,
    profilePicture: data.profile_picture || undefined,
    greeting: data.greeting,
    position: data.position,
    aboutMe: data.about_me,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  } as PersonalInfo;
}

// Get Social Links
export async function getSocialLinks() {
  const { data, error } = await supabase
    .from('social_links')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching social links:', error);
    return [];
  }

  return data.map(link => ({
    id: link.id,
    name: link.name,
    icon: link.icon,
    url: link.url,
    order: link.order,
  })) as SocialLink[];
}

// Get All Skills
export async function getSkills() {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('order', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }

  return data as Skill[];
}

// Get Skills by Category
export async function getSkillsByCategory(category: string) {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('category', category)
    .order('order', { ascending: true });

  if (error) {
    console.error(`Error fetching ${category} skills:`, error);
    return [];
  }

  return data as Skill[];
}

// Get All Projects
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data.map(project => ({
    id: project.id,
    name: project.name,
    description: project.description,
    longDescription: project.long_description,
    thumbnail: project.thumbnail,
    images: project.images,
    technologies: project.technologies,
    githubUrl: project.github_url,
    liveUrl: project.live_url,
    features: project.features,
    status: project.status,
    startDate: project.start_date,
    endDate: project.end_date,
    isFeatured: project.is_featured,
    order: project.order,
  })) as Project[];
}

// Get Featured Projects Only
export async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_featured', true)
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }

  return data.map(project => ({
    id: project.id,
    name: project.name,
    description: project.description,
    longDescription: project.long_description,
    thumbnail: project.thumbnail,
    images: project.images,
    technologies: project.technologies,
    githubUrl: project.github_url,
    liveUrl: project.live_url,
    features: project.features,
    status: project.status,
    startDate: project.start_date,
    endDate: project.end_date,
    isFeatured: project.is_featured,
    order: project.order,
  })) as Project[];
}

// Get All Experiences
export async function getExperiences() {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('order', { ascending: true })
    .order('start_date', { ascending: false });

  if (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }

  return data.map(exp => ({
    id: exp.id,
    position: exp.position,
    company: exp.company,
    employmentType: exp.employment_type,
    location: exp.location,
    startDate: exp.start_date,
    endDate: exp.end_date,
    logo: exp.logo,
    description: exp.description,
    responsibilities: exp.responsibilities,
    achievements: exp.achievements,
    skills: exp.skills,
    order: exp.order,
  })) as Experience[];
}

// Get All Education
export async function getEducations() {
  const { data, error } = await supabase
    .from('educations')
    .select('*')
    .order('order', { ascending: true })
    .order('start_date', { ascending: false });

  if (error) {
    console.error('Error fetching educations:', error);
    return [];
  }

  return data.map(edu => ({
    id: edu.id,
    school: edu.school,
    degree: edu.degree,
    field: edu.field,
    startDate: edu.start_date,
    endDate: edu.end_date,
    logo: edu.logo,
    description: edu.description,
    courses: edu.courses || [],
    achievements: edu.achievements || [],
    gpa: edu.gpa,
    order: edu.order,
  })) as Education[];
}

// Get All Certifications
export async function getCertifications() {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('order', { ascending: true })
    .order('issue_date', { ascending: false });

  if (error) {
    console.error('Error fetching certifications:', error);
    return [];
  }

  return data.map(cert => ({
    id: cert.id,
    name: cert.name,
    issuer: cert.issuer,
    issueDate: cert.issue_date,
    expiryDate: cert.expiry_date,
    credentialId: cert.credential_id,
    credentialUrl: cert.credential_url,
    logo: cert.logo,
    description: cert.description,
    skills: cert.skills,
    validationDetails: cert.validation_details,
    order: cert.order,
  })) as Certification[];
}

// Get Complete Portfolio Data (all sections)
export async function getCompletePortfolioData() {
  const [personalInfo, socialLinks, skills, projects, experiences, educations, certifications] = await Promise.all([
    getPortfolioConfig(),
    getSocialLinks(),
    getSkills(),
    getProjects(),
    getExperiences(),
    getEducations(),
    getCertifications(),
  ]);

  return {
    personalInfo: personalInfo || null,
    socialLinks,
    skills,
    projects,
    experiences,
    educations,
    certifications,
  };
}
