// This file is no longer needed and has been removed.
// The Smart Skill Suggester admin page and its AI features have been removed from the project.

import { BrainOff } from 'lucide-react'; // Using a different icon to indicate feature removal

export default function SkillSuggesterAdminPageRemoved() {
  return (
    <div className="space-y-6 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
      <BrainOff className="h-16 w-16 text-muted-foreground mb-6" />
      <h1 className="text-3xl font-bold text-primary mb-3">Smart Skill Suggester Removed</h1>
      <p className="text-muted-foreground max-w-md">
        This AI-powered feature has been removed from the portfolio.
      </p>
    </div>
  );
}
