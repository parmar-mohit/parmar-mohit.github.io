
'use client';

import Link from 'next/link';
import { mainNavLinks, type NavLink as NavLinkType } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Terminal } from 'lucide-react';
import { getIcon } from '@/lib/icon-map'; // Import getIcon

const NavLink = ({ href, label, iconName, onClick }: NavLinkType & { onClick?: () => void }) => {
  const Icon = iconName ? getIcon(iconName) : null;
  return (
    <Button variant="ghost" asChild onClick={onClick} className="justify-start text-foreground hover:bg-accent hover:text-accent-foreground w-full">
      <Link href={href} className="flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5" />}
        {label}
      </Link>
    </Button>
  );
};

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 pl-2 text-lg font-semibold text-primary hover:text-accent transition-colors"> {/* Added pl-2 */}
          <Terminal className="h-7 w-7" />
          <span>Mohit Parmar</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {mainNavLinks.map((link) => (
            <Button variant="ghost" asChild key={link.href} className="text-foreground hover:text-accent">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-4 border-l border-border">
              <div className="flex flex-col space-y-2">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary mb-4">
                  <Terminal className="h-7 w-7" />
                  <span>Mohit Parmar</span>
                </Link>
                {mainNavLinks.map((link) => (
                  <SheetTrigger asChild key={link.href}>
                     <NavLink href={link.href} label={link.label} iconName={link.iconName} />
                  </SheetTrigger>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

    