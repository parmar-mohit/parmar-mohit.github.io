
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { ArrowRight } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';

const taglines = [
  "Software Developer",
  "Tech Enthusiast",
  "Problem Solver",
  "Creative Coder",
  "Lifelong Learner",
];

const MatrixRainChar = ({ char, delay, duration, topOffset }: { char: string; delay: number; duration: number; topOffset: number }) => {
  return (
    <span
      className="matrix-rain-char absolute"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        left: `${Math.random() * 100}%`,
        top: `${topOffset}px`, // Start from this offset
        fontSize: `${Math.random() * 0.5 + 0.65}rem`,
      }}
    >
      {char}
    </span>
  );
};

const MatrixBackground = () => {
  const [chars, setChars] = useState<React.ReactNode[]>([]);
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/`~";

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const generateChars = () => {
      const newChars: React.ReactNode[] = [];
      const numChars = Math.floor(window.innerWidth / 12); // Adjust density for full coverage
      for (let i = 0; i < numChars; i++) {
        newChars.push(
          <MatrixRainChar
            key={`matrix-${i}-${Math.random()}`}
            char={characters[Math.floor(Math.random() * characters.length)]}
            delay={Math.random() * 15} // Stagger start times more
            duration={Math.random() * 8 + 7} // Random fall duration (longer)
            topOffset={Math.random() * -1000} // Start some characters off-screen above
          />
        );
      }
      setChars(newChars);
    };

    generateChars();
    // Consider adding a resize listener if needed, but be mindful of performance
    // window.addEventListener('resize', generateChars);
    // return () => window.removeEventListener('resize', generateChars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
      <div className="relative h-full w-full">
        {chars}
      </div>
    </div>
  );
};


export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-16 md:py-24 text-center overflow-hidden"> {/* Ensure full viewport height minus header */}
      <MatrixBackground />
      <div className="relative z-10 p-4"> {/* Content container */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-pulse">
          Hi, I’m Mohit Parmar
        </h1>
        <div className="text-2xl md:text-3xl text-accent mb-8 h-10 md:h-12 flex items-center justify-center">
          <TypingAnimation taglines={taglines} className="font-mono" />
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          A passionate developer with a knack for building innovative solutions and exploring new technologies.
          Welcome to my digital terminal.
        </p>
        <div className="space-x-4">
          <Button
            size="lg"
            asChild
            className="bg-primary hover:bg-primary/80 text-primary-foreground shadow-lg hover:shadow-accent/40 transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-transparent hover:border-accent"
          >
            <Link href="/projects">
              View My Work <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 active:scale-95 hover:border-primary"
          >
            <Link href="/connect">
              Contact Me
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
