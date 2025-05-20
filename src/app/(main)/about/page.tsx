
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';
import { AboutMeTerminalStatic } from '@/components/sections/about/about-me-terminal-static'; // New component

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">About Me</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Dive into my digital command center. Here's a bit more about who I am and what I do, presented in a way I enjoy.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2">
           <AboutMeTerminalStatic />
        </div>
        <div className="flex flex-col items-center space-y-6 p-6 bg-card rounded-lg shadow-xl border border-primary/30 mt-0 md:mt-0"> {/* Adjusted margin for alignment */}
          <Image
            src="/images/profile-picture.jpg"
            alt="Mohit Parmar"
            width={200}
            height={200}
            className="rounded-full border-4 border-accent shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-accent/40"
          />
          <h2 className="text-2xl font-semibold text-primary">Mohit Parmar</h2>
          <p className="text-center text-muted-foreground">
            Bridging the gap between ideas and reality through code.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground transition-all transform hover:scale-105">
              <a href="/others/Mohit Parmar Resume.pdf" download="Mohit Parmar Resume.pdf"> {/* User will provide resume.pdf */}
                <Download className="mr-2 h-5 w-5" /> Download Resume
              </a>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all transform hover:scale-105">
              <a href="/connect">
                <Send className="mr-2 h-5 w-5" /> Contact Me
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
