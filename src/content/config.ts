import { CATEGORIES } from '@/data/categories'
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string().max(80),
			description: z.string(),
			// Transform string to Date object
			pubDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			heroImage: image().optional(),
			category: z.enum(CATEGORIES).optional(),
			tags: z.array(z.string()).optional(),
			draft: z.boolean().default(false)
		})
})

const author = defineCollection({
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			avatar: image().optional()
		})
})


export const collections = { blog, author }
