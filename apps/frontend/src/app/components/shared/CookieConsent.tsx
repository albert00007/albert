'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

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
