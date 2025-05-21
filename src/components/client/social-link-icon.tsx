
'use client';
import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { getIcon } from '@/lib/icon-map';

interface SocialLinkIconProps {
  iconName: string;
  linkName: string; // Fallback text
  className?: string;
}

export function SocialLinkIcon({ iconName, linkName, className }: SocialLinkIconProps) {
  const IconComponent = getIcon(iconName);
  if (IconComponent) {
    return <IconComponent className={className || "h-6 w-6"} />;
  }
  // Fallback to link name if icon is not found
  return <span className={className || "h-6 w-6 flex items-center justify-center"}>{linkName.substring(0,1)}</span>;
}
