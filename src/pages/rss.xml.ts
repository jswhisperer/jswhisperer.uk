import { siteConfig } from '@/site-config'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import atom from './atom'

export async function GET(context: any) {
	const posts = await getCollection('blog')
	const authors = await getCollection('author')
	const currentAuthor = (post: any) =>
		authors.find((author) => author.data.name === post.data.author.id)
	const items = posts.map((post) => ({
		...post.data,
		title: post.data.title,
		categories: post.data.tags,
		link: '/', //`/post/${post.slug}/`,
		pubDate: post.data.pubDate,
		//content: sanitizeHtml(parser.render(post.body)),
		author: 'hello@jswhisperer.uk' // currentAuthor(post)?.email
	}))

	await atom(items)
	return await rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: context.site,
		items: await Promise.all(items)
	})
}
