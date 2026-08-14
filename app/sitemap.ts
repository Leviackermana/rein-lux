import type { MetadataRoute } from "next";
export default function sitemap():MetadataRoute.Sitemap{return [{url:"https://www.reinlux.at/",lastModified:new Date(),changeFrequency:"monthly",priority:1},{url:"https://www.reinlux.at/hausverwaltungen",lastModified:new Date(),changeFrequency:"monthly",priority:.9}]}
