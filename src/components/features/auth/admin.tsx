'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, getUser } from '@/lib/supabase/auth-client';
import { getCompletePortfolioData } from '@/lib/supabase/portfolio.service';
import {
  LogOut,
  User,
  Briefcase,
  Code,
  GraduationCap,
  Award,
  Settings,
  FolderKanban,
} from 'lucide-react';
import type { PortfolioData } from '@/types/portfolio.types';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [portfolioData, setPortfolioData] = useState<Partial<PortfolioData> | null>(null);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await getUser();
      if (!user) {
        router.push('/admin/login');
        return;
      }
      setUserEmail(user.email || null);
      await loadPortfolioData();
    } catch (error) {
      console.error('Auth error:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const loadPortfolioData = async () => {
    try {
      const data = await getCompletePortfolioData();
      setPortfolioData({
        personalInfo: data.personalInfo ?? undefined,
        socialLinks: data.socialLinks ?? undefined,
        aboutMe: data.aboutMe ?? undefined,
        skills: data.skills,
        projects: data.projects,
        experiences: data.experiences,
        educations: data.educations,
        certifications: data.certifications,
      });
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage your portfolio content
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {userEmail}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Greeting
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {portfolioData?.personalInfo?.greeting || 'Not set'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {portfolioData?.personalInfo?.name || 'Not set'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Position
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {portfolioData?.personalInfo?.position || 'Not set'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tagline
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {portfolioData?.personalInfo?.tagline || 'Not set'}
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                  Edit Personal Info
                </button>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Projects ({portfolioData?.projects?.length || 0})
                </h2>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                  Add Project
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolioData?.projects?.map((project) => (
                  <div
                    key={project.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Skills ({portfolioData?.skills?.length || 0})
                </h2>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                  Add Skill
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {portfolioData?.skills?.map((skill) => (
                  <div
                    key={skill.id}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Experience ({portfolioData?.experiences?.length || 0})
                </h2>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                  Add Experience
                </button>
              </div>
              <div className="space-y-4">
                {portfolioData?.experiences?.map((exp) => (
                  <div
                    key={exp.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {exp.position}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {exp.company} • {exp.startDate} - {exp.endDate || 'Present'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Education ({portfolioData?.educations?.length || 0})
                </h2>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                  Add Education
                </button>
              </div>
              <div className="space-y-4">
                {portfolioData?.educations?.map((edu) => (
                  <div
                    key={edu.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {edu.school} • {edu.startDate} - {edu.endDate || 'Present'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'certifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Certifications ({portfolioData?.certifications?.length || 0})
                </h2>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                  Add Certification
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioData?.certifications?.map((cert) => (
                  <div
                    key={cert.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {cert.issuer} • Issued: {cert.issueDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}