"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import animationData from "@/components/animation/jcanimation.json";
import Lanyard from "@/components/Lanyard";
import ThemeToggle from "@/components/ThemeToggle";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Home() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMobileClick = () => {
    if (isMobile) {
      router.push('/home');
    }
  };

  return (
    <div 
      className="relative flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-[#100C08]"
      onClick={handleMobileClick}
    >
      <ThemeToggle />
      {/* Lanyard in upper right corner - hidden on mobile */}
      {!isMobile && (
        <div className="fixed top-0 right-0 w-full h-full z-50">
          <Lanyard />
        </div>
      )}
      
      <main className="relative flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-[#100C08] sm:items-start z-0">
        <div className="w-full flex flex-col items-center">
          <Lottie animationData={animationData} loop={true} style={{ width: 400, height: 400 }} />
          <p className="text-center text-lg text-gray-700 dark:text-gray-300 -mt-36 animate-pulse">
            {isMobile ? "Click anywhere" : "Tap the card"}
          </p>
        </div>
        
      </main>
    </div>
  );
}
