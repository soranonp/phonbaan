/** @type {import('next-sitemap').IConfig} */
const SITE_URL = "https://phonbaan.com";

const PRIORITY = {
  "/": { priority: 1.0, changefreq: "weekly" },
  "/khondo": { priority: 0.9, changefreq: "weekly" },
  "/pho-baan": { priority: 0.9, changefreq: "weekly" },
  "/wong-ngern-ku": { priority: 0.9, changefreq: "weekly" },
  "/refinance": { priority: 0.9, changefreq: "weekly" },
  "/blog": { priority: 0.8, changefreq: "weekly" },
  "/about": { priority: 0.5, changefreq: "monthly" },
  "/contact": { priority: 0.5, changefreq: "monthly" },
  "/privacy": { priority: 0.3, changefreq: "yearly" },
};

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 7000,
  outDir: "./out",
  exclude: ["/404", "/api/*"],
  transform: async (config, path) => {
    const override = PRIORITY[path];
    if (override) {
      return {
        loc: path,
        changefreq: override.changefreq,
        priority: override.priority,
        lastmod: new Date().toISOString(),
      };
    }
    if (path.startsWith("/blog/")) {
      return {
        loc: path,
        changefreq: "monthly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "AhrefsBot", crawlDelay: 10 },
    ],
    additionalSitemaps: [`${SITE_URL}/sitemap.xml`],
  },
};
