
'use client'; // Still needed for useEffect for CRT or other client-side enhancements, but simpler

import { GeistSans, GeistMono } from 'geist/font';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

// Metadata should be handled in a Server Component if needed (e.g., in the main page.tsx).

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // State to manage main content visibility for a smooth fade-in,
  // even without BIOS, to prevent FOUC if there are heavy client components.
  const [mainContentVisible, setMainContentVisible] = useState(false);

  useEffect(() => {
    // Ensure content becomes visible after initial client mount
    setMainContentVisible(true);
  }, []);

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
