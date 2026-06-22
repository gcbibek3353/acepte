import { Metadata, MetadataRoute } from "next";


export default function robots(): MetadataRoute.Robots {
    const baseurl = "acepte.vercel.app";
    return {
        rules: {
            userAgent: "*",
            allow: ["/", "/practice/*"],  // specifically allow or disallow the crawlers to read or not the contents of pages
            disallow: ["/contact/*"],
        },
        sitemap: `${baseurl}/sitemap.xml`
    }
}