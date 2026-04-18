type StackCategory = "backend" | "frontend" | "devops" | "tools";

interface Experience {
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  stack: Partial<Record<StackCategory, string[]>>;
}

export const experiences: Experience[] = [
  {
    title: "geodatin",
    company: "Geodatin",
    startDate: new Date("2021-02-04"),
    stack: {
      backend: ["Node.js", "TypeScript", "PostgreSQL"],
      frontend: ["React"],
      devops: ["GitHub Actions", "Docker"],
      tools: ["Git"],
    },
  },
  {
    title: "golfarma",
    company: "Golfarma",
    startDate: new Date("2020-01-04"),
    endDate: new Date("2021-02-04"),
    stack: {
      backend: ["PHP", "Laravel", "SQL Server", "PostgreSQL"],
    },
  },
];
