// TODO: replace the placeholder items below with the real setup.
// Names and descriptions live in i18n/messages/*.json under the "setup" namespace.
export interface SetupLink {
  label: string;
  url: string;
}

export interface SetupItem {
  key: string;
  links?: SetupLink[];
}

export interface SetupCategory {
  key: string;
  items: SetupItem[];
}

export const setupCategories: SetupCategory[] = [
  {
    key: "workstation",
    items: [
      { key: "notebook" },
      { key: "monitor" },
      { key: "keyboard" },
      { key: "mouse" },
      { key: "headset" },
    ],
  },
  {
    key: "editorTerminal",
    items: [
      { key: "editor" },
      { key: "font" },
      { key: "terminal" },
      {
        key: "shell",
        links: [{ label: "fishshell.com", url: "https://fishshell.com/" }],
      },
    ],
  },
  {
    key: "apps",
    items: [
      { key: "browser" },
      {
        key: "design",
        links: [{ label: "figma.com", url: "https://www.figma.com/" }],
      },
      { key: "notes" },
      { key: "apiClient" },
    ],
  },
  {
    key: "ai",
    items: [
      {
        key: "claudeCode",
        links: [
          { label: "claude.com", url: "https://claude.com/claude-code" },
        ],
      },
      { key: "aiExtras" },
    ],
  },
  {
    key: "services",
    items: [
      {
        key: "hosting",
        links: [{ label: "vercel.com", url: "https://vercel.com/" }],
      },
      {
        key: "git",
        links: [
          {
            label: "github.com/laerciorios",
            url: "https://github.com/laerciorios",
          },
        ],
      },
      { key: "domain" },
    ],
  },
];
