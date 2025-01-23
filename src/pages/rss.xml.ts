import { siteConfig } from '@/site-config'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'
const markdown = MarkdownIt({
	html: true,
	breaks: true,
	linkify: true
})

export async function GET(context: any) {
	const posts = await getCollection('blog')
	const authors = await getCollection('author')
	const currentAuthor = (post: any) =>
		authors.find((author) => author.data.name === post.data.author.id)
	const items = posts.map(async (post) => ({
		...post.data,
		title: post.data.title,
		categories: post.data.tags,
		link: `/post/${post.slug}/`,
		pubDate: post.data.pubDate,
		description: sanitizeHtml(
			markdown
				.render(post.body)
				.replace('src="/', `src="${siteConfig.url}/`)
				.replace('href="/', `href="${siteConfig.url}/`)
				.split(' ')
				.slice(0, 50)
				.join(' ')
		),
		content: sanitizeHtml(markdown.render(post.body)),
		author: 'hello@jswhisperer.uk'
	}))

	// await atom()
	return await rss({
		xmlns: {
			atom: 'http://www.w3.org/2005/Atom'
		},
		title: siteConfig.title,
		description: siteConfig.description,
		site: context.site,
		items: await Promise.all(items),
		customData: [
			'en-us',
			`<atom:link rel="self" type="application/rss+xml" href="${siteConfig.site}/rss.xml" />`
		].join('')
	})
}
