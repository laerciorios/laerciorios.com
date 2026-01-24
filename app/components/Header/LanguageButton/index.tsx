"use client";
import { useState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { Languages } from "../../icons";
import ButtonCustom from "../../ButtonCustom";
import { languages } from "../../../../i18n/config";
import styles from "./styles.module.css";

export default function LanguageButton() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLDivElement>(null);
	const locale = useLocale();
	const router = useRouter();
	const t = useTranslations("language");

	function toggleDropdown() {
		setIsDropdownOpen(!isDropdownOpen);
	}

	function handleLanguageChange(languageCode: string) {
		document.cookie = `NEXT_LOCALE=${languageCode}; path=/; max-age=31536000; SameSite=Lax`;
		router.refresh();
		setIsDropdownOpen(false);
	}

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		}

		if (isDropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}
	}, [isDropdownOpen]);

	// Close dropdown on escape key
	useEffect(() => {
		function handleEscape(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setIsDropdownOpen(false);
			}
		}

		if (isDropdownOpen) {
			document.addEventListener("keydown", handleEscape);
			return () => {
				document.removeEventListener("keydown", handleEscape);
			};
		}
	}, [isDropdownOpen]);

	return (
		<div className={styles.languageButtonContainer} ref={buttonRef}>
			<ButtonCustom
				icon={<Languages />}
				onClick={toggleDropdown}
				aria-label={t("switch")}
			/>

			{isDropdownOpen && (
				<div
					className={styles.dropdown}
					ref={dropdownRef}
					role="menu"
					aria-orientation="vertical"
				>
					{languages.map((language) => (
						<button
							key={language.code}
							className={`${styles.dropdownItem} ${
								locale === language.code ? styles.active : ""
							}`}
							onClick={() => handleLanguageChange(language.code)}
							role="menuitemradio"
							aria-checked={locale === language.code}
						>
							{language.label}
							{locale === language.code && (
								<span className={styles.checkmark} aria-hidden="true">
									✓
								</span>
							)}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
