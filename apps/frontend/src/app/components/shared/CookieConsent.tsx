'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  // null = undetermined, true = show, false = hide
  const [showBanner, setShowBanner] = useState<boolean | null>(null);

  useEffect(() => {
    // This code only runs on the client, after the component has mounted.
    const consent = localStorage.getItem('cookie-consent');
    setShowBanner(consent !== 'true');
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowBanner(false);
  };

  // Don't render anything on the server or if consent is given/undetermined.
  if (showBanner === null || !showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 bg-[#09090B] border border-cyan-500/20 shadow-2xl rounded-sm flex items-center gap-4 max-w-xs font-mono">
      <div className="text-xs text-gray-400">
        {'>'} system.cookies.enable()
      </div>
      <div className="flex shrink-0">
        <button 
          onClick={handleAccept}
          className="text-xs text-cyan-400 hover:text-purple-400 transition-colors uppercase tracking-widest cursor-pointer"
        >
          [Y/n]
        </button>
      </div>
    </div>
  );
}
