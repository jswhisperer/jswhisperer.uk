import { defineConfig } from 'tinacms'
import { CATEGORIES } from '../src/data/categories.ts'

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main'

export default defineConfig({
	branch,
	clientId: null, // Get this from tina.io
	token: null, // Get this from tina.io

	build: {
		outputFolder: 'admin',
		publicFolder: 'public'
	},
	media: {
		tina: {
			mediaRoot: '/src/assets/images/uploads',
			publicFolder: ''
		}
	},
	schema: {
		collections: [
			{
				name: 'author',
				label: 'Author',
				path: 'src/content/author',
				format: 'mdx',
				defaultItem: function () {
					return {
						url: this?.name
					}
				},
				fields: [
					{
						type: 'string',
						name: 'name',
						label: 'Name',
						required: true
					},
					{
						type: 'string',
						name: 'url',
						label: 'Url'
					},
					{
						type: 'image',
						name: 'avatar',
						label: 'Avatar',
						required: true
					}
				]
			},
			{
				name: 'post',
				label: 'Blog Post',
				path: 'src/content/blog',
				format: 'mdx',
				defaultItem: () => {
					return {
						title: 'New Post',
						description: 'Description of new post',
						pubDate: new Date()
					}
				},
				fields: [
					{
						type: 'image',
						label: 'Cover Image',
						required: true,
						name: 'heroImage',
						description: 'The image used for the cover of the post'
					},

					{
						type: 'string',
						required: true,
						name: 'category',
						label: 'Category',
						description: 'Select an category for this post',
						options: [...CATEGORIES]
					},
					{
						type: 'string',
						label: 'description',
						required: true,
						name: 'description',
						description: 'A short description of the post'
					},
					{
						type: 'datetime',
						name: 'pubDate',
						label: 'Publication Date',
						required: true
					},
					{
						name: 'draft',
						label: 'Draft',
						type: 'boolean',
						description: 'If this is checked the post will not be published'
					},
					{
						type: 'string',
						name: 'tags',
						required: false,
						label: 'Tags',
						description: 'Tags for this post',
						list: true,
						ui: {
							component: 'tags'
						}
					},
					{
						type: 'reference',
						name: 'author',
						label: 'Author',
						collections: ['author']
					},
					{
						type: 'string',
						name: 'title',
						label: 'Title',
						isTitle: true,
						required: true
					},
					{
						type: 'rich-text',
						label: 'Body',
						name: 'SButton',
						isBody: true,
						templates: [
							// Custom Components
							{
								label: 'SButton',
								name: 'SButton',
								fields: [
									{
										type: 'rich-text',
										label: 'SButton',
										name: 'children',
										isBody: true
									}
								]
							}
						]
					}
				]
			}
		]
	}
})
