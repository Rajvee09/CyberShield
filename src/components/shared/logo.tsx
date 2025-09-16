import * as React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 12h-2a4 4 0 1 0 0-8h2" />
      <path d="M18 20a4 4 0 1 1-4-4h2a4 4 0 1 0 0-8h-2" />
    </svg>
  );
}
