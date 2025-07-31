interface Project {
  title: string;
  link?: string;
  repository?: string;
  design?: string;
  year: string;
  skills: string[];
  type: "personal" | "professional" | "academic";
  bond?: string;
  images: string[];
  highlight: boolean;
}

export const projects: Project[] = [
  {
    title: "theLegacyOfManoel",
    year: "2025",
    skills: ["Godot", "GDScript"],
    type: "academic",
    bond: "UEFS",
    repository:
      "https://laerciorios.itch.io/o-legado-de-manoel?utm_source=laerciorios.com&utm_medium=site&utm_campaign=portfolio",
    link: "https://laerciorios.itch.io/o-legado-de-manoel",
    images: [
      "homeScreen.png",
      "cowMinigame.png",
      "scene1.png",
      "bucketMinigame.png",
    ],
    highlight: false,
  },
  {
    title: "ecope",
    year: "2023-2025",
    skills: ["React", "TypeScript", "Styled Components"],
    type: "professional",
    bond: "Geodatin",
    link: "https://plataformaecope.cprh.pe.gov.br/",
    images: ["home.png"],
    highlight: false,
  },
  {
    title: "urlShortener",
    year: "2025",
    skills: ["Node.JS", "TypeScript", "PostgreSQL", "Express", "Jest"],
    type: "personal",
    repository: "https://github.com/LaercioSR/url-shortener",
    images: [],
    highlight: false,
  },
  {
    title: "libScrapper",
    year: "2024",
    skills: ["Node.JS", "Typescript", "Web Scraping"],
    type: "professional",
    bond: "Geodatin",
    images: [],
    highlight: false,
  },
  {
    title: "portfolioV2",
    link: "https://laerciorios.com/",
    repository: "https://github.com/LaercioSR/personal-website-v2",
    year: "2024",
    skills: ["Next.Js", "TypeScript", "Figma"],
    type: "personal",
    images: [],
    highlight: false,
  },
  {
    title: "semesterUefs",
    link: "https://semestreuefs.laerciorios.com/",
    repository: "https://github.com/LaercioSR/semester-uefs",
    year: "2024",
    skills: ["Next.Js", "TypeScript", "Styled Components", "Github Actions"],
    type: "personal",
    images: ["dark.png"],
    highlight: true,
  },
  {
    title: "portfolioV1",
    link: "https://v1.laerciorios.com/",
    repository: "https://github.com/LaercioSR/laerciorios.com",
    year: "2023",
    skills: ["React", "TypeScript", "Styled Components"],
    type: "personal",
    images: ["light.png"],
    highlight: true,
  },
  {
    title: "ondeAssistir",
    repository: "https://github.com/LaercioSR/onde-assistir-front",
    year: "2023",
    skills: ["React", "Node.JS", "TypeScript", "Web Scraping"],
    type: "academic",
    bond: "UEFS",
    images: ["screenshot.png"],
    highlight: false,
  },
  {
    title: "ppbio",
    link: "https://bioeconomia.org.br/",
    year: "2022",
    skills: ["Node.JS", "Typescript", "PostgreSQL"],
    type: "professional",
    bond: "Geodatin",
    images: [],
    highlight: false,
  },
  {
    title: "rhisa",
    link: "https://rhisa.org/",
    year: "2021",
    skills: ["Node.JS", "Typescript", "PostgreSQL", "Python", "Web Scraping"],
    type: "professional",
    bond: "Geodatin",
    images: [],
    highlight: false,
  },
  {
    title: "leadbase",
    link: "https://leadbase.com.br/",
    year: "2020",
    skills: ["PHP", "Laravel", "PostgreSQL"],
    type: "professional",
    bond: "Golfarma",
    images: [],
    highlight: false,
  },
];
