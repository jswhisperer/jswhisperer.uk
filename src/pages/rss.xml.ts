import { siteConfig } from '@/site-config'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'
const parser = new MarkdownIt()

export async function GET(context: any) {
	const posts = await getCollection('blog')
	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: context.site,
		items: await Promise.all(
			posts.map(async (post) => {
				const authors = await getCollection('author')
				const author = authors.find((author) => author.id === post.data.author.id)
				return {
					...post.data,
					content: sanitizeHtml(parser.render(post.body), {
						allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
					}),
					author: author ? author.data.name : 'Unknown',
					link: `post/${post.slug}/`
				}
			})
		)
	})
}
