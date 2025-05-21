
'use client';

import { GraduationCap, School } from "lucide-react"; // Using School as a fallback icon for empty state
import { educationItems } from "@/lib/constants";
import { TimelineDisplay } from '@/components/sections/timeline-display';

export default function EducationPage() {
  return (
    <div className="space-y-12">
      <section className="text-center mb-12">
         <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <GraduationCap className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-primary">Education</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          My academic background, qualifications, and educational milestones.
        </p>
      </section>
      
      {educationItems && educationItems.length > 0 ? (
        <TimelineDisplay items={educationItems} defaultIcon={GraduationCap} />
      ) : (
        <div className="text-center text-muted-foreground py-10">
          <School className="mx-auto h-16 w-16 mb-6 text-primary/50" />
           <h2 className="text-2xl font-semibold text-primary mb-2">No Education Entries Yet</h2>
          <p className="max-w-md mx-auto">Details about my academic background and qualifications will be listed here soon.</p>
        </div>
      )}
    </div>
  );
}
