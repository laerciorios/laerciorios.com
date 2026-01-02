interface Formation {
  title: string;
  type: "bachelor" | "technician";
  institution: string;
  startYear: string;
  endYear?: string;
  isLocked?: boolean;
}

export const formations: Formation[] = [
  {
    title: "cc",
    type: "bachelor",
    institution: "Universidade Salvador (UNIFACS)",
    startYear: "2024",
    endYear: "2025",
  },
  {
    title: "ecomp",
    type: "bachelor",
    institution: "Universidade Estadual de Feira de Santana (UEFS)",
    startYear: "2017",
    endYear: "2024",
    isLocked: true,
  },
  {
    title: "systemDevelopment",
    type: "technician",
    institution: "SENAI - BA",
    startYear: "2018",
    endYear: "2019",
  },
];
