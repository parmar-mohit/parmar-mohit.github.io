import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TerminalWindowProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  showPrompt?: boolean;
  promptText?: string;
};

export function TerminalWindow({
  title = 'bash',
  children,
  className,
  contentClassName,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        'w-full max-w-2xl mx-auto rounded-lg shadow-2xl overflow-hidden border-2 border-primary/30 bg-black/80 backdrop-blur-sm',
        className
      )}
    >
      <div className="flex items-center h-10 px-4 bg-gradient-to-b from-gray-800 to-gray-900 border-b border-primary/20">
        <div className="flex space-x-2">
          <span className="h-3 w-3 rounded-full bg-red-500"></span>
          <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </div>
        <div className="flex-grow text-center text-sm font-mono text-gray-400">
          {title}
        </div>
        <div className="w-16"> {/* Spacer to balance traffic lights */} </div>
      </div>
      <div className={cn('p-6 font-mono text-sm text-green-400 overflow-y-auto h-96 leading-relaxed', contentClassName)}>
        {children}
      </div>
    </div>
  );
}
