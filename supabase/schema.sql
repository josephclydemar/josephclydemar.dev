-- Portfolio Configuration Table
CREATE TABLE IF NOT EXISTS portfolio_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_picture TEXT,
  greeting VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  about_me TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social Links Table
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50) NOT NULL CHECK (icon IN (
    'github', 'linkedin', 'twitter', 'facebook', 'instagram', 'youtube',
    'discord', 'email', 'website', 'medium', 'dev', 'stackoverflow',
    'behance', 'dribbble', 'figma', 'tiktok', 'twitch', 'reddit'
  )),
  url TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('frontend', 'backend', 'database', 'devops', 'tools', 'other')),
  proficiency VARCHAR(50) CHECK (proficiency IN ('beginner', 'intermediate', 'advanced', 'expert')),
  icon TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  thumbnail TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  technologies TEXT[] NOT NULL,
  github_url TEXT,
  live_url TEXT,
  features TEXT[],
  status VARCHAR(50) CHECK (status IN ('completed', 'in-progress', 'planned')),
  start_date VARCHAR(50),
  end_date VARCHAR(50),
  is_featured BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  position VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  employment_type VARCHAR(50) DEFAULT 'Full-time' CHECK (employment_type IN ('Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship')),
  location VARCHAR(255),
  start_date VARCHAR(50) NOT NULL,
  end_date VARCHAR(50),
  logo TEXT,
  description TEXT,
  responsibilities TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Educations Table
CREATE TABLE IF NOT EXISTS educations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school VARCHAR(255) NOT NULL,
  degree VARCHAR(255) NOT NULL,
  field VARCHAR(255) NOT NULL,
  start_date VARCHAR(50) NOT NULL,
  end_date VARCHAR(50),
  logo TEXT,
  description TEXT,
  courses TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  gpa VARCHAR(10),
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  issuer VARCHAR(255) NOT NULL,
  issue_date VARCHAR(50) NOT NULL,
  expiry_date VARCHAR(50),
  credential_id VARCHAR(255),
  credential_url TEXT,
  logo TEXT,
  description TEXT NOT NULL,
  skills TEXT[] NOT NULL,
  validation_details TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at columns
CREATE TRIGGER update_portfolio_config_updated_at BEFORE UPDATE ON portfolio_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at BEFORE UPDATE ON social_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_educations_updated_at BEFORE UPDATE ON educations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE portfolio_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON portfolio_config FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON social_links FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON skills FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON projects FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON experiences FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON educations FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON certifications FOR SELECT USING (true);

-- Create policies for authenticated users (admin)
-- You can modify these based on your auth setup
CREATE POLICY "Enable all access for authenticated users" ON portfolio_config FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Enable all access for authenticated users" ON social_links FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Enable all access for authenticated users" ON skills FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Enable all access for authenticated users" ON projects FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Enable all access for authenticated users" ON experiences FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Enable all access for authenticated users" ON educations FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Enable all access for authenticated users" ON certifications FOR ALL USING (auth.uid() IS NOT NULL);
