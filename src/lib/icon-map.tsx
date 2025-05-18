
'use client';
import type { LucideIcon } from 'lucide-react';
import {
  Code2,
  LayoutGrid,
  Wrench,
  Cloud,
  Database as DatabaseIcon, // Renamed to avoid conflict if Database is a type/variable
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
  Code, // Generic code icon
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
} from 'lucide-react';

// Custom LeetCode SVG Icon
const LeetCodeIconSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || "0"} 
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props} 
  >
    <path d="M13.48 4.06H11.4V20h2.08V4.06zM4.02 8.12V20h2.08V8.12H4.02zm15.96 0V20h2.08V8.12h-2.08zM19.98 4.06h-2.08v2.08h2.08V4.06zM8.02 4.06H5.94v2.08h2.08V4.06z"></path>
  </svg>
);


export const iconMapping: { [key: string]: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>> } = {
  Code2,
  CodeSquare: Code2, 
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
  LeetCode: LeetCodeIconSVG, 
  Default: CheckCircle, 
};

export function getIcon(name?: string): LucideIcon | React.FC<React.SVGProps<SVGSVGElement>> | null {
  if (!name) return null;
  const IconComponent = iconMapping[name];
  return IconComponent || iconMapping['Default']; 
}

