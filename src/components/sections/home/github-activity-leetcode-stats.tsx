
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { socialLinks } from '@/lib/constants';
import Image from "next/image";
import { Github } from 'lucide-react';
import { getIcon } from "@/lib/icon-map";

export function GithubActivityLeetCodeStats() {
  const githubUsername = socialLinks.find(link => link.name === 'GitHub')?.url.split('/').pop() || 'mohitparmar';
  const leetcodeUsername = socialLinks.find(link => link.name === 'LeetCode')?.url.split('/').pop() || 'mohitparmar';
  const LeetCodeIcon = getIcon('LeetCode');

  return (
    <section className="py-16 md:py-24 bg-background/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Live Activity Feeds
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* GitHub Contribution Graph */}
          <Card className="bg-card/70 border-border/30 shadow-xl hover:shadow-primary/30 transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-primary"><Github className="mr-3 h-7 w-7"/>GitHub Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <p className="text-muted-foreground mb-3 text-sm text-center">My GitHub Contribution Calendar:</p>
              <div className="w-full overflow-hidden"> {/* Added overflow-hidden, removed flex justify-center */}
                <Image
                  src={`https://ghchart.rshah.org/${githubUsername}`}
                  alt={`${githubUsername}'s GitHub Contributions`}
                  width={720}
                  height={110}
                  className="rounded border border-border/20 shadow-md max-w-full h-auto mx-auto block" // Added mx-auto block
                  data-ai-hint="github contributions"
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
              <div className="w-full overflow-hidden"> {/* Added overflow-hidden, removed flex justify-center */}
                <Image
                  src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=dark&font=JetBrains%20Mono&borderRadius=8`}
                  alt={`${leetcodeUsername}'s LeetCode Stats`}
                  width={396}
                  height={155}
                  className="rounded border border-border/20 shadow-md max-w-full h-auto mx-auto block" // Added mx-auto block
                  data-ai-hint="leetcode stats"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
