
import type { LucideIcon } from 'lucide-react';

// Import data from JSON files
import mainNavLinksData from '@/data/mainNavLinks.json';
// Removed: import adminNavLinksData from '@/data/adminNavLinks.json';
import skillsDataJson from '@/data/skills.json';
import socialLinksData from '@/data/socialLinks.json'; // Serves as contact.json
import aboutMeData from '@/data/aboutMe.json';
import projectsData from '@/data/projects.json';
import blogPostsData from '@/data/blogPosts.json';
import pageSnippetsDataJson from '@/data/pageSnippets.json';
import experienceData from '@/data/experience.json';
import educationData from '@/data/education.json';
import coursesData from '@/data/courses.json';
import certificatesData from '@/data/certificates.json';

// Type Definitions
export type NavLink = {
  href: string;
  label: string;
  iconName?: string; // Icon name to be resolved by icon-map.tsx
};

// Exported constants, sourced from JSON files
export const mainNavLinks: NavLink[] = mainNavLinksData;
// Removed: export const adminNavLinks: NavLink[] = adminNavLinksData;

export type Skill = {
  name: string;
  iconName?: string; // Icon name for individual skill
  badge?: string; // E.g., "Expert", "Intermediate"
};

export type SkillCategory = {
  name:string;
  iconName: string; // Icon name for the category
  skills: Skill[];
};

export const skillsData: SkillCategory[] = skillsDataJson as SkillCategory[];

export type SocialLink = {
    name: string;
    url: string;
    iconName: string; // Icon name for the social link
}
// socialLinks.json serves as the contact information source
export const socialLinks: SocialLink[] = socialLinksData;

// aboutMeTerminalObject is specific data for the "About Me" terminal display
// It can also be used for the `whoami` command context.
export const aboutMeTerminalObject: Record<string, any> = aboutMeData;

export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  techTags: string[];
  fullTechStack: string[];
  whyIBuiltThis: string;
  githubUrl: string;
  liveDemoUrl?: string;
  dataAiHint?: string;
  screenshots?: string[];
  challenges?: string[];
  screenshotAiHint?: string;
};
export const projectsPlaceholder: Project[] = projectsData;


export type BlogPost = {
  id: string;
  title: string;
  snippet: string;
  longExcerpt: string; // Used for hover on blog cards
  date: string;
  tags: string[];
  imageUrls: string[];
  dataAiHint?: string;
  estimatedReadingTime: string;
  content?: string;
};
export const blogPostsPlaceholder: BlogPost[] = blogPostsData as BlogPost[];

// Data for the homepage grid linking to various sections
export type PageSnippet = {
  id: string;
  title: string;
  href: string;
  description: string;
  iconName: string; // Icon name for the snippet card
};
export const pageSnippetsData: PageSnippet[] = pageSnippetsDataJson;

// Generic type for timeline items (Experience, Education, Courses, Certificates)
export type TimelineItem = {
  id: string;
  title: string;
  date: string;
  description: string; // Can contain newline characters for bullet points
  iconName: string; // Icon name for the timeline item
};

export type ExperienceItem = TimelineItem;
export type EducationItem = TimelineItem;
export type CourseItem = TimelineItem;
export type CertificateItem = TimelineItem;

export const experienceItems: ExperienceItem[] = experienceData;
export const educationItems: EducationItem[] = educationData;
export const courseItems: CourseItem[] = coursesData;
export const certificateItems: CertificateItem[] = certificatesData;
