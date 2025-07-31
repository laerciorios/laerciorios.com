import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Personal Website of Laercio Rios",
    short_name: "Laercio Rios",
    description: "Personal website of Laercio Rios, a fullstack developer",
    start_url: "/",
    display: "standalone",
    background_color: "#660000",
    theme_color: "#660000",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
