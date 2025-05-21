
import { SkillsGrid } from '@/components/sections/skills/skills-grid';
import { SkillProcessMonitor } from '@/components/sections/skills/skill-process-monitor';
import { skillsData } from '@/lib/constants';
import { Cpu, Target } from 'lucide-react'; // Added Target

export default function SkillsPage() {
  const hasSkills = skillsData && skillsData.length > 0;

  return (
    <div className="space-y-16">
      <section className="text-center">
        <Cpu className="h-16 w-16 mx-auto mb-6 text-primary animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">SYSTEM_SKILL_MONITOR</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Analyzing core competencies and resource allocation... Standby for full diagnostics.
        </p>
      </section>

      {hasSkills ? (
        <SkillProcessMonitor categories={skillsData} />
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold text-primary mb-2">Skill Data Unavailable</h2>
          <p className="text-muted-foreground">Skill set information is currently being updated. Please check back soon.</p>
        </div>
      )}

      <hr className="my-16 border-border/50" />

      <section className="text-center">
         <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Detailed Skill Matrix</h2>
         <p className="text-md text-muted-foreground max-w-2xl mx-auto mb-8">
           A categorized view of the technology stack and proficiency levels.
         </p>
      </section>
      {hasSkills ? (
        <SkillsGrid />
      ) : (
         <div className="flex flex-col items-center justify-center text-center py-10">
          <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold text-primary mb-2">Skill Matrix Empty</h2>
          <p className="text-muted-foreground">No skills to display in the matrix at this time.</p>
        </div>
      )}
    </div>
  );
}
