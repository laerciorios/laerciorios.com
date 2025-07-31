interface Experience {
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
}

export const experiences: Experience[] = [
  {
    title: "geodatin",
    company: "Geodatin",
    startDate: new Date("2021-02-04"),
  },
  {
    title: "golfarma",
    company: "Golfarma",
    startDate: new Date("2020-01-04"),
    endDate: new Date("2021-02-04"),
  },
];
