import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://bebilog.cn/en", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://bebilog.cn/zh", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  ];
}
