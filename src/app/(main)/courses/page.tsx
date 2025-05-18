
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { BookOpen, Library } from "lucide-react"; // Added Library as a fallback
import { courseItems } from "@/lib/constants"; 
import type { CourseItem as TimelineItemType } from "@/lib/constants"; 
import { getIcon } from '@/lib/icon-map';


const TimelineSection = ({ title, items, Icon }: {title: string, items: TimelineItemType[], Icon: React.ElementType}) => (
  <section className="mb-12">
    <div className="flex items-center mb-6">
      <Icon className="h-8 w-8 mr-3 text-accent" />
      <h2 className="text-3xl font-semibold text-primary">{title}</h2>
    </div>
    <Accordion type="single" collapsible className="w-full space-y-4">
      {items.map(item => {
        const ItemIcon = getIcon(item.iconName) || Icon; 
        return (
        <AccordionItem value={item.id} key={item.id} className="bg-card/70 border border-border/30 rounded-lg shadow-md hover:border-accent transition-colors">
          <AccordionTrigger className="p-6 text-lg font-medium text-card-foreground hover:text-accent data-[state=open]:text-accent">
            <div className="flex items-center">
              <ItemIcon className="h-5 w-5 mr-3 text-current" />
              {item.title}
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-6 pt-0 text-muted-foreground">
            <p className="font-semibold text-accent/80 mb-2">{item.date}</p>
            <p>{item.description}</p>
          </AccordionContent>
        </AccordionItem>
        );
      })}
    </Accordion>
  </section>
)

export default function CoursesPage() {
  return (
    <div className="space-y-12">
      <section className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <BookOpen className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Courses & Learning</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Significant courses I've undertaken to enhance my skills and knowledge.
        </p>
      </section>
      
      {courseItems && courseItems.length > 0 ? (
        <TimelineSection title="Key Courses Taken" items={courseItems} Icon={BookOpen} />
      ) : (
        <div className="text-center text-muted-foreground py-10">
          <Library className="mx-auto h-16 w-16 mb-6 text-primary/50" />
          <h2 className="text-2xl font-semibold text-primary mb-2">No Courses Logged Yet</h2>
          <p className="max-w-md mx-auto">Details about significant courses taken will appear here soon.</p>
        </div>
      )}
    </div>
  );
}

