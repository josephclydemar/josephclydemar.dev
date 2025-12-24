"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ThemeToggle from "@/components/ThemeToggle";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-[#100C08]">
      <ThemeToggle />
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-center py-16 px-8 bg-white dark:bg-[#100C08]">
        {/* Header */}
        <header className="w-full mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Full Stack Developer & Creative Designer
          </p>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
              <p className="font-medium text-gray-900 dark:text-white">React</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
              <p className="font-medium text-gray-900 dark:text-white">Next.js</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
              <p className="font-medium text-gray-900 dark:text-white">TypeScript</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
              <p className="font-medium text-gray-900 dark:text-white">Tailwind CSS</p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="w-full mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Project One
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                A description of your amazing project goes here.
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                View Project
              </button>
            </div>
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Project Two
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Another exciting project with innovative features.
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                View Project
              </button>
            </div>
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
    </div>
  );
}
