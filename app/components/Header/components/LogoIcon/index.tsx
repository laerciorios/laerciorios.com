export default function LogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={34}
      height={34}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={34} height={34} rx={8} fill="#100000" />
      <path
        d="M8 8a3 3 0 013-3h12a3 3 0 013 3v6a3 3 0 01-3 3h-4.757l6.856 6.857a3 3 0 11-4.242 4.242L14 21.243V26a3 3 0 11-6 0V8z"
        fill="#fff"
      />
      <path
        d="M8 8a3 3 0 013-3h12a3 3 0 013 3v6a3 3 0 01-3 3h-4.757l6.856 6.857a3 3 0 11-4.242 4.242L14 21.243V26a3 3 0 11-6 0V8z"
        fill="#000"
        fillOpacity={0.1}
      />
      <path
        d="M11 5a3 3 0 00-3 3v18a3 3 0 003 3h12a3 3 0 100-6h-9V8a3 3 0 00-3-3z"
        fill="#fff"
      />
    </svg>
  );
}
