import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface PageLoaderProps {
  onLoaded: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFadeOut(true);
          setTimeout(() => {
            onLoaded();
          }, 450);
          return 100;
        }
        return prev + Math.floor(Math.random() * 18 + 12);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-[1000] bg-slate-950 flex flex-col items-center justify-center select-none transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Decorative Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-sky-500/15 blur-[100px] animate-pulse" />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated Tooth Vector Logo */}
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-sky-500 via-blue-600 to-cyan-400 opacity-20 blur-xl animate-pulse" />
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-500 via-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-2xl shadow-sky-500/40 animate-float">
            <svg
              className="w-11 h-11 text-white animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C6.5 2 4 6.5 4 10c0 4 2.5 8 5 10 .8.6 1.7.8 2.5.5 1-.3 1.5-1.5 2.5-1.5s1.5 1.2 2.5 1.5c.8.3 1.7.1 2.5-.5 2.5-2 5-6 5-10 0-3.5-2.5-8-8-8z" />
              <path d="M12 7v5" />
              <path d="M9.5 9.5h5" />
            </svg>
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-cyan-400 animate-bounce" />
        </div>

        {/* Clinic Name */}
        <h1 className="text-2xl font-extrabold font-heading tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-400 bg-clip-text text-transparent">
          Valli Dental Clinic
        </h1>
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400 mt-1 mb-6">
          Premium Luxury Dental Care • Chennai
        </p>

        {/* Progress Bar Container */}
        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-400 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full mt-2 text-xs font-mono text-slate-500">
          <span>Loading 3D WebGL Engine...</span>
          <span className="font-bold text-sky-400">{Math.min(100, progress)}%</span>
        </div>
      </div>
    </div>
  );
};
