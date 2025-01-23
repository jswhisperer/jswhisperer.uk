import { siteConfig } from '@/site-config'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { default as moment } from 'moment'

import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'

const markdown = MarkdownIt({
	html: true,
	breaks: true,
	linkify: true
})

const slugDate = function (date: string) {
	const m = moment(date)
	date = `${m.format('YYYY')}/${m.format('MM')}/${m.format('DD')}/`
	return date
}

const createSlug = function (title: string) {
	return (
		title
			// remove leading & trailing whitespace
			.trim()
			// remove special characters
			.replace(/[^A-Za-z0-9 ]/g, '')
			// replace spaces
			.replace(/\s+/g, '-')
			// remove leading & trailing separtors
			.replace(/^-+|-+$/g, '')
			// output lowercase
			.toLowerCase()
	)
}

const parser = new MarkdownIt()

const year = +new Date().getFullYear()

export default async function GET() {
	const posts = await getCollection('blog')
	const authors = await getCollection('author')
	const currentAuthor = (post: any) =>
		authors.find((author) => author.data.name === post.data.author.id)
	const items = posts.map((post) => ({
		...post.data,
		title: post.data.title,
		categories: post.data.tags,
		link: `/post/${post.slug}/`,
		pubDate: post.data.pubDate,
		description: sanitizeHtml(markdown.render(post.data.description)),
		content: sanitizeHtml(
			markdown
				.render(post.body)
				.replace('src="/', `src="${siteConfig.url}/`)
				.replace('href="/', `href="${siteConfig.url}/`)
				.split(' ')
				.slice(0, 50)
				.join(' ')
		),
		author: 'hello@jswhisperer.uk (jswhisperer)' // currentAuthor(post)?.email
	}))

	//await atom(items)
	return await rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: siteConfig.site,
		items: await Promise.all(items),
		customData: [
			'en-us',
			`<atom:link rel="self" type="application/rss+xml" href="${siteConfig.site}/rss.xml" />`
		].join('')
		// stylesheet: '/pretty-feed-v3.xsl'
	})
}

// Add post items
//items.forEach((item: Item) => feed.addItem(item))
// Check output directory exists
// await fs.mkdir(path.join('dist'));

// Write output file
//await fs.writeFile(`dist/atom.xml`, feed.atom1(), 'utf-8')
// Show cli stats
// const end = +new Date()
// console.log(`\n  atom.xml created (+${end - start}ms)\n`)
