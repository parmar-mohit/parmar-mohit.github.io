'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { pageSnippetsData, type PageSnippet } from '@/lib/constants';
import { getIcon } from '@/lib/icon-map';
import { ArrowRight } from 'lucide-react';

export function PageSnippetsGrid() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
          Explore My Portfolio
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Navigate through different aspects of my professional journey and work. Each section offers a glimpse into my skills, projects, and experiences.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pageSnippetsData.map((snippet: PageSnippet) => {
            const IconComponent = getIcon(snippet.iconName);
            return (
              <Card 
                key={snippet.id} 
                className="group flex flex-col bg-card/70 border-border hover:border-primary/70 shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-primary group-hover:text-accent transition-colors">
                      {snippet.title}
                    </CardTitle>
                    {IconComponent && <IconComponent className="h-7 w-7 text-accent group-hover:text-primary transition-colors" />}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-muted-foreground mb-4 line-clamp-3">
                    {snippet.description}
                  </CardDescription>
                </CardContent>
                <CardContent className="pt-0">
                   <Button asChild variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground group-hover:border-primary group-hover:text-primary-foreground group-hover:bg-primary/80 transition-all transform hover:scale-105 active:scale-95">
                    <Link href={snippet.href}>
                      View {snippet.title} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
