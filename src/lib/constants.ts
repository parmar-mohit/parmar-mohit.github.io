
import type { LucideIcon } from 'lucide-react';

// Import data from JSON files
import mainNavLinksData from '@/data/mainNavLinks.json';
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
  screenshots?: string[];
  challenges?: string[];
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

// Generic type for timeline items (Experience, Education)
export type TimelineItem = {
  id: string;
  title: string;
  date: string;
  description: string; // Can contain newline characters for bullet points
  iconName?: string; // Icon name for the timeline item, resolved by getIcon
};

export type ExperienceItem = TimelineItem;
export type EducationItem = TimelineItem;

// Specific type for CourseItem
export type CourseItem = {
  id: string;
  title: string;
  issuingOrganisation: string;
  date: string;
  description: string;
  iconName?: string;
  imageUrl: string;
};

// Specific type for CertificateItem
export type CertificateItem = {
  id: string;
  title: string;
  issuingOrganisation: string;
  date: string;
  description: string;
  iconName?: string;
  imageUrl: string;
};

export const experienceItems: ExperienceItem[] = experienceData;
export const educationItems: EducationItem[] = educationData;
export const courseItems: CourseItem[] = coursesData as CourseItem[];
export const certificateItems: CertificateItem[] = certificatesData as CertificateItem[];

// This constant was related to a removed component (TechSkillsGrid)
// export const coreTechStack = [ ... ];
// Removed SESSION_STORAGE_KEY export as BiosLoadingScreen was removed
// export const SESSION_STORAGE_KEY = 'biosShown';
