
'use client';

import { Briefcase, Workflow } from "lucide-react"; // Using Workflow as a fallback icon for empty state
import { experienceItems } from "@/lib/constants";
import { TimelineDisplay } from '@/components/sections/timeline-display';

export default function ExperiencePage() {
  return (
    <div className="space-y-12">
      <section className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <Briefcase className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-primary">Work Experience</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A timeline of my professional journey, roles, and key responsibilities.
        </p>
      </section>
      
      {experienceItems && experienceItems.length > 0 ? (
        <TimelineDisplay items={experienceItems} defaultIcon={Briefcase} />
      ) : (
        <div className="text-center text-muted-foreground py-10">
          <Workflow className="mx-auto h-16 w-16 mb-6 text-primary/50" />
          <h2 className="text-2xl font-semibold text-primary mb-2">No Work Experience Yet</h2>
          <p className="max-w-md mx-auto">My career journey will be documented here soon. Stay tuned for updates on professional roles and achievements.</p>
        </div>
      )}
    </div>
  );
}
