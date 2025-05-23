
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileWarning } from "lucide-react";
import Link from "next/link";
// import Image from "next/image"; // Image import removed as ImageCarousel handles images
import { Button } from "@/components/ui/button";
import blogPostsData from '@/data/blogPosts.json';

const blogPostsPlaceholder = blogPostsData; // Use the imported data
import { ImageCarousel } from "@/components/ui/image-carousel"; // Import the new carousel

// Helper function to get a single blog post
const getBlogPost = async (blogId: string) => {
  return blogPostsPlaceholder.find(p => p.id === blogId);
};

// Generate static params for each blog post
export async function generateStaticParams() {
 return blogPostsPlaceholder.map((post) => ({
    blogId: post.id,
 }));
}

export default async function BlogPostPage({ params }: { params: { blogId: string } }) {
  const post = await getBlogPost(params.blogId);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <FileWarning className="mx-auto h-16 w-16 text-destructive mb-6" />
        <h1 className="text-3xl font-bold text-destructive mb-3">Blog Post Not Found</h1>
        <p className="text-muted-foreground max-w-md mb-6">
          The blog post you are looking for does not exist or has been moved.
        </p>
        <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
          <Link href="/blogs"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs</Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto py-8">
      <Button asChild variant="outline" className="mb-8 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
        <Link href="/blogs"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs</Link>
      </Button>

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">{post.title}</h1>
        <p className="text-muted-foreground text-sm">
          Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary">{tag}</Badge>
          ))}
        </div>
      </header>

      {post.imageUrls && post.imageUrls.length > 0 && (
         <ImageCarousel 
            imageUrls={post.imageUrls} 
            altText={`${post.title} images`}
            className="mb-8 max-h-[500px]" 
          />
      )}

      <div
        className="prose prose-invert prose-lg max-w-none text-foreground
                   prose-headings:text-primary prose-a:text-accent prose-strong:text-accent-foreground
                   prose-blockquote:border-accent prose-code:text-accent prose-code:bg-card/80 prose-code:p-1 prose-code:rounded-sm
                   prose-pre:bg-card/80 prose-pre:p-4 prose-pre:rounded-md prose-pre:border prose-pre:border-border/30"
      >
        {(post.content || "No content available for this post.").split('\\n\\n').map((paragraph, index) => {
          if (paragraph.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3 text-primary/90">{paragraph.substring(3)}</h2>;
          }
          if (paragraph.startsWith('### ')) {
            return <h3 key={index} className="text-xl font-semibold mt-5 mb-2 text-primary/80">{paragraph.substring(4)}</h3>;
          }
          if (paragraph.startsWith('```')) {
            const codeContent = paragraph.replace(/```jsx\\n|```\\n|```/g, '');
            return <pre key={index}><code className="language-jsx">{codeContent}</code></pre>;
          }
          return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
        })}
      </div>
    </article>
  );
}
