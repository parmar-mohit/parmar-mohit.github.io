
'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { projectsPlaceholder } from '@/lib/constants';
import { Cpu } from 'lucide-react';

type ProjectProcess = {
  id: string;
  name: string;
  cpu: number;
  mem: number;
  status: 'Running' | 'Idle' | 'Error';
};

export function HackerDashboard() {
  const [processes, setProcesses] = useState<ProjectProcess[]>([]);

  useEffect(() => {
    const projectProcs = projectsPlaceholder.map(project => ({
      id: project.id,
      name: project.title, // Using title as name, will be used for linking
      cpu: Math.floor(Math.random() * 60) + 20,
      mem: Math.floor(Math.random() * 500) + 100,
      status: (Math.random() > 0.1 ? 'Running' : 'Idle') as 'Running' | 'Idle',
    }));
    setProcesses(projectProcs);

    const processInterval = setInterval(() => {
      setProcesses(prevProcs =>
        prevProcs.map(p => ({
          ...p,
          cpu: Math.max(5, Math.min(95, p.cpu + (Math.random() * 10 - 5))),
          mem: Math.max(50, Math.min(1024, p.mem + (Math.random() * 50 - 25))),
          status: p.status === 'Error' && Math.random() < 0.8 ? 'Error' : (Math.random() > 0.1 ? 'Running' : (Math.random() > 0.5 ? 'Idle' : 'Error')),
        }))
      );
    }, 1500);

    return () => {
      clearInterval(processInterval);
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background/70">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Projects Status
        </h2>
        <div className="max-w-3xl mx-auto"> {/* Centering the single card */}
          <Card className="bg-card/80 border-primary/30 shadow-xl hover:shadow-accent/20 transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-accent">
                <Cpu className="mr-3 h-6 w-6" /> ACTIVE_PROCESS_MONITOR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80 w-full pr-2">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="pb-2 font-normal">PID</th>
                      <th className="pb-2 font-normal">PROCESS_NAME</th>
                      <th className="pb-2 font-normal text-right">CPU%</th>
                      <th className="pb-2 font-normal text-right">MEM_MB</th>
                      <th className="pb-2 font-normal text-center">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processes.map((proc, index) => (
                      <tr key={proc.id} className="border-t border-border/20 font-mono hover:bg-primary/10">
                        <td className="py-1.5">{(1000 + index).toString()}</td>
                        <td className="py-1.5 truncate max-w-[150px] sm:max-w-xs" title={proc.name}>
                          <Link href={`/projects/${proc.id}`} className="hover:text-accent hover:underline transition-colors">
                            {proc.name}
                          </Link>
                        </td>
                        <td className={`py-1.5 text-right ${proc.cpu > 75 ? 'text-destructive' : 'text-foreground/80'}`}>{proc.cpu.toFixed(1)}</td>
                        <td className={`py-1.5 text-right ${proc.mem > 700 ? 'text-destructive' : 'text-foreground/80'}`}>{proc.mem.toFixed(0)}</td>
                        <td className={`py-1.5 text-center font-semibold ${
                          proc.status === 'Error' ? 'text-destructive animate-pulse' : 
                          proc.status === 'Running' ? 'text-primary' : 
                          'text-muted-foreground'
                        }`}>
                          {proc.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
