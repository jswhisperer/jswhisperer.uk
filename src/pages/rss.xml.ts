import { siteConfig } from '@/site-config'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import sanitizeHtml from 'sanitize-html'

import MarkdownIt from 'markdown-it'
const parser = new MarkdownIt()

export async function GET(context: any) {
	const posts = await getCollection('blog')
	const authors = await getCollection('author')
	const items = posts.map((post) => ({
		...post.data,
		title: post.data.title,
		pubDate: post.data.pubDate,
		content: sanitizeHtml(parser.render(post.body)),
		author: authors.find((author) => author.data.name === post.data.author.id)?.data.name,
		link: `/post/${post.slug}/`
	}))

	console.log({ items: await Promise.all(items) })

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: context.site,
		items: items
	})
}
