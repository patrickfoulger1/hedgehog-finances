import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HedgeHog Investments",
    short_name: "HedgeHog",
    description: "Smart management of your investment portfolio.",
    start_url: "https://",
    display: "standalone",
    background_color: "#22287F",
    theme_color: "#fff",
    icons: [
      {
        src: "assets/icons/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
