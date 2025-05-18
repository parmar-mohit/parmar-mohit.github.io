
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Library } from "lucide-react"; // Using Library as fallback for empty state
import { courseItems } from "@/lib/constants"; 
import type { CourseItem as CourseItemType } from "@/lib/constants"; 
import { getIcon } from '@/lib/icon-map';
import { Badge } from '@/components/ui/badge';

export default function CoursesPage() {
  return (
    <div className="space-y-12">
      <section className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <BookOpen className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Courses & Learning</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Significant courses I've undertaken and certificates of completion.
        </p>
      </section>
      
      {courseItems && courseItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courseItems.map((item: CourseItemType) => {
            const ItemIcon = getIcon(item.iconName) || BookOpen;
            return (
              <Card key={item.id} className="flex flex-col bg-card/70 border-border/30 rounded-lg shadow-lg hover:shadow-accent/20 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                {item.imageUrl && (
                  <div className="relative w-full h-48 sm:h-60">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <CardHeader className="p-6">
                  <CardTitle className="text-xl text-primary mb-1 flex items-start">
                    {item.iconName && <ItemIcon className="h-6 w-6 mr-2 mt-0.5 text-accent flex-shrink-0" />}
                    <span>{item.title}</span>
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Issued by: <span className="font-semibold text-accent/90">{item.issuingOrganisation}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0 flex-grow space-y-3">
                  <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">{item.date}</Badge>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-10">
          <Library className="mx-auto h-16 w-16 mb-6 text-primary/50" />
          <h2 className="text-2xl font-semibold text-primary mb-2">No Courses Logged Yet</h2>
          <p className="max-w-md mx-auto">Details about significant courses taken and their completion certificates will appear here soon.</p>
        </div>
      )}
    </div>
  );
}
