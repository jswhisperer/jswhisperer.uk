import { siteConfig } from '@/site-config'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import fg from 'fast-glob'
import fs from 'fs/promises'
import matter from 'gray-matter'
import sanitizeHtml from 'sanitize-html'

import { default as moment } from 'moment'

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

const output_dir = './dist/'

import { Feed, FeedOptions, type Item } from 'feed'

const options: FeedOptions = {
	title: siteConfig.title,
	description: siteConfig.description,
	id: siteConfig.url + '/',
	link: siteConfig.url + '/',
	language: 'en',
	copyright: `copyright  greg all rights reserved`,
	author: {
		name: siteConfig.author,
		link: siteConfig.url
	},
	favicon: siteConfig.url + '/favicon.svg',
	image: siteConfig.url + '/media/images/social.png',
	feedLinks: {
		atom: siteConfig.url + '/atom.xml'
	}
}

import MarkdownIt from 'markdown-it'
const parser = new MarkdownIt()

const year = +new Date().getFullYear()

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
	const items = posts.map((post) => ({
		...post.data,
		title: post.data.title,
		categories: post.data.tags,
		link: `/post/${post.slug}/`,
		pubDate: post.data.pubDate,
		content: sanitizeHtml(parser.render(post.body)),
		author: 'hello@jswhisperer.uk' // currentAuthor(post)?.email
	}))

	console.log({ items: await Promise.all(items) })

	return await rss({
		// xmlns: {
		// 	atom: 'http://www.w3.org/2005/Atom'
		// },
		title: siteConfig.title,
		description: siteConfig.description,
		site: context.site,
		items: await Promise.all(items)
		// customData: [
		// 	'en-us',
		// 	`<atom:link rel="self" type="application/rss+xml" href="${siteConfig.site}/feed.xml" />`
		// ].join(''),
		// stylesheet: '/pretty-feed-v3.xsl'
	})
}

async function buildBlogFeed() {
	// Start time for cli stats
	const start = +new Date()
	// Find markdown files in blog
	const files = await fg('src/content/blog/*.md')
	// Map over array of blog post files
	const posts: any[] = await Promise.all(
		files.map(async (file_in) => {
			const source = await fs.readFile(file_in, 'utf-8')
			const { data, content } = matter(source)
			const date = new Date(data.date)
			const slugLink = `/${slugDate(date.toISOString())}${createSlug(data.title)}/`
			// Generate excerpt from content
			const excerpt = sanitizeHtml(
				markdown
					.render(content)
					.replace('src="/', `src="${siteConfig.url}/`)
					.replace('href="/', `href="${siteConfig.url}/`)
					.split(' ')
					.slice(0, 80)
					.join(' ')
			)
			// Return data + add extra fields
			return {
				...data,
				date: new Date(data.date),
				id: siteConfig.url + slugLink,
				link: siteConfig.url + slugLink,
				description: excerpt
			}
		})
	)
	// Sort posts
	posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))
	// Generate feed
	const feed = new Feed(options)
	// Add post items
	posts.forEach((item: Item) => feed.addItem(item))
	// Check output directory exists
	await fs.access(output_dir)
	// Write output file
	await fs.writeFile(`${output_dir}atom.xml`, feed.atom1(), 'utf-8')
	// Show cli stats
	const end = +new Date()
	console.log(`\n    ${output_dir}atom.xml created (+${end - start}ms)\n`)
}

/*
 * Run Main Function
 */

buildBlogFeed().catch((error) => {
	console.error(error)
	// quit if error (eg: if output_dir does not exist)
	process.exit(1)
})
