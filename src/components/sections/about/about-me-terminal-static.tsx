
'use client';

import { TerminalWindow } from '@/components/ui/terminal-window';
import { aboutMeTerminalObject } from '@/lib/constants';
import { useEffect, useState } from 'react';

const PROMPT = 'guest@mohit.dev:~$ ';
const command = 'cat ./aboutme.json';
const output = `// aboutme.json - Configuration for Mohit Parmar

${JSON.stringify(aboutMeTerminalObject, null, 2)}

// End of file. Type 'help' for more commands.
`;

export function AboutMeTerminalStatic() {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = `${PROMPT}${command}\n${output}\n${PROMPT}`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(prev => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20); // Adjust typing speed

    return () => clearInterval(interval);
  }, [fullText]);


  return (
    <TerminalWindow title="MohitOS - /home/guest/aboutme.json" contentClassName="whitespace-pre-wrap text-sm leading-relaxed h-auto max-h-[600px]">
      {displayedText}
      {displayedText.length === fullText.length && <span className="animate-pulse">_</span>}
    </TerminalWindow>
  );
}
