"use client";

import { X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  images: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
}

interface ProjectDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
}

export function ProjectDrawer({ open, onOpenChange, project }: ProjectDrawerProps) {
  if (!project) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="left">
      <DrawerContent className="h-full w-full md:w-1/2 rounded-none">
        <div className="flex flex-col h-full overflow-y-auto">
          <DrawerHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DrawerTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.name}
                </DrawerTitle>
                <DrawerDescription className="text-base text-gray-600 dark:text-gray-400">
                  {project.description}
                </DrawerDescription>
              </div>
              <DrawerClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="flex-1 p-6 space-y-6">
            {/* Project Images */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Project Gallery
              </h3>
              <div className="flex gap-3">
                {/* Main Thumbnail - Left Half */}
                {project.images[0] && (
                  <div className="w-1/2 aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={project.images[0]}
                      alt={`${project.name} - Main Image`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Grid of smaller images - Right Half */}
                {project.images.length > 1 && (
                  <div className="w-1/2 grid grid-cols-2 gap-3">
                    {project.images.slice(1, 4).map((image, index) => {
                      const actualIndex = index + 1;
                      const isLastImage = actualIndex === 3;
                      const remainingImages = project.images.length - 4;
                      const shouldShowOverlay = isLastImage && remainingImages > 0;
                      
                      return (
                        <div key={actualIndex} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                          <img
                            src={image}
                            alt={`${project.name} - Image ${actualIndex + 1}`}
                            className={`w-full h-full object-cover ${shouldShowOverlay ? 'blur-sm' : ''}`}
                          />
                          {shouldShowOverlay && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="text-white text-lg font-semibold">
                                +{remainingImages} more
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Long Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                About This Project
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Key Features
              </h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="flex gap-4 pt-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition text-center font-medium"
                >
                  View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center font-medium"
                >
                  View Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
