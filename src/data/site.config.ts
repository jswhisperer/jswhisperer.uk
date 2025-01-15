interface SiteConfig {
	url: string
	site: string
	author: string
	title: string
	description: string
	lang: string
	ogLocale: string
	shareMessage: string
	paginationSize: number
	ogImage: string
}

export const siteConfig: SiteConfig = {
	site: 'https://jswhisperer.uk', // Write here your website url
	url: 'https://jswhisperer.uk',
	author: 'The JavaScript Whisperer', // Site author
	title: 'JavaScript Whisperer blog', // Site title.
	description:
		'Specialist in performance oriented javascript architecture for web, mobile, client and server side. Passionate about realtime web.', // Description to display in the meta tags
	lang: 'en-GB',
	ogLocale: 'en_GB',
	shareMessage: 'Share this post', // Message to share a post on social media
	paginationSize: 6666, // Number of posts per page,
	ogImage: 'https://jswhisperer.uk/assets/images/og-image.jpg'
}

/*!
 * generate-feed.ts v1.0.0
 *
 * https://github.com/equk/
 *
 * Copyright (c) 2023 B.Walden. All rights reserved.
 *
 * Licensed under the MIT License
 *
 * (LICENSE file should be included with script)
 */
import fg from 'fast-glob'
import type { FeedOptions, Item } from 'feed'
import { Feed } from 'feed'
import fs from 'fs/promises'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'
// import { siteConfig } from '~/config'
// import createSlug from '~/lib/createSlug'
// import slugDate from '~/lib/slugDate'

const year = +new Date().getFullYear()

const markdown = MarkdownIt({
	html: true,
	breaks: true,
	linkify: true
})

/*
 * Main Feed Options
 */

const output_dir = './dist/'

const options: FeedOptions = {
	title: siteConfig.title,
	description: siteConfig.description,
	id: siteConfig.site + '/',
	link: siteConfig.site + '/',
	language: 'en',
	copyright: `copyright ${year} equk.co.uk all rights reserved`,
	author: {
		name: siteConfig.author,
		link: siteConfig.site
	},
	favicon: siteConfig.site + '/favicon.svg',
	image: siteConfig.site + '/media/images/social.png',
	feedLinks: {
		atom: siteConfig.site + '/atom.xml'
	}
}

/*
 * Build Feed From Posts
 */

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
