import React from 'react';

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 16l-4 4-4-4 5.293-5.293a1 1 0 011.414 0L10 12m0 0l-2.293-2.293a1 1 0 00-1.414 0L3 14m14-4l2.293 2.293a1 1 0 010 1.414L16 20l-4-4 5.293-5.293a1 1 0 011.414 0L16 14m-4-4l-2.293-2.293a1 1 0 00-1.414 0L7 10"
    />
  </svg>
);