
'use client'; // Mark as client component to use hooks and icon map

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { skillsData, type SkillCategory as SkillCategoryType, type Skill as SkillType } from '@/lib/constants'; // Renamed to avoid conflict
import { getIcon } from '@/lib/icon-map'; // Import the icon utility

export function SkillsGrid() {
  return (
    <div className="space-y-12">
      {skillsData.map((category: SkillCategoryType) => {
        const CategoryIcon = getIcon(category.iconName);
        return (
          <section key={category.name}>
            <div className="flex items-center mb-6">
              {CategoryIcon && <CategoryIcon className="h-8 w-8 mr-3 text-accent" />}
              <h3 className="text-2xl md:text-3xl font-semibold text-primary">{category.name}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.skills.map((skill: SkillType) => {
                // Use getIcon for skill icon, falling back to a default if iconName is not specified or not found
                const SkillIcon = getIcon(skill.iconName || 'Default'); 
                return (
                  <Card 
                    key={skill.name} 
                    className="bg-card/70 border-border hover:border-accent shadow-md hover:shadow-accent/20 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                  >
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg font-medium text-card-foreground">{skill.name}</CardTitle>
                      {SkillIcon && <SkillIcon className="h-6 w-6 text-accent" />}
                    </CardHeader>
                    <CardContent>
                      {skill.badge && (
                        <Badge variant="secondary" className="text-xs bg-primary/20 text-primary hover:bg-primary/30">
                          {skill.badge}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
