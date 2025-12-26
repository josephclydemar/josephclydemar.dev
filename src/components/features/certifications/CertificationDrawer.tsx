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
import { Calendar, ExternalLink } from "lucide-react";

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  logo: string;
  description: string;
  skills: string[];
  validationDetails?: string;
}

interface CertificationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certification: Certification | null;
}

export function CertificationDrawer({ open, onOpenChange, certification }: CertificationDrawerProps) {
  if (!certification) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="left">
      <DrawerContent className="h-full w-full md:w-1/2 rounded-none">
        <div className="flex flex-col h-full overflow-y-auto">
          <DrawerHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                <img
                  src={certification.logo}
                  alt={`${certification.issuer} Logo`}
                  className="w-16 h-16 object-contain rounded-lg bg-white p-2 flex-shrink-0"
                />
                <div className="flex-1">
                  <DrawerTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {certification.name}
                  </DrawerTitle>
                  <DrawerDescription className="text-base text-gray-700 dark:text-gray-300 font-medium">
                    {certification.issuer}
                  </DrawerDescription>
                  <div className="flex items-center gap-1 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    Issued: {certification.issueDate}
                    {certification.expiryDate && ` • Expires: ${certification.expiryDate}`}
                  </div>
                  {certification.credentialId && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Credential ID: {certification.credentialId}
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
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                About This Certification
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {certification.description}
              </p>
            </div>

            {/* Skills */}
            {certification.skills.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Skills Validated
                </h3>
                <div className="flex flex-wrap gap-2">
                  {certification.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Validation Details */}
            {certification.validationDetails && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Validation Details
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {certification.validationDetails}
                </p>
              </div>
            )}

            {/* Credential Link */}
            {certification.credentialUrl && (
              <div>
                <a
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Credential
                </a>
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
