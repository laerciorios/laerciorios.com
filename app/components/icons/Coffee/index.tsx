export function Coffee(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 2v2M14 2v2M16 8a1 1 0 011 1v8a4 4 0 01-4 4H7a4 4 0 01-4-4V9a1 1 0 011-1h14a4 4 0 110 8h-1M6 2v2"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
