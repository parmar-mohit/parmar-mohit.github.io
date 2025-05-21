
'use client';

import { Progress } from '@/components/ui/progress';
import type { SkillCategory as SkillCategoryType, Skill as SkillType } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { getIcon } from '@/lib/icon-map';

type SkillProcessMonitorProps = {
  categories: SkillCategoryType[];
};

const proficiencyToPercentage = (badge?: string): number => {
  if (!badge) return Math.random() * 50 + 25; // 25-75 for undefined
  switch (badge.toLowerCase()) {
    case 'expert':
      return Math.random() * 10 + 90; // 90-100
    case 'advanced':
      return Math.random() * 15 + 75; // 75-90
    case 'intermediate':
      return Math.random() * 20 + 50; // 50-70
    case 'basic':
      return Math.random() * 20 + 25; // 25-45
    default:
      return Math.random() * 50 + 25;
  }
};

export function SkillProcessMonitor({ categories }: SkillProcessMonitorProps) {
  const [skillLevels, setSkillLevels] = useState<Record<string, number>>({});

  useEffect(() => {
    const initialLevels: Record<string, number> = {};
    categories.forEach(category => {
      category.skills.forEach(skill => {
        initialLevels[`${category.name}-${skill.name}`] = proficiencyToPercentage(skill.badge);
      });
    });
    setSkillLevels(initialLevels);

    const interval = setInterval(() => {
      setSkillLevels(prevLevels => {
        const newLevels = { ...prevLevels };
        for (const key in newLevels) {
          // Apply update only some of the time for more randomness
          if (Math.random() > 0.4) { // ~60% chance to update each skill per interval
            // Simulate smaller, more varied fluctuation: +/- 1 to 5%
            let change = (Math.random() - 0.5) * (Math.random() * 8 + 2); // Fluctuation range between -5 to +5
            newLevels[key] = Math.max(10, Math.min(98, newLevels[key] + change)); // Keep between 10-98
          }
        }
        return newLevels;
      });
    }, 1000); // Update every 1 second for smoother visual changes

    return () => clearInterval(interval);
  }, [categories]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {categories.map((category) => {
        const CategoryIcon = getIcon(category.iconName);
        return (
          <Card key={category.name} className="bg-card/80 border-primary/30 shadow-xl hover:shadow-accent/20 transition-shadow duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-accent flex items-center">
                {CategoryIcon && <CategoryIcon className="mr-3 h-6 w-6 text-accent" />}
                {category.name} :: Process Group
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {category.skills.map((skill) => {
                const SkillIcon = getIcon(skill.iconName);
                const skillKey = `${category.name}-${skill.name}`;
                const currentLevel = skillLevels[skillKey] || 0;
                return (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-foreground font-medium flex items-center">
                        {SkillIcon && <SkillIcon className="mr-2 h-4 w-4 text-primary/80" />}
                        {skill.name}
                      </span>
                      <span className="text-xs text-primary font-mono">{currentLevel.toFixed(0)}%</span>
                    </div>
                    <Progress value={currentLevel} className="h-3 skill-process-bar transition-all duration-500 ease-out" />
                    {skill.badge && <p className="text-xs text-muted-foreground mt-1">Status: {skill.badge}</p>}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
