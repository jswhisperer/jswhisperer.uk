import { CATEGORIES } from "@/data/categories";
import { defineCollection, reference, z } from "astro:content";

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
      category: z.enum(CATEGORIES).default(CATEGORIES[0]),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().default(false),
      author: reference("author"),
      blskyid: z.string().optional(),
    }),
});

const author: ReturnType<typeof defineCollection> = defineCollection({
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      email: z.string().email().default("hello@jswhisperer.uk"),
      avatar: image().optional(),
      url: z.string().url().default("greg"),
      bio: z.string().optional(),
    }),
});

const webmentionsSchema = z.object({
  url: z.string(),
  published: z.coerce.date(),
  "wm-property": z.string(),
  "wm-received": z.coerce.date(),
  content: z
    .object({
      text: z.string().optional(),
      html: z.string().optional(),
    })
    .optional(),
  author: z.object({
    type: z.string(),
    name: z.string(),
    photo: z.string(),
    url: z.string(),
  }),
});
const webmentions = defineCollection({
  type: "data",
  schema: z.array(webmentionsSchema),
});

export const collections = { blog, author, webmentions };
