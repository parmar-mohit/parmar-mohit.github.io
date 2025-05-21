
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { processCommand, type CommandOutput } from '@/lib/commandProcessor.tsx';
import type { AboutMeData, SocialLink, Project, SkillCategory, EducationItem, ExperienceItem, CourseItem, CertificateItem } from '@/lib/constants';
import {
  aboutMeTerminalObject,
  socialLinks,
  projectsPlaceholder,
  skillsData,
  educationItems,
  experienceItems,
  courseItems,
  certificateItems,
  // SESSION_STORAGE_KEY for restart command was here, but restart is removed.
} from '@/lib/constants';


const PROMPT = 'guest@mohit.dev:~$ ';
const TYPING_SPEED = 15; // Faster typing speed

interface Line {
  id: string;
  type: 'input' | 'output' | 'error' | 'html';
  text?: string;
  jsx?: React.ReactNode;
  isTyping?: boolean;
  originalCommandType?: CommandOutput['type'];
}

interface TypingLineProps {
  text: string;
  onFinished: () => void;
  scrollRef: React.RefObject<HTMLDivElement>;
}

const TypingLine: React.FC<TypingLineProps> = ({ text, onFinished, scrollRef }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [hasFinishedInternal, setHasFinishedInternal] = useState(false);

  useEffect(() => {
    if (hasFinishedInternal) {
      if (displayedText !== text) setDisplayedText(text);
      return;
    }

    let animationFrameId: number;
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(current => {
          const newText = text.substring(0, current.length + 1);
          animationFrameId = requestAnimationFrame(() => {
            if (scrollRef.current) {
              scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
          });
          return newText;
        });
      }, TYPING_SPEED);
      return () => {
        clearTimeout(timer);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    } else if (!hasFinishedInternal) {
      setHasFinishedInternal(true);
      onFinished();
    }
  }, [displayedText, text, onFinished, hasFinishedInternal, scrollRef]);

  return <span dangerouslySetInnerHTML={{ __html: displayedText.replace(/\n/g, '<br/>') }} />;
};


export function InteractiveTerminal() {
  const initialWelcomeLineId = React.useMemo(() => Date.now().toString() + '_welcome_init', []);

  const [lines, setLines] = useState<Line[]>([
    { id: initialWelcomeLineId, type: 'output', text: "Welcome to Mohit's Interactive Terminal. Type 'help' for a list of commands.", isTyping: true }
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(true);
  const [activeTypingLineId, setActiveTypingLineId] = useState<string | null>(initialWelcomeLineId);


  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!isProcessing) {
      focusInput();
    }
  }, [isProcessing, focusInput]);

  const addLine = (lineContent: Omit<Line, 'id' | 'isTyping'>, isTypingOutput = false) => {
    const newLineId = Date.now().toString() + Math.random();
    const newLine: Line = { ...lineContent, id: newLineId, isTyping: isTypingOutput };
    setLines(prev => [...prev, newLine]);
    if (isTypingOutput) {
      setActiveTypingLineId(newLineId);
    }
    return newLineId;
  };

  const handleFinishedTyping = useCallback((finishedLineId: string) => {
    setLines(prevLines =>
      prevLines.map(l => {
        if (l.id === finishedLineId) {
          return { ...l, isTyping: false };
        }
        return l;
      })
    );

    const lineJustFinished = lines.find(l => l.id === finishedLineId);

    if (finishedLineId === activeTypingLineId) {
      // if (lineJustFinished?.originalCommandType === 'reloadWithBios') {
      //   // This logic was for the removed 'restart' command
      //   // if (typeof window !== "undefined") {
      //   //   sessionStorage.removeItem(SESSION_STORAGE_KEY);
      //   //   window.location.reload();
      //   // }
      // } else {
        setIsProcessing(false);
        setActiveTypingLineId(null);
        scrollToBottom(); // Scroll one last time after processing is done
      // }
    }
  }, [activeTypingLineId, lines, scrollToBottom]);


  useEffect(() => {
    const initialLine = lines.find(l => l.id === initialWelcomeLineId);
    if (initialLine?.isTyping) {
        setIsProcessing(true);
        setActiveTypingLineId(initialWelcomeLineId);
    } else if (initialLine && !initialLine.isTyping){
        setIsProcessing(false);
        setActiveTypingLineId(null);
    }
  }, [initialWelcomeLineId, lines]);

  const initialCommandContext = {
    aboutMe: aboutMeTerminalObject,
    socialLinks: socialLinks,
    projects: projectsPlaceholder,
    skills: skillsData,
    education: educationItems,
    experience: experienceItems,
    courses: courseItems,
    certificates: certificateItems,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCommandSubmit = async () => {
    if (isProcessing || !input.trim()) {
       if (!input.trim() && !isProcessing) {
          addLine({ type: 'input', text: `${PROMPT}${input}` });
          setInput('');
          scrollToBottom();
       }
      return;
    }

    const commandToProcess = input.trim();

    addLine({ type: 'input', text: `${PROMPT}${commandToProcess}` });

    if (commandToProcess) {
      setHistory(prev => [commandToProcess, ...prev].slice(0, 50));
    }
    setHistoryIndex(-1);
    setInput('');
    setIsProcessing(true);

    const output: CommandOutput = await processCommand(commandToProcess, { ...initialCommandContext, commands: {} });


    if (output.type === 'clear') {
      setLines([]);
      setIsProcessing(false);
      setActiveTypingLineId(null);
    } else if (output.type === 'projectList' && output.projectsData) {
        const projectElements = (
            <div>
              <p className="mb-1">Available Projects (click to view details):</p>
              <ul className="list-disc list-inside pl-2">
                {output.projectsData.map(project => (
                  <li key={project.id}>
                    <Link href={`/projects/${project.id}`} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </Link>
                    <span className="text-muted-foreground text-xs"> - {project.techTags.join(', ')}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        addLine({ type: 'html', jsx: projectElements });
        setIsProcessing(false);
        setActiveTypingLineId(null);
    } else if (output.jsx) {
         addLine({ type: 'html', jsx: output.jsx });
         setIsProcessing(false);
         setActiveTypingLineId(null);
    } else if (output.text) {
      const lineData: Omit<Line, 'id' | 'isTyping'> = { type: 'output', text: output.text };
      // if (output.type === 'reloadWithBios') { // Logic for removed restart command
      //   lineData.originalCommandType = 'reloadWithBios';
      // }
      const outputId = addLine(lineData, true);
      setActiveTypingLineId(outputId);
    } else if (output.error) {
      const outputId = addLine({ type: 'error', text: output.error }, true);
      setActiveTypingLineId(outputId);
    } else {
        setIsProcessing(false);
        setActiveTypingLineId(null);
    }
    scrollToBottom();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommandSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setLines([]);
        setIsProcessing(false);
        setActiveTypingLineId(null);
    }
  };

  return (
    <div
      className="w-full h-[500px] max-w-4xl mx-auto rounded-lg shadow-2xl overflow-hidden border-2 border-primary/30 bg-black/90 backdrop-blur-sm flex flex-col"
      onClick={focusInput}
    >
      <div className="flex items-center h-8 px-3 bg-gray-800/50 border-b border-primary/20">
        <div className="flex space-x-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
        </div>
        <div className="flex-grow text-center text-xs font-mono text-gray-400">
          guest@mohit.dev: /home/guest
        </div>
        <div className="w-12"> </div>
      </div>
      <div 
        ref={scrollRef} 
        className="flex-grow p-3 font-mono text-green-400 overflow-y-auto leading-relaxed space-y-1 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-black/50 text-xs sm:text-sm" // Responsive text size
      >
        {lines.map((line) => (
          <div key={line.id}>
            {line.type === 'input' && <span>{line.text}</span>}

            {line.type === 'output' && line.isTyping && activeTypingLineId === line.id && <TypingLine text={line.text || ''} onFinished={() => handleFinishedTyping(line.id)} scrollRef={scrollRef} />}
            {line.type === 'output' && (!line.isTyping || activeTypingLineId !== line.id) && <span dangerouslySetInnerHTML={{ __html: (line.text || '').replace(/\n/g, '<br/>') }} />}

            {line.type === 'error' && line.isTyping && activeTypingLineId === line.id && <span className="text-red-400"><TypingLine text={line.text || ''} onFinished={() => handleFinishedTyping(line.id)} scrollRef={scrollRef} /></span>}
            {line.type === 'error' && (!line.isTyping || activeTypingLineId !== line.id) && <span className="text-red-400" dangerouslySetInnerHTML={{ __html: (line.text || '').replace(/\n/g, '<br/>') }} />}

            {line.type === 'html' && line.jsx}
          </div>
        ))}
        {!isProcessing && (
          <div className="flex items-center">
            <span className="text-green-400">{PROMPT}</span>
            <Input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-transparent border-0 text-green-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none p-0 ml-1 h-auto placeholder-muted-foreground/70" // text-sm for input is inherited or can be set here
              placeholder="Type a command..."
              spellCheck="false"
              autoComplete="off"
              disabled={isProcessing}
            />
          </div>
        )}
         {isProcessing && activeTypingLineId && <div className="h-6"></div>} {/* Placeholder for cursor when input is hidden */}
      </div>
    </div>
  );
}

    