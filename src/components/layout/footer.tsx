
'use client';

import Link from 'next/link';
import { socialLinks } from '@/lib/constants';
import { SocialLinkIcon } from '@/components/client/social-link-icon';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex space-x-4 mb-4 md:mb-0">
          {socialLinks.map((link) => (
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
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Mohit Parmar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
