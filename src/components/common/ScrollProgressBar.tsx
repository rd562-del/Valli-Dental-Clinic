import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight === 0) return;
      setProgress((totalScroll / windowHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-slate-200/20 dark:bg-slate-800/20 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-400 transition-all duration-150 ease-out shadow-sm shadow-sky-500/50"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
