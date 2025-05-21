
'use client'; // Ensure this is the VERY FIRST line

import type { LucideIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import next/image
import {
  Code2,
  LayoutGrid,
  Wrench,
  Cloud,
  Database as DatabaseIcon,
  FileCode,
  Braces,
  FileText,
  Cpu,
  Brain,
  PenTool,
  Rss,
  ScrollText,
  ShieldCheck,
  Briefcase,
  User,
  MessageSquare,
  GraduationCap,
  BookOpen,
  CheckCircle,
  Server,
  Settings,
  Menu,
  Github,
  Linkedin,
  Instagram,
  Code,
  Mail,
  Download,
  Send,
  UserCheck,
  ArrowLeft,
  ArrowRight,
  Clock,
  ExternalLink,
  Layers,
  Info,
  Award,
  Terminal,
  Book,
  Code as LeetCodeDefaultIcon // Fallback Lucide icon
} from 'lucide-react';

// Client-side component to render the LeetCode PNG logo
const LeetCodeImageLogo = (props: { className?: string }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render null on the server and during the initial client render pass
    // This helps prevent hydration mismatches.
    return null;
  }

  // Render the next/image component only on the client side after hydration
  return (
    <Image
      src="/icons/leetcode-logo.png" // Updated path to PNG
      alt="LeetCode Logo"
      width={24} // Set for layout consistency
      height={24}
      className={props.className || "h-6 w-6"}
      // unoptimized={true} // Removed, let Next.js optimize PNGs by default
    />
  );
};


export const iconMapping: { [key: string]: LucideIcon | React.FC<any> } = {
  Code2,
  LayoutGrid,
  Wrench,
  Cloud,
  DatabaseIcon,
  FileCode,
  Braces,
  FileText,
  Cpu,
  Brain,
  PenTool,
  Rss,
  ScrollText,
  ShieldCheck,
  Briefcase,
  User,
  MessageSquare,
  GraduationCap,
  BookOpen,
  CheckCircle,
  Server,
  Settings,
  Menu,
  Github,
  Linkedin,
  Instagram,
  Code,
  Mail,
  Download,
  Send,
  UserCheck,
  ArrowLeft,
  ArrowRight,
  Clock,
  ExternalLink,
  Layers,
  Info,
  Award,
  Terminal,
  Book,
  LeetCode: LeetCodeImageLogo, // Uses the new component
  Default: CheckCircle,
};

export function getIcon(name?: string): LucideIcon | React.FC<any> | null {
  if (!name) return null;
  const IconComponent = iconMapping[name];
  return IconComponent || iconMapping['Default'];
}
