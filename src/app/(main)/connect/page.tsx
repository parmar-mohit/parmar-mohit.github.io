'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { socialLinks } from '@/lib/constants';
import Link from "next/link";
import { UserCheck } from 'lucide-react'; // Keep UserCheck as a fallback
import { getIcon } from "@/lib/icon-map";
import { Button } from "@/components/ui/button";

export default function ConnectPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Connect With Me</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great. Here's how you can find me online or get in touch.
        </p>
      </section>

      <section className="max-w-md mx-auto">
        <Card className="bg-card/70 border-border/30 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-primary"><UserCheck className="mr-2 h-6 w-6"/>Find Me Online</CardTitle>
            <CardDescription>Connect with me on these platforms or send an email to <a href={`mailto:${socialLinks.find(link => link.iconName === 'Mail')?.url.split(':')[1] || 'mohit@example.com'}`} className="text-accent hover:underline">{socialLinks.find(link => link.iconName === 'Mail')?.url.split(':')[1] || 'mohit@example.com'}</a>.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {socialLinks.map(link => {
              const Icon = getIcon(link.iconName) || UserCheck; 
              return (
                <Button key={link.name} variant="outline" asChild className="w-full justify-start text-left border-primary/40 hover:border-accent hover:bg-accent hover:text-accent-foreground">
                  <Link href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    {Icon && <Icon className="mr-3 h-5 w-5"/>} {link.name}
                  </Link>
                </Button>
              );
            })}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
