'use client';

import { useState, useEffect } from 'react';
import { TerminalWindow } from '@/components/ui/terminal-window';

const commands = [
  { cmd: 'whoami', output: ['mohitparmar'] },
  { cmd: 'cat about.txt', output: [
      "Hey there! I'm Mohit, a software developer with a passion for crafting elegant and efficient solutions.",
      "I thrive on challenges and continuously seek to expand my skillset.",
      "My journey in tech is driven by curiosity and a desire to build impactful digital experiences.",
      "When I'm not coding, you can find me exploring new tech, reading, or gaming.",
      "Let's connect and build something amazing together!"
    ] 
  },
  { cmd: 'ls -la projects/', output: [
      'drwxr-xr-x  4 mohitparmar  staff   128B Jul 20 10:00 .',
      'drwxr-xr-x 10 mohitparmar  staff   320B Jul 18 09:15 ..',
      '-rw-r--r--  1 mohitparmar  staff   1.2K Jul 19 14:30 project-alpha.js',
      '-rw-r--r--  1 mohitparmar  staff   2.5K Jul 20 09:50 project-beta.py',
      'drwxr-xr-x  2 mohitparmar  staff    64B Jul 15 11:00 old-project-gamma'
    ]
  },
  { cmd: 'exit', output: ['logout', '[Process completed]'] }
];

const PROMPT = 'guest@mohit.dev:~$ ';

export function AnimatedTerminalDisplay() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isCommandComplete, setIsCommandComplete] = useState(false);

  useEffect(() => {
    if (currentCommandIndex >= commands.length) return;

    const currentCmdObj = commands[currentCommandIndex];

    // Typing the command
    if (!isCommandComplete && currentCharIndex < currentCmdObj.cmd.length) {
      const timer = setTimeout(() => {
        if (lines.length === 0 || !lines[lines.length - 1].startsWith(PROMPT) || lines[lines.length - 1].includes('\n')) {
          setLines(prev => [...prev, PROMPT + currentCmdObj.cmd[currentCharIndex]]);
        } else {
          setLines(prev => {
            const newLines = [...prev];
            newLines[newLines.length - 1] += currentCmdObj.cmd[currentCharIndex];
            return newLines;
          });
        }
        setCurrentCharIndex(prev => prev + 1);
      }, 50); // Faster typing for command
      return () => clearTimeout(timer);
    }

    // Command typed, now show output
    if (!isCommandComplete && currentCharIndex >= currentCmdObj.cmd.length) {
      setIsCommandComplete(true);
      setCurrentCharIndex(0); // Reset for output lines
      // Add a newline after the command is fully typed
      setLines(prev => {
        const newLines = [...prev];
        if (newLines.length > 0 && !newLines[newLines.length - 1].endsWith('\n')) {
            newLines[newLines.length - 1] += '\n';
        }
        return newLines;
      });
      return;
    }
    
    // Displaying output lines
    if (isCommandComplete && currentCharIndex < currentCmdObj.output.length) {
      const outputTimer = setTimeout(() => {
        setLines(prev => [...prev, currentCmdObj.output[currentCharIndex] + '\n']);
        setCurrentCharIndex(prev => prev + 1);
      }, 100); // Slower for output
      return () => clearTimeout(outputTimer);
    }

    // Output displayed, move to next command
    if (isCommandComplete && currentCharIndex >= currentCmdObj.output.length) {
        const delayTimer = setTimeout(() => {
            setCurrentCommandIndex(prev => prev + 1);
            setCurrentCharIndex(0);
            setIsCommandComplete(false);
            if (currentCommandIndex < commands.length -1) { // Add prompt for next command if not the last one
                 setLines(prev => [...prev, PROMPT]);
            }
        }, 1000); // Pause before next command
        return () => clearTimeout(delayTimer);
    }

  }, [currentCommandIndex, currentCharIndex, isCommandComplete, lines]);

  return (
    <TerminalWindow title="MohitOS - Terminal" contentClassName="whitespace-pre-wrap text-sm leading-relaxed">
      {lines.map((line, index) => (
        <span key={index}>{line.startsWith(PROMPT) ? line : `  ${line}`}</span>
      ))}
      {/* Blinking cursor emulation if needed, can be complex with scroll */}
      {currentCommandIndex < commands.length && <span className="animate-pulse">_</span>}
    </TerminalWindow>
  );
}
