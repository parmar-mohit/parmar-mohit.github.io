'use client';

import { GeistSans, GeistMono } from 'geist/font';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

// Metadata should be handled in a Server Component if needed (e.g., in the main page.tsx)
// for better SEO. Since this RootLayout is a client component (for smooth fade-in effects),
// we set the document title client-side.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // State to manage main content visibility for a smooth fade-in,
  // to prevent FOUC if there are heavy client components.
  const [mainContentVisible, setMainContentVisible] = useState(false);

  useEffect(() => {
    // Set the document title
    document.title = "Mohit Parmar";

    // Ensure content becomes visible after initial client mount
    setMainContentVisible(true);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <html lang="en" className="dark">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-mono antialiased bg-background`}>
        <div
          className={cn(
            "crt-effect", // CRT effect always applied
            mainContentVisible ? 'opacity-100 transition-opacity duration-500 ease-in-out' : 'opacity-0'
          )}
        >
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
