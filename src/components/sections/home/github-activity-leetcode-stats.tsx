
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { socialLinks } from '@/lib/constants';
import Image from "next/image";
import { Github } from 'lucide-react';
import { getIcon } from "@/lib/icon-map";

export function GithubActivityLeetCodeStats() {
  const githubUsername = socialLinks.find(link => link.name === 'GitHub')?.url.split('/').pop() || 'parmar-mohit';
  // Ensure the LeetCode username is taken from socialLinks for consistency
  const leetcodeUsernameFromLinks = socialLinks.find(link => link.name === 'LeetCode')?.url.split('/').pop()?.replace(/\/$/, '') || '_mohitparmar_';


  const LeetCodeIcon = getIcon('LeetCode');

  // For GitHub Streak Stats
  const githubStreakStatsWidth = 495; 
  const githubStreakStatsHeight = 195;
  const githubStreakStatsSrc = `https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=radical`;

  // For LeetCode Card
  const leetCodeCardWidth = 396;
  const leetCodeCardHeight = 155;
  const leetCodeCardSrc = `https://leetcard.jacoblin.cool/${leetcodeUsernameFromLinks}?theme=dark&font=JetBrains%20Mono&borderRadius=8`;

  return (
    <section className="py-16 md:py-24 bg-background/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Live Activity Feeds
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* GitHub Streak Stats */}
          <Card className="bg-card/70 border-border/30 shadow-xl hover:shadow-primary/30 transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-primary"><Github className="mr-3 h-7 w-7"/>GitHub Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <p className="text-muted-foreground mb-3 text-sm text-center sr-only">My GitHub Streak Stats:</p>
              <div className="w-full overflow-hidden">
                <Image
                  src={githubStreakStatsSrc}
                  alt={`${githubUsername}'s GitHub Streak Stats`}
                  width={githubStreakStatsWidth}
                  height={githubStreakStatsHeight}
                  className="rounded border border-border/20 shadow-md max-w-full h-auto mx-auto block" // Ensure this is also well-styled
                  unoptimized={true}
                />
              </div>
            </CardContent>
          </Card>

          {/* LeetCode Stats Card */}
          <Card className="bg-card/70 border-border/30 shadow-xl hover:shadow-primary/30 transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-primary">
                {LeetCodeIcon && <LeetCodeIcon className="mr-3 h-7 w-7"/>}
                LeetCode Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <p className="text-muted-foreground mb-3 text-sm sr-only text-center">My LeetCode Progress Card:</p>
              <div className="w-full overflow-hidden"> {/* Container to manage overflow */}
                <Image
                  src={leetCodeCardSrc}
                  alt={`${leetcodeUsernameFromLinks}'s LeetCode Stats`}
                  width={leetCodeCardWidth}
                  height={leetCodeCardHeight}
                  className="rounded border border-border/20 shadow-md max-w-full h-auto mx-auto block object-contain" // Added object-contain
                  unoptimized={true}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
