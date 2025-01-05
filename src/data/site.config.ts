interface SiteConfig {
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
