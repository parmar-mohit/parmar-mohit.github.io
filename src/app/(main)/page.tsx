
import { HeroSection } from '@/components/sections/home/hero-section';
import { PageSnippetsGrid } from '@/components/sections/home/page-snippets-grid';
import { GithubActivityLeetCodeStats } from '@/components/sections/home/github-activity-leetcode-stats';
import { HackerDashboard } from '@/components/sections/home/hacker-dashboard';
import { InteractiveTerminal } from '@/components/client/interactive-terminal'; // Import the new terminal

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="py-12 md:py-16"> {/* Section for the terminal */}
        <div className="container mx-auto px-4">
            <InteractiveTerminal />
        </div>
      </section>
      <GithubActivityLeetCodeStats />
      <PageSnippetsGrid />
      <HackerDashboard /> 
    </>
  );
}
