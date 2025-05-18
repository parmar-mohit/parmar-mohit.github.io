
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, FileText } from "lucide-react";
import { blogPostsPlaceholder } from "@/lib/constants";

export default function BlogsPage() {
  if (!blogPostsPlaceholder || blogPostsPlaceholder.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold text-primary mb-3">No Blog Posts Yet</h1>
        <p className="text-muted-foreground max-w-md">
          There are no blog posts to display at the moment. Stay tuned for insights and articles!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">My Blog</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Thoughts, tutorials, and insights on software development and technology.
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPostsPlaceholder.map((post) => (
          <Card key={post.id} className="group flex flex-col bg-card/70 border-border hover:border-accent shadow-lg hover:shadow-accent/20 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
            <Link href={`/blogs/${post.id}`} className="block relative">
                {post.imageUrls && post.imageUrls.length > 0 ? (
                  <Image
                    src={post.imageUrls[0]} // Use the first image as thumbnail
                    alt={post.title}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-50"
                    data-ai-hint={post.dataAiHint || "blog banner"}
                  />
                ) : (
                  <div className="w-full h-48 bg-muted flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
                <div className="absolute inset-0 p-4 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end blog-card-hover-details">
                  <p className="text-muted-foreground text-xs mb-1 line-clamp-none">{post.longExcerpt}</p>
                  <p className="text-xs text-accent flex items-center"><Clock size={12} className="mr-1"/>{post.estimatedReadingTime}</p>
                </div>
            </Link>
            <CardHeader className="p-6">
              <CardTitle className="text-2xl mb-1 text-primary group-hover:text-accent transition-colors">
                <Link href={`/blogs/${post.id}`}>{post.title}</Link>
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 flex-grow">
              <p className="text-muted-foreground mb-4 line-clamp-3 group-hover:hidden">{post.snippet}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="border-primary/50 text-primary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-6 border-t border-border/20">
              <Link href={`/blogs/${post.id}`} className="text-accent hover:text-accent-foreground font-semibold flex items-center group/link transition-all transform hover:scale-105 active:scale-95">
                Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
