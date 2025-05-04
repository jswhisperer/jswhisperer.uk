import { siteConfig } from "./src/data/site.config";

const { name, description, title, themeColor } = siteConfig;

export const webManifest = {
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
      src: "example.png",
      sizes: "1920x1080",
      label: "Home page",
      platform: "android",
    },
    {
      src: "example.png",
      sizes: "1920x1080",
      label: "Home page",
      "form_factor": "wide",
      platform: "desktop",
    },
  
  
  ],
};

export default webManifest;
