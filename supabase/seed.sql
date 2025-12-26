-- Seed data for portfolio

-- Insert Portfolio Configuration
INSERT INTO portfolio_config (personal_info, social_links, about_me, is_active) VALUES (
  '{
    "greeting": "Hi, I am",
    "name": "Joseph Clyde",
    "position": "Full Stack Developer",
    "tagline": "Building amazing web experiences",
    "profileImage": "/images/profile.jpg",
    "resumeUrl": "/resume.pdf"
  }',
  '{
    "email": "joseph@example.com",
    "github": "https://github.com/josephclyde",
    "linkedin": "https://linkedin.com/in/josephclyde",
    "twitter": "https://twitter.com/josephclyde"
  }',
  '{
    "title": "About Me",
    "description": "I am a passionate full-stack developer with expertise in modern web technologies. I love building scalable applications and solving complex problems.",
    "highlights": ["5+ years of experience", "15+ projects completed", "Open source contributor"],
    "yearsOfExperience": 5,
    "location": "Philippines"
  }',
  true
);

-- Insert Skills
INSERT INTO skills (name, category, proficiency, "order") VALUES
  ('React', 'frontend', 'expert', 1),
  ('Next.js', 'frontend', 'expert', 2),
  ('TypeScript', 'frontend', 'advanced', 3),
  ('Tailwind CSS', 'frontend', 'expert', 4),
  ('Node.js', 'backend', 'advanced', 5),
  ('Express', 'backend', 'advanced', 6),
  ('PostgreSQL', 'database', 'advanced', 7),
  ('Supabase', 'database', 'advanced', 8),
  ('Docker', 'devops', 'intermediate', 9),
  ('Git', 'tools', 'expert', 10);

-- Insert Projects
INSERT INTO projects (name, description, long_description, thumbnail, images, technologies, github_url, live_url, features, status, is_featured, "order") VALUES
  (
    'E-Commerce Platform',
    'A full-featured e-commerce platform with payment integration',
    'Built a complete e-commerce solution with product management, shopping cart, payment processing, and order tracking. Implemented secure authentication and admin dashboard.',
    '/images/projects/ecommerce-thumb.jpg',
    ARRAY['/images/projects/ecommerce-1.jpg', '/images/projects/ecommerce-2.jpg', '/images/projects/ecommerce-3.jpg'],
    ARRAY['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    'https://github.com/username/ecommerce',
    'https://ecommerce-demo.vercel.app',
    ARRAY['Product catalog', 'Shopping cart', 'Payment integration', 'Order tracking', 'Admin dashboard'],
    'completed',
    true,
    1
  ),
  (
    'Task Management App',
    'Real-time collaborative task management application',
    'A powerful task management tool with real-time collaboration features, drag-and-drop interface, and team workspace management.',
    '/images/projects/taskapp-thumb.jpg',
    ARRAY['/images/projects/taskapp-1.jpg', '/images/projects/taskapp-2.jpg'],
    ARRAY['React', 'Node.js', 'Socket.io', 'MongoDB'],
    'https://github.com/username/taskapp',
    'https://taskapp-demo.vercel.app',
    ARRAY['Real-time updates', 'Drag and drop', 'Team collaboration', 'Task analytics'],
    'completed',
    true,
    2
  );

-- Insert Experiences
INSERT INTO experiences (position, company, employment_type, location, start_date, end_date, is_current_role, description, responsibilities, achievements, skills, "order") VALUES
  (
    'Senior Full Stack Developer',
    'Tech Company Inc.',
    'full-time',
    'Remote',
    'Jan 2022',
    NULL,
    true,
    'Leading the development of enterprise web applications and mentoring junior developers.',
    ARRAY[
      'Architect and develop scalable web applications',
      'Lead a team of 5 developers',
      'Conduct code reviews and ensure best practices',
      'Collaborate with product team on feature planning'
    ],
    ARRAY[
      'Reduced application load time by 60%',
      'Implemented CI/CD pipeline reducing deployment time by 80%',
      'Mentored 3 junior developers to mid-level positions'
    ],
    ARRAY['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
    1
  ),
  (
    'Full Stack Developer',
    'Startup XYZ',
    'full-time',
    'Manila, Philippines',
    'Jun 2020',
    'Dec 2021',
    false,
    'Developed and maintained multiple client-facing web applications.',
    ARRAY[
      'Built responsive web applications',
      'Integrated third-party APIs',
      'Optimized database queries',
      'Participated in agile development process'
    ],
    ARRAY[
      'Delivered 10+ projects on time',
      'Improved code test coverage to 85%',
      'Reduced bug reports by 40%'
    ],
    ARRAY['React', 'Express', 'MongoDB', 'Docker'],
    2
  );

-- Insert Education
INSERT INTO educations (school, degree, field, start_date, end_date, description, courses, achievements, gpa, "order") VALUES
  (
    'University of the Philippines',
    'Bachelor of Science',
    'Computer Science',
    '2016',
    '2020',
    'Completed comprehensive computer science program with focus on software engineering and web development.',
    ARRAY['Data Structures', 'Algorithms', 'Web Development', 'Database Systems', 'Software Engineering'],
    ARRAY['Dean''s List - 4 semesters', 'Best Capstone Project Award', 'Programming Competition - 2nd Place'],
    '3.8',
    1
  ),
  (
    'Online Learning Platform',
    'Full Stack Web Development Certificate',
    'Web Development',
    '2019',
    '2020',
    'Intensive bootcamp covering modern web development technologies and best practices.',
    ARRAY['React', 'Node.js', 'MongoDB', 'REST APIs', 'GraphQL'],
    ARRAY['Completed with Distinction', 'Built 5 full-stack projects'],
    NULL,
    2
  );

-- Insert Certifications
INSERT INTO certifications (name, issuer, issue_date, credential_id, credential_url, description, skills, validation_details, "order") VALUES
  (
    'AWS Certified Solutions Architect',
    'Amazon Web Services',
    'Jan 2023',
    'AWS-CERT-123456',
    'https://www.credly.com/badges/credential-id',
    'Validated expertise in designing distributed systems on AWS.',
    ARRAY['AWS', 'Cloud Architecture', 'System Design', 'DevOps'],
    'Credential can be verified at Credly',
    1
  ),
  (
    'Google Professional Cloud Developer',
    'Google Cloud',
    'Mar 2023',
    'GCP-DEV-789012',
    'https://www.credential.net/credential-id',
    'Demonstrated proficiency in building scalable applications on Google Cloud Platform.',
    ARRAY['GCP', 'Cloud Development', 'Kubernetes', 'CI/CD'],
    'Valid until March 2025',
    2
  ),
  (
    'Microsoft Azure Developer Associate',
    'Microsoft',
    'Jun 2023',
    'AZ-204-345678',
    'https://www.microsoft.com/credentials',
    'Certified in developing solutions using Azure services.',
    ARRAY['Azure', 'Cloud Services', 'API Development', 'Microservices'],
    'Certification valid for 2 years',
    3
  );
