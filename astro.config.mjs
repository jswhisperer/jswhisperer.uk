import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import AstroPWA from '@vite-pwa/astro'
import { defineConfig } from 'astro/config'
import { siteConfig } from './src/data/site.config'
import { remarkReadingTime } from './src/utils/readTime.ts'

// https://astro.build/config
export default defineConfig({
	build: {
		rollupOptions: {
			external: ['workbox-window', 'virtual:pwa-register']
		}
	},
	vite: {
		logLevel: 'info',
		define: {
			__DATE__: `'${new Date().toISOString()}'`
		},
		server: {
			fs: {
				// Allow serving files from hoisted root node_modules
				allow: ['../..']
			}
		},
		build: {
			rollupOptions: {
				external: ['workbox-window', 'virtual:pwa-register']
			}
		}
	},
	prefetch: true,
	site: siteConfig.site,
	markdown: {
		remarkPlugins: [remarkReadingTime],
		drafts: true,
		shikiConfig: {
			theme: 'material-theme-palenight',
			wrap: true
		}
	},
	integrations: [
		AstroPWA({
			strategies: 'injectManifest',
			srcDir: 'src',
			filename: 'pwa.ts',
			base: '/',
			scope: '/',
			includeAssets: ['favicon.svg'],
			registerType: 'injectManifest',
			injectRegister: 'auto',
			injectManifest: {
				injectionPoint: undefined
			},
			manifest: {
				name: 'Astro PWA',
				short_name: 'Astro PWA',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},

			workbox: {
				navigateFallback: '/',
				globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}']
			},
			devOptions: {
				enabled: true,
				navigateFallbackAllowlist: [/^\//]
			}
			// experimental: {
			// 	directoryAndTrailingSlashHandler: true
			// }
		}),
		mdx({
			syntaxHighlight: 'shiki',
			shikiConfig: {
				experimentalThemes: {
					light: 'dracula',
					dark: 'material-theme-palenight'
				},
				wrap: true
			},
			drafts: true
		}),
		sitemap(),
		tailwind()
	]
})
