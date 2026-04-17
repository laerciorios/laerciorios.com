"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";
import Typography from "@/app/components/Typography";

interface HeaderItemProps {
  text: string;
  href: string;
}

export default function HeaderItem({ text, href }: HeaderItemProps) {
  const pathname = usePathname();
  // home href has 1 path segment (/en), other pages have 2+ (/en/projects)
  const isLocaleRoot = href.split("/").filter(Boolean).length === 1;
  const isActive = pathname === href || (!isLocaleRoot && pathname.startsWith(href + "/"));

  return (
    <Link href={href} className={`${styles.headerItem} ${isActive ? styles.active : ""}`}>
      <Typography variant="body2" as="span">{text}</Typography>
    </Link>
  );
}
