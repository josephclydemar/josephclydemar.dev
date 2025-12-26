"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useState, useEffect, useMemo } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Facebook, Github, Code2, Palette, Zap, Rocket, MapPin, Calendar, ExternalLink } from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BentoCard } from "@/components/ui/bento-grid";
import { IconCloud } from "@/components/ui/icon-cloud";
import { ProjectDrawer, type Project } from "@/components/features/projects/ProjectDrawer";
import { ExperienceDrawer, type Experience } from "@/components/features/experience/ExperienceDrawer";
import { EducationDrawer, type Education } from "@/components/features/education/EducationDrawer";
import { CertificationDrawer, type Certification } from "@/components/features/certifications/CertificationDrawer";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Project data
const projects: Project[] = [
  {
    id: "1",
    name: "Project One",
    description: "A description of your amazing project goes here.",
    longDescription: "This is a comprehensive full-stack application built with modern web technologies. It demonstrates advanced features including real-time updates, authentication, and responsive design. The project was built to solve real-world problems and has been used by hundreds of users.",
    thumbnail: "/images/project1.jpg",
    images: [
      "/images/project1.jpg",
      "/images/project1-2.jpg",
      "/images/project1-3.jpg"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    githubUrl: "https://github.com/yourusername/project-one",
    liveUrl: "https://project-one.demo.com",
    features: [
      "Real-time data synchronization",
      "User authentication and authorization",
      "Responsive design for all devices",
      "Advanced search and filtering",
      "Performance optimized with caching"
    ]
  },
  {
    id: "2",
    name: "Project Two",
    description: "Another exciting project with innovative features.",
    longDescription: "An innovative solution that combines AI and modern web development to create a unique user experience. This project showcases cutting-edge technologies and best practices in software development.",
    thumbnail: "/images/project2.jpg",
    images: [
      "/images/project2.jpg",
      "/images/project2-2.jpg",
      "/images/project2-3.jpg"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    githubUrl: "https://github.com/yourusername/project-two",
    liveUrl: "https://project-two.demo.com",
    features: [
      "Real-time chat functionality",
      "AI-powered recommendations",
      "Collaborative workspace",
      "File upload and management",
      "Analytics dashboard"
    ]
  },
  {
    id: "3",
    name: "Project Three",
    description: "A third incredible project showcasing your skills.",
    longDescription: "A mobile-first progressive web application that delivers native-like experience on all platforms. Built with performance and user experience as top priorities.",
    thumbnail: "/images/project3.jpg",
    images: [
      "/images/project3.jpg",
      "/images/project3-2.jpg",
      "/images/project3-3.jpg"
    ],
    technologies: ["React Native", "Expo", "Firebase", "Redux", "TypeScript"],
    githubUrl: "https://github.com/yourusername/project-three",
    features: [
      "Cross-platform mobile application",
      "Offline functionality",
      "Push notifications",
      "Geolocation services",
      "Social media integration"
    ]
  },
  {
    id: "4",
    name: "Project Four",
    description: "Another amazing project demonstrating your expertise.",
    longDescription: "A powerful e-commerce platform with advanced features for both customers and administrators. Includes payment processing, inventory management, and detailed analytics.",
    thumbnail: "/images/project4.jpg",
    images: [
      "/images/project4.jpg",
      "/images/project4-2.jpg",
      "/images/project4-3.jpg"
    ],
    technologies: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/project-four",
    liveUrl: "https://project-four.demo.com",
    features: [
      "Secure payment processing",
      "Inventory management system",
      "Order tracking",
      "Customer reviews and ratings",
      "Admin dashboard with analytics"
    ]
  }
];

// Experience data
const experiences: Experience[] = [
  {
    id: "1",
    position: "Senior Full Stack Developer",
    company: "Tech Company Inc.",
    employmentType: "Full-time",
    location: "Remote",
    startDate: "Jan 2023",
    endDate: "Present",
    logo: "/images/company1.jpg",
    description: "Led the development of multiple high-impact web applications serving thousands of users. Collaborated with cross-functional teams to deliver scalable solutions using modern technologies.",
    responsibilities: [
      "Architected and developed full-stack applications using React, Next.js, and Node.js",
      "Led a team of 5 developers in implementing new features and maintaining existing codebase",
      "Implemented CI/CD pipelines and automated testing strategies",
      "Conducted code reviews and mentored junior developers",
      "Collaborated with product managers and designers to define technical requirements"
    ],
    achievements: [
      "Reduced application load time by 40% through optimization techniques",
      "Successfully migrated legacy systems to modern tech stack",
      "Implemented automated deployment pipeline reducing release time by 60%"
    ],
    skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker", "CI/CD"]
  },
  {
    id: "2",
    position: "Frontend Developer",
    company: "Startup XYZ",
    employmentType: "Internship",
    location: "San Francisco, CA",
    startDate: "Jun 2022",
    endDate: "Dec 2022",
    logo: "/images/company2.jpg",
    description: "Developed and maintained responsive web applications as part of an agile development team. Gained hands-on experience with modern frontend frameworks and best practices.",
    responsibilities: [
      "Built responsive UI components using React and Tailwind CSS",
      "Integrated RESTful APIs and managed application state",
      "Participated in daily standups and sprint planning meetings",
      "Fixed bugs and implemented feature requests",
      "Wrote unit and integration tests for frontend components"
    ],
    achievements: [
      "Developed a component library used across multiple projects",
      "Improved mobile responsiveness across the platform",
      "Reduced bundle size by 25% through code splitting"
    ],
    skills: ["React", "JavaScript", "Tailwind CSS", "Git", "REST APIs", "Jest"]
  },
  {
    id: "3",
    position: "Junior Developer",
    company: "Previous Company",
    employmentType: "Part-time",
    location: "New York, NY",
    startDate: "Jan 2021",
    endDate: "May 2022",
    logo: "/images/company3.jpg",
    description: "Started my professional journey as a junior developer, learning software development fundamentals and contributing to various projects.",
    responsibilities: [
      "Assisted in developing web applications using HTML, CSS, and JavaScript",
      "Fixed bugs and implemented minor features under supervision",
      "Participated in code reviews and learned best practices",
      "Documented code and maintained project documentation"
    ],
    achievements: [
      "Successfully completed first production feature deployment",
      "Received positive feedback from senior developers for code quality"
    ],
    skills: ["HTML", "CSS", "JavaScript", "jQuery", "PHP", "MySQL"]
  }
];

// Education data
const educations: Education[] = [
  {
    id: "1",
    school: "University Name",
    degree: "Bachelor of Science",
    field: "Computer Science",
    startDate: "2018",
    endDate: "2022",
    logo: "/images/school1.jpg",
    description: "Comprehensive computer science program covering software engineering, algorithms, data structures, and system design. Participated in various coding competitions and hackathons.",
    courses: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Software Engineering",
      "Web Development",
      "Operating Systems",
      "Computer Networks",
      "Machine Learning",
      "Cloud Computing"
    ],
    achievements: [
      "Dean's List for 6 consecutive semesters",
      "President of Computer Science Club",
      "Won 1st place in University Hackathon 2021",
      "Published research paper on web optimization techniques"
    ],
    gpa: "3.8/4.0"
  },
  {
    id: "2",
    school: "High School Name",
    degree: "High School Diploma",
    field: "STEM Track",
    startDate: "2014",
    endDate: "2018",
    logo: "/images/school2.jpg",
    description: "Focused on STEM curriculum with emphasis on mathematics, physics, and computer science fundamentals.",
    courses: [
      "Advanced Mathematics",
      "Physics",
      "Introduction to Programming",
      "Computer Applications"
    ],
    achievements: [
      "Honor Roll student",
      "Member of Robotics Club",
      "Participated in Science Olympiad"
    ]
  },
  {
    id: "3",
    school: "Online Learning Platform",
    degree: "Certificate Program",
    field: "Full Stack Development",
    startDate: "2022",
    endDate: "2023",
    logo: "/images/school3.jpg",
    description: "Intensive online program covering modern web development technologies and frameworks with hands-on projects.",
    courses: [
      "Advanced React",
      "Node.js & Express",
      "MongoDB",
      "TypeScript",
      "GraphQL",
      "System Design"
    ],
    achievements: [
      "Completed 10+ real-world projects",
      "Graduated with Distinction",
      "Built and deployed a full-stack e-commerce application"
    ]
  }
];

// Certifications data
const certifications: Certification[] = [
  {
    id: "1",
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    issueDate: "Jan 2023",
    expiryDate: "Jan 2026",
    credentialId: "AWS-CSA-123456",
    credentialUrl: "https://www.credly.com/badges/credential-id",
    logo: "/images/cert1.jpg",
    description: "Validates expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS. Demonstrates proficiency in AWS services, architecture best practices, and cloud security.",
    skills: [
      "AWS Services",
      "Cloud Architecture",
      "Security & Compliance",
      "Cost Optimization",
      "High Availability",
      "Disaster Recovery"
    ],
    validationDetails: "This certification validates the ability to design distributed systems and applications on AWS, implement cost-control strategies, and select appropriate AWS services based on requirements."
  },
  {
    id: "2",
    name: "Google Professional Cloud Developer",
    issuer: "Google Cloud",
    issueDate: "Mar 2023",
    expiryDate: "Mar 2025",
    credentialId: "GCP-PCD-789012",
    credentialUrl: "https://www.credential.net/credential-id",
    logo: "/images/cert2.jpg",
    description: "Demonstrates proficiency in building scalable and highly available applications using Google Cloud Platform. Covers application development, deployment, monitoring, and management.",
    skills: [
      "Google Cloud Platform",
      "Cloud Functions",
      "App Engine",
      "Kubernetes Engine",
      "Cloud Storage",
      "Monitoring & Logging"
    ],
    validationDetails: "This certification verifies skills in designing, building, and deploying applications that leverage Google Cloud services, implementing best practices for scalability and reliability."
  },
  {
    id: "3",
    name: "Microsoft Azure Developer Associate",
    issuer: "Microsoft",
    issueDate: "Jun 2023",
    credentialId: "MS-AZ-345678",
    credentialUrl: "https://www.microsoft.com/credentials",
    logo: "/images/cert3.jpg",
    description: "Validates ability to design, build, test, and maintain cloud applications and services on Microsoft Azure. Covers Azure compute, storage, security, and monitoring solutions.",
    skills: [
      "Azure Services",
      "Azure Functions",
      "Azure App Service",
      "Azure Storage",
      "Security & Identity",
      "Monitoring & Diagnostics"
    ],
    validationDetails: "This certification demonstrates expertise in developing cloud solutions on Azure, implementing security, and optimizing performance and scalability."
  }
];

export default function HomePage() {
  const router = useRouter();
  const [displayedText, setDisplayedText] = useState("");
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [experienceDrawerOpen, setExperienceDrawerOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(null);
  const [educationDrawerOpen, setEducationDrawerOpen] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [certificationDrawerOpen, setCertificationDrawerOpen] = useState(false);
  const fullText = "Hi! I'm Joseph Clyde Mar";
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 20);

    return () => clearInterval(typingInterval);
  }, []);

  const iconCloudComponent = useMemo(() => (
    <div className="absolute top-0 right-4 z-20 w-64 h-64 hidden lg:block">
      <IconCloud
        images={[
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        ]}
      />
    </div>
  ), []);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-[#100C08]">
      <DotPattern 
        className="opacity-30 dark:opacity-20" 
        width={20} 
        height={20} 
        cx={1} 
        cy={1} 
        cr={1}
      />
      <ThemeToggle />
      
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-center py-16 px-8 bg-transparent dark:bg-transparent relative z-10">
        {/* Icon Cloud in upper right */}
        {iconCloudComponent}
        
        {/* Header */}
        <header className="w-full mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src="/images/profile.jpg"
                alt="Joseph Clyde Mar"
                className="w-48 h-48 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
              />
            </div>
            
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 min-h-[3.5rem]">
                {displayedText}
                <span className="animate-pulse ml-1">|</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                Full Stack Developer & Creative Designer
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3 justify-center md:justify-start flex-wrap">
                <a
                  href="mailto:your.email@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <Badge variant="secondary" className="px-3 py-2 text-sm cursor-pointer">
                    <Mail className="w-4 h-4 mr-2" />
                    <AnimatedShinyText className="text-foreground">Gmail</AnimatedShinyText>
                  </Badge>
                </a>
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <Badge variant="secondary" className="px-3 py-2 text-sm cursor-pointer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    <AnimatedShinyText className="text-foreground">LinkedIn</AnimatedShinyText>
                  </Badge>
                </a>
                <a
                  href="https://facebook.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <Badge variant="secondary" className="px-3 py-2 text-sm cursor-pointer">
                    <Facebook className="w-4 h-4 mr-2" />
                    <AnimatedShinyText className="text-foreground">Facebook</AnimatedShinyText>
                  </Badge>
                </a>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <Badge variant="secondary" className="px-3 py-2 text-sm cursor-pointer">
                    <Github className="w-4 h-4 mr-2" />
                    <AnimatedShinyText className="text-foreground">GitHub</AnimatedShinyText>
                  </Badge>
                </a>
              </div>
            </div>
          </div>
        </header>
      

        {/* About Section */}
        <section className="w-full mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            About Me
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            I'm a passionate developer with expertise in modern web technologies. 
            I create beautiful, functional, and user-friendly applications that solve real-world problems.
          </p>
        </section>

        {/* Skills Section */}
        <section className="w-full mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Skills
          </h2>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Badge 
              variant="secondary" 
              className="px-4 py-2 text-base cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95 relative overflow-hidden group"
            >
              <span className="relative z-10">React</span>
              <span className="absolute inset-0 bg-white/30 dark:bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></span>
            </Badge>
            <Badge 
              variant="secondary" 
              className="px-4 py-2 text-base cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95 relative overflow-hidden group"
            >
              <span className="relative z-10">Next.js</span>
              <span className="absolute inset-0 bg-white/30 dark:bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></span>
            </Badge>
            <Badge 
              variant="secondary" 
              className="px-4 py-2 text-base cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95 relative overflow-hidden group"
            >
              <span className="relative z-10">TypeScript</span>
              <span className="absolute inset-0 bg-white/30 dark:bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></span>
            </Badge>
            <Badge 
              variant="secondary" 
              className="px-4 py-2 text-base cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95 relative overflow-hidden group"
            >
              <span className="relative z-10">Tailwind CSS</span>
              <span className="absolute inset-0 bg-white/30 dark:bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></span>
            </Badge>
          </div>
        </section>

        {/* Projects Section */}
        <section className="w-full mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Featured Projects
          </h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projects.map((project) => (
                <CarouselItem key={project.id} className="pl-2 md:pl-4 md:basis-1/3">
                  <div
                    onClick={() => {
                      setSelectedProject(project);
                      setDrawerOpen(true);
                    }}
                    className="cursor-pointer"
                  >
                    <BentoCard
                      name={project.name}
                      className="col-span-3 h-[20rem]"
                      background={
                        <img 
                          src={project.thumbnail} 
                          alt={project.name}
                          className="absolute inset-0 h-full w-full object-cover opacity-50"
                        />
                      }
                      Icon={() => <div className="h-12 w-12" />}
                      description={project.description}
                      href="#"
                      cta="View Project"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </section>

        {/* Experience Section */}
        <section className="w-full mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Experience
          </h2>
          <div className="space-y-4">
            {experiences.slice(0, 2).map((experience) => (
              <div
                key={experience.id}
                onClick={() => {
                  setSelectedExperience(experience);
                  setExperienceDrawerOpen(true);
                }}
                className="flex gap-4 p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer"
              >
                <img
                  src={experience.logo}
                  alt="Company Logo"
                  className="w-16 h-16 object-contain rounded-lg bg-white p-2 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {experience.position}
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    {experience.company}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {experience.employmentType}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {experience.startDate} - {experience.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {experience.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Additional Experience Items - Collapsible */}
            {showAllExperience && experiences.slice(2).map((experience) => (
              <div
                key={experience.id}
                onClick={() => {
                  setSelectedExperience(experience);
                  setExperienceDrawerOpen(true);
                }}
                className="flex gap-4 p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer"
              >
                <img
                  src={experience.logo}
                  alt="Company Logo"
                  className="w-16 h-16 object-contain rounded-lg bg-white p-2 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {experience.position}
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    {experience.company}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {experience.employmentType}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {experience.startDate} - {experience.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {experience.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {experiences.length > 2 && (
              <button
                onClick={() => setShowAllExperience(!showAllExperience)}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                {showAllExperience ? "Show less" : "Show more experiences"}
              </button>
            )}
          </div>
        </section>

        {/* Education Section */}
        <section className="w-full mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Education
          </h2>
          <div className="space-y-4">
            {educations.slice(0, 2).map((education) => (
              <div
                key={education.id}
                onClick={() => {
                  setSelectedEducation(education);
                  setEducationDrawerOpen(true);
                }}
                className="flex gap-4 p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer"
              >
                <img
                  src={education.logo}
                  alt="School Logo"
                  className="w-16 h-16 object-contain rounded-lg bg-white p-2 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {education.school}
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    {education.degree}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {education.field}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {education.startDate} - {education.endDate}
                  </div>
                </div>
              </div>
            ))}

            {/* Additional Education Items - Collapsible */}
            {showAllEducation && educations.slice(2).map((education) => (
              <div
                key={education.id}
                onClick={() => {
                  setSelectedEducation(education);
                  setEducationDrawerOpen(true);
                }}
                className="flex gap-4 p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer"
              >
                <img
                  src={education.logo}
                  alt="School Logo"
                  className="w-16 h-16 object-contain rounded-lg bg-white p-2 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {education.school}
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    {education.degree}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {education.field}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {education.startDate} - {education.endDate}
                  </div>
                </div>
              </div>
            ))}

            {educations.length > 2 && (
              <button
                onClick={() => setShowAllEducation(!showAllEducation)}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                {showAllEducation ? "Show less" : "Show more education"}
              </button>
            )}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="w-full mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Certifications
          </h2>
          <div className="space-y-4">
            {certifications.slice(0, 2).map((certification) => (
              <div
                key={certification.id}
                onClick={() => {
                  setSelectedCertification(certification);
                  setCertificationDrawerOpen(true);
                }}
                className="flex gap-4 p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer"
              >
                <img
                  src={certification.logo}
                  alt="Certification Badge"
                  className="w-16 h-16 object-contain rounded-lg bg-white p-2 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {certification.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    Issued: {certification.issueDate}
                  </div>
                  {certification.credentialUrl && (
                    <a
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Credential
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Additional Certification Items - Collapsible */}
            {showAllCertifications && certifications.slice(2).map((certification) => (
              <div
                key={certification.id}
                onClick={() => {
                  setSelectedCertification(certification);
                  setCertificationDrawerOpen(true);
                }}
                className="flex gap-4 p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer"
              >
                <img
                  src={certification.logo}
                  alt="Certification Badge"
                  className="w-16 h-16 object-contain rounded-lg bg-white p-2 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {certification.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    Issued: {certification.issueDate}
                  </div>
                  {certification.credentialUrl && (
                    <a
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Credential
                    </a>
                  )}
                </div>
              </div>
            ))}

            {certifications.length > 2 && (
              <button
                onClick={() => setShowAllCertifications(!showAllCertifications)}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                {showAllCertifications ? "Show less" : "Show more certifications"}
              </button>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Have a project in mind? Let's work together!
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg">
            Contact Me
          </button>
        </section>

        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 transition"
        >
          Back to Landing
        </button>
      </main>

      {/* Project Drawer */}
      <ProjectDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        project={selectedProject}
      />

      {/* Experience Drawer */}
      <ExperienceDrawer
        open={experienceDrawerOpen}
        onOpenChange={setExperienceDrawerOpen}
        experience={selectedExperience}
      />

      {/* Education Drawer */}
      <EducationDrawer
        open={educationDrawerOpen}
        onOpenChange={setEducationDrawerOpen}
        education={selectedEducation}
      />

      {/* Certification Drawer */}
      <CertificationDrawer
        open={certificationDrawerOpen}
        onOpenChange={setCertificationDrawerOpen}
        certification={selectedCertification}
      />
    </div>
  );
}
