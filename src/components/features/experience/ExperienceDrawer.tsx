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
import { Calendar, MapPin } from "lucide-react";

export interface Experience {
  id: string;
  position: string;
  company: string;
  employmentType?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  logo?: string;
  description?: string;
  responsibilities?: string[];
  achievements?: string[];
  skills?: string[];
}

interface ExperienceDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience: Experience | null;
}

export function ExperienceDrawer({ open, onOpenChange, experience }: ExperienceDrawerProps) {
  if (!experience) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="left">
      <DrawerContent className="h-full w-full md:w-1/2 rounded-none">
        <div className="flex flex-col h-full overflow-y-auto">
          <DrawerHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                {experience.logo && (
                  <img
                    src={experience.logo}
                    alt={`${experience.company} Logo`}
                    className="w-16 h-16 object-contain rounded-lg bg-white p-2 flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <DrawerTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {experience.position}
                  </DrawerTitle>
                  <DrawerDescription className="text-base text-gray-700 dark:text-gray-300 font-medium">
                    {experience.company}
                  </DrawerDescription>
                  {experience.employmentType && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {experience.employmentType}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {experience.startDate} - {experience.endDate || 'Present'}
                    </span>
                    {experience.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {experience.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <DrawerClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="flex-1 p-6 space-y-6">
            {/* Description */}
            {experience.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  About the Role
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {experience.description}
                </p>
              </div>
            )}

            {/* Responsibilities */}
            {experience.responsibilities && experience.responsibilities.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Key Responsibilities
              </h3>
              <ul className="space-y-2">
                {experience.responsibilities.map((responsibility, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
            )}

            {/* Achievements */}
            {experience.achievements && experience.achievements.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Key Achievements
                </h3>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                    >
                      <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            {experience.skills && experience.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
