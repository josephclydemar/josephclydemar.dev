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
import { Calendar } from "lucide-react";

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  logo?: string;
  description?: string;
  courses?: string[];
  achievements?: string[];
  gpa?: string;
}

interface EducationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  education: Education | null;
}

export function EducationDrawer({ open, onOpenChange, education }: EducationDrawerProps) {
  if (!education) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="left">
      <DrawerContent className="h-full w-full md:w-1/2 rounded-none">
        <div className="flex flex-col h-full overflow-y-auto">
          <DrawerHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                {education.logo && (
                  <img
                    src={education.logo}
                    alt={`${education.school} Logo`}
                    className="w-16 h-16 object-contain rounded-lg bg-white p-2 flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <DrawerTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {education.school}
                  </DrawerTitle>
                  <DrawerDescription className="text-base text-gray-700 dark:text-gray-300 font-medium">
                    {education.degree}
                  </DrawerDescription>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {education.field}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {education.startDate} - {education.endDate || "Present"}
                  </div>
                  {education.gpa && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      GPA: {education.gpa}
                    </p>
                  )}
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
            {education.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  About the Program
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {education.description}
                </p>
              </div>
            )}

            {/* Relevant Courses */}
            {education.courses && education.courses.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Relevant Coursework
                </h3>
                <div className="flex flex-wrap gap-2">
                  {education.courses.map((course, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {education.achievements && education.achievements.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Achievements & Activities
                </h3>
                <ul className="space-y-2">
                  {education.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                    >
                      <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
