import type { MetadataRoute } from "next";

const BASE_URL = "https://atukenov.kz";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/resume", "/work", "/contact"];
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
