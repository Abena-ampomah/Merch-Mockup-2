import React from 'react';

export const TshirtIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      transform="scale(0.8) translate(3, 2)"
    />
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 4h6l2 2v2H7V6l2-2zM5 8v11a1 1 0 001 1h12a1 1 0 001-1V8"
    />
  </svg>
);
