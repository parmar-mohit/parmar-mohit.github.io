
'use client';

import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getIcon } from '@/lib/icon-map';
import type { TimelineItem as TimelineItemType } from '@/lib/constants';

interface TimelineDisplayProps {
  items: TimelineItemType[];
  defaultIcon: LucideIcon; 
}

export function TimelineDisplay({ items, defaultIcon }: TimelineDisplayProps) {
  if (!items || items.length === 0) {
    // This case should ideally be handled by the parent page component,
    // but as a safeguard:
    return <p className="text-center text-muted-foreground">No items to display.</p>;
  }

  return (
    <div className="relative max-w-3xl mx-auto">
      {items.map((item, index) => {
        const ItemIcon = getIcon(item.iconName) || defaultIcon;
        const isLastItem = index === items.length - 1;

        return (
          <div key={item.id} className="relative flex items-start group pb-8">
            {/* Vertical line connecting dots - hidden for the last item */}
            {!isLastItem && (
              <div className="absolute left-5 top-12 bottom-0 w-px bg-border -translate-x-1/2"></div>
            )}

            {/* Icon and Dot */}
            <div className="flex flex-col items-center mr-5 sticky top-28 z-10"> {/* Sticky positioning for icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shadow-md">
                <ItemIcon className="h-5 w-5 text-primary" />
              </div>
            </div>

            {/* Card content */}
            <Card className="w-full bg-card/80 border-border/30 shadow-lg hover:shadow-accent/20 transition-all duration-300 transform hover:-translate-y-0.5 hover:border-accent">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="text-xl text-primary mb-1 sm:mb-0 group-hover:text-accent transition-colors">{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground font-mono">{item.date}</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-foreground/90 leading-relaxed">
                  {item.description.split('\n').map((point, i) => (
                    point.trim() ? <li key={i}>{point.trim()}</li> : null
                  )).filter(Boolean)}
                </ul>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

