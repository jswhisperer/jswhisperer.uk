import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AstroPWA from "@vite-pwa/astro";
import compressor from "astro-compressor";
import critters from "astro-critters";
import purgecss from "astro-purgecss";
import { defineConfig } from "astro/config";
import { siteConfig } from "./src/data/site.config";
import { remarkReadingTime } from "./src/utils/readTime.ts";
import manifest from "./webmanifest.js";

const getCache = ({ name, pattern }) => ({
  urlPattern: pattern,
  handler: "CacheFirst",
  options: {
    cacheName: name,
    expiration: {
      maxEntries: 500,
      maxAgeSeconds: 60 * 60 * 24 * 365 * 2 // 2 years
    },
    cacheableResponse: {
      statuses: [200]
    }
  }
});
// https://astro.build/config
export default defineConfig({
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
    domains: ["res.cloudinary.com", "dev-to-uploads.s3.amazonaws.com"],
  },
  vite: {
    optimizeDeps: {
      esbuildOptions: {
        target: "esnext",
      },
    },
    build: {
      target: "esnext",
    },
    logLevel: "info",
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
    server: {
      fs: {
        // Allow serving files from hoisted root node_modules
        allow: ["../.."],
      },
    },
    // build: {
    //   emitAssets: true,
    //   rollupOptions: {
    //     external: ["workbox-window", "virtual:pwa-register"],
    //   },
    // },
  },
  prefetch: false,
  site: siteConfig.site,
  markdown: {
    remarkPlugins: [remarkReadingTime],
    drafts: true,
    shikiConfig: {
      theme: "material-theme-palenight",
      wrap: true,
    },
  },
  integrations: [
    // embeds(),

    AstroPWA({
      // experimental: {
      //   directoryAndTrailingSlashHandler: true,
      // },
      manifest: manifest,
      
      srcDir: "src",
      includeManifestIcons: false,
    //   includeAssets: [
    //     "**/*",
    // ],
    
      pwaAssets: {
        config: true,
      },
      maxEntries: 500,
      workbox: {
        globPatterns: ['**/*.{js,html, png, jpg, jpeg, svg, webp, avif, js, woff, woff2, txt, ttf }'],
        runtimeCaching: [
          {
       
            urlPattern: /\.(?:png|jpg|jpeg|svg|html|js|avif|webp|woff2|woff|webp|js|txt|ttf)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: 'main',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 500,
              },
            },
          },
        ],

        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 * 5 * 99,
      
      },
      devOptions: {
        type: "module",
        enabled: true,
        navigateFallbackAllowlist: [/^\//],
      },
      experimental: {
        responsiveImages: true,
        directoryAndTrailingSlashHandler: true,
        assets: true,
      },
    }),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        experimentalThemes: {
          light: "dracula",
          dark: "material-theme-palenight",
        },
        wrap: true,
      },
      drafts: true,
    }),
    sitemap({
      filter: (page) => !page.includes("/admin/"),
      changefreq: "weekly",
      lastmod: new Date(),
    }), // partytown({
    tailwind(), // 	config: {
    compressor(),
    purgecss({
      extractors: [
        {
          extractor: (content) =>
            content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
          extensions: ["astro", "html"],
        },
      ],
    }),
  
    critters()
  ],
});
