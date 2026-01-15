import React, { ElementType, HTMLAttributes } from "react";
import styles from "./styles.module.css";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body1"
  | "body2"
  | "body3"
  | "caption1"
  | "caption2"
  | "caption3"
  | "caption4";

const tags: Record<Variant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body1: "p",
  body2: "p",
  body3: "p",
  caption1: "span",
  caption2: "span",
  caption3: "span",
  caption4: "span",
};

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
}

export default function Typography({
  variant = "body1",
  children,
  className = "",
  as,
  ...props
}: TypographyProps) {
  const sizeClass = styles[variant];
  const Tag = as || tags[variant];

  return (
    <Tag className={`${styles.base} ${sizeClass} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
