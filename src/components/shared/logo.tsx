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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
      <path d="M12 15.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
      <path d="M12 20.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
      <path d="m4.5 13 3-2.5" />
      <path d="m19.5 13-3-2.5" />
      <path d="m4.5 18 3-2.5" />
      <path d="m19.5 18-3-2.5" />
      <path d="m14.5 13 3-2.5" />
      <path d="m9.5 8-3-2.5" />
    </svg>
  );
}
