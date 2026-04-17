"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "../../../icons";
import ButtonCustom from "../../../ButtonCustom";
import Typography from "../../../Typography";
import styles from "./styles.module.css";

const CLOSE_DURATION = 150;

interface NavItem {
  text: string;
  href: string;
}

interface MobileMenuProps {
  navItems: NavItem[];
  ariaLabel?: string;
}

export default function MobileMenu({
  navItems,
  ariaLabel = "Menu",
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function close() {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, CLOSE_DURATION);
  }

  function toggle() {
    if (isOpen) close();
    else setIsOpen(true);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  return (
    <div className={styles.container} ref={containerRef}>
      <ButtonCustom
        icon={
          <span
            className={`${styles.iconWrapper} ${isOpen ? styles.iconOpen : ""}`}
          >
            {isOpen ? <X /> : <Menu />}
          </span>
        }
        onClick={toggle}
        aria-label={ariaLabel}
      />
      {isOpen && (
        <nav
          className={`${styles.dropdown} ${isClosing ? styles.dropdownClosing : ""}`}
          role="menu"
        >
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navItem}
              style={{ animationDelay: `${index * 40}ms` }}
              onClick={() => close()}
              role="menuitem"
            >
              <Typography variant="body2" as="span">
                {item.text}
              </Typography>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
