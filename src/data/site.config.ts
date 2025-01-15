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
import type { FeedOptions } from 'feed'
import MarkdownIt from 'markdown-it'
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
