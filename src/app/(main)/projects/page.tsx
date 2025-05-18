
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, Layers, Info, FolderOpen } from "lucide-react";
import { projectsPlaceholder } from "@/lib/constants";

export default function ProjectsPage() {
  if (!projectsPlaceholder || projectsPlaceholder.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <FolderOpen className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold text-primary mb-3">No Projects Available</h1>
        <p className="text-muted-foreground max-w-md">
          It seems there are no projects to display at the moment. Please check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">My Projects</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Here are some of the projects I've worked on. Click on them to learn more.
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsPlaceholder.map((project) => (
          <Card key={project.id} className="group flex flex-col bg-card/70 border-border hover:border-accent shadow-lg hover:shadow-accent/20 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative">
            <CardHeader className="p-0 relative">
              {project.imageUrls && project.imageUrls.length > 0 ? (
                <Image
                  src={project.imageUrls[0]} // Use the first image as thumbnail
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover project-card-image"
                  data-ai-hint={project.dataAiHint || "project image"}
                />
              ) : (
                <div className="w-full h-48 bg-muted flex items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}
              <div className="absolute inset-0 p-4 bg-black/80 opacity-0 group-hover:opacity-100 project-card-hover-content flex flex-col justify-center items-start text-sm overflow-y-auto">
                <div className="mb-2">
                    <h4 className="font-semibold text-accent flex items-center mb-1"><Layers size={16} className="mr-2" /> Full Tech Stack:</h4>
                    <div className="flex flex-wrap gap-1">
                        {project.fullTechStack.map(tech => (
                            <Badge key={tech} variant="secondary" className="text-xs bg-primary/30 text-primary">{tech}</Badge>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-accent flex items-center mb-1"><Info size={16} className="mr-2" /> Why I built this:</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{project.whyIBuiltThis}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="text-2xl mb-2 text-primary group-hover:text-accent transition-colors">{project.title}</CardTitle>
              <CardDescription className="text-muted-foreground mb-4 line-clamp-3 group-hover:line-clamp-none transition-all">
                {project.description}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techTags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-6 border-t border-border/20 flex justify-between items-center">
              <Button variant="outline" asChild className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all transform hover:scale-105 active:scale-95">
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Link>
              </Button>
              {project.liveDemoUrl && (
                 <Button variant="default" asChild className="bg-primary text-primary-foreground hover:bg-primary/80 transition-all transform hover:scale-105 active:scale-95">
                  <Link href={`/projects/${project.id}`}>
                    <ExternalLink className="mr-2 h-4 w-4" /> View Details
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
