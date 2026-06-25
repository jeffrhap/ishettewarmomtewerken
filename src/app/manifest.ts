import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Is het te warm om te werken?",
    short_name: "Te warm?",
    description:
      "Het antwoord op de enige vraag die ertoe doet, op basis van de temperatuur in Nederland.",
    lang: "nl",
    start_url: "/",
    display: "standalone",
    theme_color: "#E53600",
    background_color: "#E53600",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
