export const locales = ["en", "pt-BR"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const languages: { code: Locale; label: string }[] = [
	{ code: "pt-BR", label: "Português" },
	{ code: "en", label: "English" },
];
