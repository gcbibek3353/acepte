import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseurl = "acepte.vercel.app";
    return [{
        url: baseurl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.1
    },
    {
        url: `${baseurl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5
    }
    ]
}