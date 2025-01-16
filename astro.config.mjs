import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import AstroPWA from '@vite-pwa/astro'
import embeds from 'astro-embed/integration'
import { defineConfig } from 'astro/config'
import { siteConfig } from './src/data/site.config'
import { remarkReadingTime } from './src/utils/readTime.ts'


// https://astro.build/config
export default defineConfig({
	vite: {
		optimizeDeps: {
			esbuildOptions: {
				target: 'esnext'
			}
		},
		build: {
			target: 'esnext'
		},
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
		// build: {
		// 	rollupOptions: {
		// 		external: ['workbox-window', 'virtual:pwa-register']
		// 	}
		// }
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
		embeds(),
		AstroPWA({
			srcDir: 'src',
			base: '/',
			scope: '/',
			registerType: 'autoUpdate',

			includeAssets: ['**/*'],
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
			injectRegister: 'auto',
			workbox: {
				runtimeCaching: [
					{
						urlPattern: /\.(?:png|jpg|jpeg|svg|html|js)$/,
						handler: 'CacheFirst'
					}
				],
				globDirectory: 'dist',
				maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 * 5,
				navigateFallback: null,
				globPatterns: ['**/*']
			},
			devOptions: {
				type: 'module',
				enabled: true,
				navigateFallbackAllowlist: [/^\//]
			},
			experimental: {
				responsiveImages: true,
				directoryAndTrailingSlashHandler: true,
				assets: true
			}
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
