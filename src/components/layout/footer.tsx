
'use client'; // Add this directive

import dynamic from 'next/dynamic';

// Dynamically import the client-side footer component with SSR turned off.
// This ensures it only renders on the client, avoiding hydration issues
// related to server-rendered content (like dynamic dates or link data from JSON)
// not matching the client's initial render.
const FooterClient = dynamic(() => import('./footer-client'), { ssr: false });

export function Footer() {
  return <FooterClient />;
}
