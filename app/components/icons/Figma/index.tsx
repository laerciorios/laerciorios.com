export function Figma(props: React.SVGProps<SVGSVGElement>) {
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
        d="M12 2H8.5a3.5 3.5 0 100 7M12 2v7m0-7h3.5a3.5 3.5 0 110 7M12 9H8.5M12 9h3.5M12 9v7M8.5 9a3.5 3.5 0 000 7m7-7a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm-7 7a3.5 3.5 0 103.5 3.5V16m-3.5 0H12"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
