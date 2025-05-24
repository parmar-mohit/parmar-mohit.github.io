
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, FileWarning } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projectsPlaceholder } from "@/lib/constants";
import { ImageCarousel } from "@/components/ui/image-carousel"; // Import the new carousel

import fs from 'fs';
import path from 'path';

// Helper function to get project details
const getProjectDetails = async (projectId: string) => {
  return projectsPlaceholder.find(p => p.id === projectId);
};

export async function generateStaticParams() {
  const projectsDataPath = path.join(process.cwd(), 'src', 'data', 'projects.json');
  const projectsData = JSON.parse(fs.readFileSync(projectsDataPath, 'utf8'));

  return projectsData.map((project: { id: string }) => ({
    projectId: project.id,
  }));
}

export default async function ProjectDetailPage({ params }:  { params: { projectId: string }}) {
  const project = await getProjectDetails(params.projectId);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <FileWarning className="mx-auto h-16 w-16 text-destructive mb-6" />
        <h1 className="text-3xl font-bold text-destructive mb-3">Project Not Found</h1>
        <p className="text-muted-foreground max-w-md mb-6">
          The project you are looking for does not exist or has been moved.
        </p>
        <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
          <Link href="/projects"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header className="relative mb-8">
        {project.imageUrls && project.imageUrls.length > 0 ? (
          <ImageCarousel 
            imageUrls={project.imageUrls} 
            altText={`${project.title} showcase`}
            className="h-64 md:h-96" // Maintain aspect ratio if needed
          />
        ) : (
          <div className="w-full h-64 md:h-96 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
            No images available for this project.
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4 rounded-lg pointer-events-none">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">{project.title}</h1>
        </div>
      </header>

      <Button asChild variant="outline" className="mb-8 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
        <Link href="/projects"><ArrowLeft className="mr-2 h-4 w-4" /> Back to All Projects</Link>
      </Button>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card className="bg-card/70 border-border/30 shadow-lg">
            <CardHeader><CardTitle className="text-2xl text-primary">About This Project</CardTitle></CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed prose prose-invert max-w-none">
              <p>{project.description}</p>
            </CardContent>
          </Card>

          {project.screenshots && project.screenshots.length > 0 && (
            <Card className="bg-card/70 border-border/30 shadow-lg">
              <CardHeader><CardTitle className="text-2xl text-primary">Screenshots</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.screenshots.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    alt={`${project.title} screenshot ${index + 1}`}
                    width={600}
                    height={400}
                    style={{ objectFit: 'contain' }}
    				className="rounded-md"
                  />
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <aside className="space-y-6">
          <Card className="bg-card/70 border-border/30 shadow-lg">
            <CardHeader><CardTitle className="text-xl text-primary">Tech Stack</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {project.fullTechStack.map(tech => (
                <Badge key={tech} variant="secondary" className="bg-primary/20 text-primary">{tech}</Badge>
              ))}
            </CardContent>
          </Card>

          {project.challenges && project.challenges.length > 0 && (
            <Card className="bg-card/70 border-border/30 shadow-lg">
              <CardHeader><CardTitle className="text-xl text-primary">Challenges Faced</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {project.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card className="bg-card/70 border-border/30 shadow-lg">
            <CardHeader><CardTitle className="text-xl text-primary">Project Links</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" asChild className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> View on GitHub
                </Link>
              </Button>
              {project.liveDemoUrl && (
                <Button variant="default" asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/80">
                  <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> View Live Demo
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
