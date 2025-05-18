
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Assuming Button component is available

export default function NotFound() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Optional: Redirect after a key press or timeout
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Could redirect here, e.g., window.location.href = '/';
      // For now, just console log
      console.log(`Key pressed: ${event.key}`);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="fixed inset-0 bg-blue-800 text-white font-mono flex flex-col items-center justify-center p-4 z-[9999]">
      <div className="w-full max-w-3xl text-center">
        <p className="text-2xl mb-4">A problem has been detected and PortfolioOS has been shut down to prevent damage to your browsing experience.</p>
        <p className="text-lg mb-6">PAGE_NOT_FOUND_IN_NONPAGED_AREA</p>
        
        <p className="text-sm mb-2">If this is the first time you've seen this Stop error screen, restart your computer. If this screen appears again, follow these steps:</p>
        
        <ul className="text-left text-sm list-disc list-inside mb-6 mx-auto max-w-xl">
          <li>Check to make sure any new hardware or software is properly installed. If this is a new installation, ask your hardware or software manufacturer for any PortfolioOS updates you might need.</li>
          <li>If problems continue, disable or remove any newly installed hardware or software. Disable BIOS memory options such as caching or shadowing. If you need to use Safe Mode to remove or disable components, restart your computer, press F8 to select Advanced Startup Options, and then select Safe Mode.</li>
        </ul>

        <p className="text-sm mb-2">Technical information:</p>
        <p className="text-sm mb-6">*** STOP: 0x000000404 (0x000000C2, 0x84F12000, 0x84F12A80, 0x00000001)</p>
        
        <p className="text-lg mb-8">Collecting data for crash dump {dots}</p>
        <p className="text-xl mb-4">Initializing disk for crash dump...</p>
        <p className="text-xl mb-8">Physical memory dump complete.</p>
        
      </div>
       <div className="absolute bottom-8">
         <Button variant="outline" asChild className="bg-blue-700 border-blue-500 hover:bg-blue-600 text-white hover:text-white">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}

