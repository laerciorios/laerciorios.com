interface Formation {
  title: string;
  type: "bachelor" | "technician";
  institution: string;
  website?: string;
  startYear: string;
  endYear?: string;
  status: "completed" | "ongoing" | "locked";
  statusDetail?: "transfer";
}

export const formations: Formation[] = [
  {
    title: "cc",
    type: "bachelor",
    institution: "Universidade Salvador (UNIFACS)",
    website:
      "https://www.unifacs.br/cursos/graduacao/ciencia-da-computacao-bacharelado/",
    startYear: "2024",
    endYear: "2025",
    status: "completed",
  },
  {
    title: "ecomp",
    type: "bachelor",
    institution: "Universidade Estadual de Feira de Santana (UEFS)",
    website: "https://www.ecomp.uefs.br/",
    startYear: "2017",
    endYear: "2024",
    status: "locked",
    statusDetail: "transfer",
  },
  {
    title: "systemDevelopment",
    type: "technician",
    institution: "SENAI - BA",
    website:
      "https://tecnico.senaibahia.com.br/curso/tecnico-em-desenvolvimento-de-sistemas/",
    startYear: "2018",
    endYear: "2019",
    status: "completed",
  },
];
