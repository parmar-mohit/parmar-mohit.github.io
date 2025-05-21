'use client';

import { useState, useEffect } from 'react';
import { TerminalWindow } from '@/components/ui/terminal-window';
import { skillsData } from '@/lib/constants'; // Assuming skillsData is correctly typed and imported

const skillsJson = JSON.stringify(
  skillsData.map(category => ({
    category: category.name,
    skills: category.skills.map(skill => skill.name),
  })),
  null,
  2
);

const PROMPT_SKILLS = 'skills@mohit.dev:~$ ';

export function MiniTerminalSkills() {
  const [displayedText, setDisplayedText] = useState('');
  const [showGrep, setShowGrep] = useState(false);

  const command1 = `cat skills.json`;
  const fullText = `${PROMPT_SKILLS}${command1}\n${skillsJson}\n`;
  
  const command2 = `grep "React" skills.json`;
  const grepOutput = skillsJson.split('\n').filter(line => line.includes("React")).map(line => `  ${line.trim()}`).join('\n');
  const fullGrepText = `${PROMPT_SKILLS}${command2}\n${grepOutput}\n${PROMPT_SKILLS}`;


  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(prev => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowGrep(true), 1000); // Show grep after a delay
      }
    }, 10); // Adjust typing speed as needed
    return () => clearInterval(interval);
  }, [fullText]);

  useEffect(() => {
    if (!showGrep) return;
    
    let index = 0;
    // Append to existing text
    setDisplayedText(prev => prev + PROMPT_SKILLS); 

    const grepInterval = setInterval(() => {
      if (index < fullGrepText.length) {
         // Type command first, then output
        setDisplayedText(prev => prev + fullGrepText[index]);
        index++;
      } else {
        clearInterval(grepInterval);
      }
    }, 10);
    return () => clearInterval(grepInterval);
  }, [showGrep, fullGrepText]);


  return (
    <TerminalWindow title="Skills Overview" className="mt-12" contentClassName="text-xs h-80">
      <pre>{displayedText}<span className={showGrep && displayedText.endsWith(PROMPT_SKILLS) ? "animate-pulse" : ""}>{showGrep && displayedText.endsWith(PROMPT_SKILLS) ? "_" : ""}</span></pre>
    </TerminalWindow>
  );
}
