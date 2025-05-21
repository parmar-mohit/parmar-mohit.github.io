
import { Card, CardContent } from '@/components/ui/card';
import { coreTechStack } from '@/lib/constants';
import { Code2 } from 'lucide-react'; // Using Code2 as a generic icon for tech stack

// A simple mapping for illustrative purposes; ideally, you'd have specific icons
// Removed hardcoded text-color classes, SVGs will now inherit color via className prop
const iconComponents: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  SiJavascript: (props) => <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm21.38 10.23c.23-.51.38-1.06.38-1.67V8.3c0-.61-.15-1.16-.38-1.67L20.15 4.8c-.49-.98-1.2-1.69-2.18-2.18L16.14 1.4c-.51-.23-1.06-.38-1.67-.38h-.31c-.61 0-1.16.15-1.67.38L11.26 2.62c-.98.49-1.69 1.2-2.18 2.18L7.85 6.63c-.23.51-.38 1.06-.38 1.67v.31c0 .61.15 1.16.38 1.67l1.23 1.82c.49.98 1.2 1.69 2.18 2.18l1.82 1.23c.51.23 1.06.38 1.67.38h.31c.61 0 1.16-.15 1.67-.38l1.23-1.82c.98-.49 1.69-1.2 2.18-2.18zm-9.38 7.06H6V11.58h1.5v4.19h2.02v1.52zm3.4-3.66c0 .98-.37 1.72-.93 2.24-.61.51-1.4.77-2.42.77-.81 0-1.5-.19-2.06-.57v-1.4c.47.34.99.51 1.53.51.62 0 1.1-.14 1.44-.43s.51-.7.51-1.21v-.26c-.3.21-.68.32-1.14.32-.86 0-1.51-.23-2.01-.68s-.75-1.06-.75-1.81c0-.8.26-1.45.79-1.94s1.2-.74 2-.74c.46 0 .83.1 1.12.31v-.26h1.4v5.76zm-1.51-2.2c0-.42-.13-.75-.39-1s-.61-.37-1.04-.37c-.47 0-.84.13-1.12.39s-.42.6-.42.99c0 .42.14.75.42.99.28.25.65.37 1.12.37.43 0 .77-.12 1.04-.37.27-.25.39-.58.39-1.01z"/></svg>,
  SiReact: (props) => <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.29-8.71L12 15.01l5.29-3.72-1.41-1.41L12 12.18l-3.88-2.32-1.41 1.41zm0-2.82L12 12.18l5.29-3.72-1.41-1.41L12 9.36 8.12 7.04 6.71 8.45z"/></svg>,
  SiNodedotjs: (props) => <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.5 13.79c-.36.2-.76.3-1.2.3-.72 0-1.31-.23-1.77-.69-.46-.46-.68-1.05-.68-1.77 0-.71.23-1.3.68-1.76.46-.46 1.05-.68 1.77-.68.44 0 .84.1 1.2.3V9.58h-2.5V8.3h4v7.49h-1.5v-2zm-5.14-5.51c-.22.22-.33.51-.33.88v5.5c0 .36.11.65.33.87.22.22.51.33.87.33h.5c.37 0 .66-.11.88-.33.22-.22.32-.51.32-.87V9.95c0-.37-.1-.66-.32-.88-.22-.22-.51-.32-.88-.32h-.5c-.36 0-.65.1-.87.32zm-3.48 2.21c.22-.22.5-.33.86-.33.35 0 .63.11.85.33.22.22.33.5.33.85v3.66c0 .35-.11.64-.33.86-.22.22-.5.33-.85.33-.36 0-.64-.11-.86-.33-.22-.22-.33-.51-.33-.86V11.15c0-.35.11-.63.33-.85z"/></svg>,
  SiCss3: (props) => <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l-10 3.5v13L12 22l10-3.5v-13L12 2zm7.5 15.8l-7.5 2.62-7.5-2.62V6.2L12 3.58l7.5 2.62v11.6zM10.25 17h3.5l.75-3H9.5l-.37-1.5h5.75l.37-1.5H8.37l-.37-1.5h7.87L16.25 6H6.75l.75 3h7.13l-.38 1.5H7.88l-.38 1.5h6.38l-.75 3z"/></svg>,
  SiHtml5: (props) => <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M2 22h20L12 2 2 22zm16.4-2H5.6l6.4-14.4L18.4 20zm-10.8-2h1.6l.8-3.2h3.2l.8 3.2h1.6l-3.2-8L7.6 18zm4-4.8h-1.6l.8-3.2.8 3.2z"/></svg>,
  SiFirebase: (props) => <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M4.42 20.91l7.52-18.33 2.05 5.06-6.19 15.09-3.38-1.82zm14.77-13.49L12 2.58l-2.08 5.06 5.8 14.18 3.47-1.82zM12.24 13.4L9.89 7.72l-1.04 2.53 3.39 8.21z"/></svg>,
};


export function TechSkillsGrid() {
  return (
    <section className="py-16 md:py-24 bg-background ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Core Technologies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {coreTechStack.map((tech) => {
            const IconComponent = iconComponents[tech.iconName] || Code2;
            return (
              <Card 
                key={tech.name} 
                className="bg-card/70 border-border hover:border-accent shadow-md hover:shadow-accent/30 transition-all duration-300 transform hover:-translate-y-1"
                data-ai-hint="technology programming language"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
                  <IconComponent className="h-8 w-8 text-accent" />
                  <p className="text-lg font-semibold text-card-foreground">{tech.name}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

    