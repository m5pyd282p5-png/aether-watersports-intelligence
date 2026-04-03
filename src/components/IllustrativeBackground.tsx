import React from 'react';
export function IllustrativeBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 opacity-20 dark:opacity-10">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 200 Q 250 150 500 200 T 1000 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary/40 animate-float"
        />
        <path
          d="M 0 400 Q 300 450 600 400 T 1000 400"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-accent/30"
          style={{ animation: 'float 4s ease-in-out infinite' }}
        />
        <circle cx="850" cy="150" r="100" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="10 5" className="text-primary/20" />
        <g className="text-muted-foreground/30">
          <path d="M 50 100 l 30 0 M 60 110 l 20 0 M 55 120 l 25 0" stroke="currentColor" strokeWidth="1" />
          <path d="M 900 800 l 40 0 M 910 815 l 25 0" stroke="currentColor" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}