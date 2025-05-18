
'use server';

import React from 'react';
import type { SkillCategory, SocialLink, Project, EducationItem, ExperienceItem, CourseItem, CertificateItem } from './constants';
import Link from 'next/link';

export interface CommandOutput {
  type: 'text' | 'error' | 'jsx' | 'clear' | 'projectList';
  text?: string;
  jsx?: React.ReactNode;
  projectsData?: Project[];
  error?: string;
}

interface CommandContext {
  aboutMe: Record<string, any>;
  socialLinks: SocialLink[];
  projects: Project[];
  skills: SkillCategory[];
  education: EducationItem[];
  experience: ExperienceItem[];
  courses: CourseItem[];
  certificates: CertificateItem[];
  commands: Record<string, CommandDefinition>;
}

interface CommandDefinition {
  description: string;
  execute: (args: string[], context: CommandContext) => Promise<CommandOutput> | CommandOutput;
}

const formatSkills = (skillsDataArg: SkillCategory[]): string => {
  let output = 'Available Skills:\n';
  skillsDataArg.forEach(category => {
    output += `\n  <span class="text-accent">${category.name}</span>:\n`;
    category.skills.forEach(skill => {
      output += `    - ${skill.name} ${skill.badge ? `(<span class="text-primary/80">${skill.badge}</span>)` : ''}\n`;
    });
  });
  return `<pre>${output}</pre>`;
};

const formatGenericTimelineItems = (items: Array<{id: string, title: string, date: string, description: string}>, sectionTitle: string): string => {
  let output = `${sectionTitle}:\n\n`;
  items.forEach(item => {
    output += `<span class="text-accent">${item.title}</span>\n`;
    output += `  Date: ${item.date}\n`;
    output += `  Description: ${item.description.replace(/\n/g, '\n               ')}\n\n`;
  });
  return `<pre>${output}</pre>`;
};


const commands: Record<string, CommandDefinition> = {
  help: {
    description: 'Displays a list of available commands.',
    execute: (_args, context) => {
      let helpText = 'Available commands:\n\n';
      const commandList = Object.keys(context.commands).sort();
      for (const cmd of commandList) {
        helpText += `<span class="text-accent">${cmd.padEnd(25, ' ')}</span> - ${context.commands[cmd].description}\n`;
      }
      helpText += "\nShortcuts:\n  Ctrl+L - Clear screen\n  Up/Down Arrows - Command history\n";
      return { type: 'text', text: `<pre>${helpText}</pre>` };
    },
  },
  whoami: {
    description: 'Displays information about Mohit Parmar.',
    execute: (_args, context) => {
      const { ...infoWithoutQuote } = context.aboutMe; // Removed quote property if it exists
      const filteredInfo = Object.fromEntries(
        Object.entries(infoWithoutQuote).filter(([key]) => key !== 'quote')
      );
      const formattedJson = `<pre>${JSON.stringify(filteredInfo, null, 2)}</pre>`;
      return { type: 'text', text: formattedJson };
    },
  },
  'ls skills': {
    description: 'Lists all available skills by category.',
    execute: (_args, context) => {
      return { type: 'text', text: formatSkills(context.skills) };
    },
  },
  'ls projects': {
    description: 'Lists all projects with links to their detail pages.',
    execute: (_args, context) => {
      return { type: 'projectList', projectsData: context.projects };
    },
  },
  'ls education': {
    description: 'Displays educational background.',
    execute: (_args, context) => {
      return { type: 'text', text: formatGenericTimelineItems(context.education, 'Education') };
    }
  },
  'ls experience': {
    description: 'Displays work experience.',
    execute: (_args, context) => {
      return { type: 'text', text: formatGenericTimelineItems(context.experience, 'Work Experience') };
    }
  },
  'ls courses': {
    description: 'Displays completed courses.',
    execute: (_args, context) => {
      return { type: 'text', text: formatGenericTimelineItems(context.courses, 'Courses') };
    }
  },
  'ls certificates': {
    description: 'Displays professional certificates.',
    execute: (_args, context) => {
      return { type: 'text', text: formatGenericTimelineItems(context.certificates, 'Certificate') };
    }
  },
  contact: {
    description: 'Displays contact information and social links.',
    execute: (_args, context) => {
      let contactText = 'Connect with me:\n\n';
      context.socialLinks.forEach(link => {
        contactText += `<span class="text-accent">${link.name}:</span> <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${link.url}</a>\n`;
      });
      return { type: 'text', text: `<pre>${contactText}</pre>` };
    },
  },
  date: {
    description: 'Displays the current date and time.',
    execute: () => {
      return { type: 'text', text: `<pre>${new Date().toString()}</pre>` };
    },
  },
  pwd: {
    description: 'Prints the current working directory (simulated).',
    execute: () => {
      return { type: 'text', text: '<pre>Earth/India/Maharashtra/Mumbai</pre>' };
    }
  },
  clear: {
    description: 'Clears the terminal screen.',
    execute: () => {
      return { type: 'clear' };
    },
  },
};


export async function processCommand(input: string, baseContext: Omit<CommandContext, 'commands'>): Promise<CommandOutput> {
  const [commandName, ...args] = input.trim().split(/\s+/);

  const context: CommandContext = {
    ...baseContext,
    commands: commands
  };

  let commandToExecute = commandName.toLowerCase();

  if (commandName.toLowerCase() === 'ls' && args.length > 0) {
    const subCommand = args[0].toLowerCase();
    const fullLsCommand = `ls ${subCommand}`;
    if (commands[fullLsCommand]) {
      commandToExecute = fullLsCommand;
      args.shift();
    }
  }

  const commandDef = commands[commandToExecute];

  if (commandDef) {
    try {
      return await commandDef.execute(args, context);
    } catch (e: any) {
      return { type: 'error', error: `<pre>Error executing command ${commandToExecute}: ${e.message}</pre>` };
    }
  }
  return { type: 'error', error: `<pre>Unknown command: <span class="text-red-400">${input.split(' ')[0]}</span>. Type 'help' for available commands.</pre>` };
}
