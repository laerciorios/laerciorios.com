// TODO: replace the placeholder books below with the real recommendations.
// Titles, authors and comments live in i18n/messages/*.json under the
// "recommendations" namespace.
export interface BookRecommendation {
  key: string;
  url?: string;
  /** Cover image file inside public/images/books/, e.g. "clean-code.png" */
  cover?: string;
}

export interface BookCategory {
  key: string;
  items: BookRecommendation[];
}

export const bookCategories: BookCategory[] = [
  {
    key: "technical",
    items: [{ key: "techBook1" }, { key: "techBook2" }],
  },
  {
    key: "literature",
    items: [{ key: "litBook1" }, { key: "litBook2" }],
  },
  {
    key: "nonFiction",
    items: [{ key: "nonFictionBook1" }, { key: "nonFictionBook2" }],
  },
];
