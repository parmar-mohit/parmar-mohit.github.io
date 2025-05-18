'use client';

import Link from 'next/link';
import { socialLinks } from '@/lib/constants';
import { SocialLinkIcon } from '@/components/client/social-link-icon';
import { useState, useEffect } from 'react';

// Renamed to FooterClient and made default export
export default function FooterClient() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | string>('');

  useEffect(() => {
    setIsMounted(true);
    setCurrentYear(new Date().getFullYear());
  }, []); // Empty dependency array ensures this runs once on client mount

  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container py-8 px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex space-x-4 mb-4 md:mb-0">
          {isMounted ? (
            socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label={link.name}
              >
                <SocialLinkIcon iconName={link.iconName} linkName={link.name} />
              </Link>
            ))
          ) : (
            // Placeholder to prevent layout shift and hydration errors for dynamic links
            <div className="h-6 w-24"></div> 
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {isMounted ? currentYear : ''} Mohit Parmar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
