import * as React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10.15,16.43a5.52,5.52,0,1,1,0-8.86" />
      <path d="M13.85,7.57a5.52,5.52,0,1,1,0,8.86" />
    </svg>
  );
}
