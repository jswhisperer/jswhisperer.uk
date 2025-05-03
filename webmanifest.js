import { siteConfig } from "./src/data/site.config";

const { name, description, title, themeColor } = siteConfig;

export const webManifest = {
  $schema: "https://json.schemastore.org/web-manifest-combined.json",
  id: "jswhisperer",
  name: title,
  short_name: "jswhisperer",
  description,
  orientation: "portrait",
  display: "standalone",
  theme_color: "#ffffff",
  background_color: "#11191f",
  icons: [
    {
      src: "pwa-64x64.png",
      sizes: "64x64",
      type: "image/png",
    },
    {
      src: "pwa-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "pwa-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "maskable-icon-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ],
  screenshots: [
    {
      src: "screenshot1.png",
      sizes: "1920x1080",
      label: "Home page",
      platform: "android",
    },
    {
      src: "screenshot2.png",
      sizes: "1920x1080",
      label: "Blog page",
      platform: "android",
    },
  ],
};

export default webManifest;
