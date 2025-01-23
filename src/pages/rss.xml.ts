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
	const items = posts.map(async (post) => {
		console.log({ rss: post.body })
		return {
			...post.data,
			title: post.data.title,
			categories: post.data.tags,
			link: `/post/${post.slug}/`,
			pubDate: post.data.pubDate,
			description: post.data.description,
			content: sanitizeHtml(
				markdown
					.render(post.body)
					.replace('src="/', `src="${siteConfig.url}/`)
					.replace('href="/', `href="${siteConfig.url}/`)
					.split(' ')
					.slice(0, 50)
					.join(' ')
			),
			author: 'hello@jswhisperer.uk (jswhisperer)'
		}
	})

	// await atom()
	return await rss({
		// xmlns: {
		// 	atom: 'http://www.w3.org/2005/Atom'
		// },
		title: siteConfig.title,
		description: siteConfig.description,
		site: context.site,
		items: await Promise.all(items)
		// customData: [
		// 	`<atom:link rel="self" type="application/rss+xml" href="${siteConfig.site}/rss.xml" />`
		// ].join('')
	})
}
