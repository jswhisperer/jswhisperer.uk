import * as cheerio from 'cheerio'
import { globby } from 'globby'
import fs from 'node:fs/promises'

// Get all HTML files from the output directory
const path = './dist/amp/'
const files = await globby(`${path}/**/*.html`)

function stripScripts(vdom) {
	console.log(vdom)
	var div = vdom.window.document.createElement('div')
	div.innerHTML = vdom
	var scripts = div.getElementsByTagName('script')
	var i = scripts.length
	while (i--) {
		if (scripts[i].src === 'https://cdn.ampproject.org/v0.js') {
			return
		}
		scripts[i].parentNode.removeChild(scripts[i])
	}
	return div.innerHTML
}

await Promise.all(
	files.map(async (file) => {
		console.log('Processing file:', file)
		let html = await fs.readFile(file, 'utf-8')
		// console.log(html)
		const $ = cheerio.load(html, { useHtmlParser2: true })
		console.log($.text())
		const scripts = $('script').get()
		const styles = $('style').html()
		const xx = $.root().html().find('style').html()
		const yy = $(xx).find('style').get()
		// console.log({xx, yy})
		//console.log({yy})

		xx.map((i, style) => {
			console.log(style)
			// if (style.attribs['amp-custom'] === true || style.attribs['amp-boilerplate'] === true) {
			// 	console.log({ style })
			// 	return
			// } else {
			// 	console.log({ style })
			// 	//$(style).remove()
			// }
		})

		scripts.map((script) =>
			script.attribs?.src === 'https://cdn.ampproject.org/v0.js'
				? console.log('yes')
				: $(script).remove()
		)

		await fs.writeFile(file, $.html())

		// Add IDs to h2, h3, and h4 tags
		//  const dom = new JSDOM(html)
		//  const headings = dom.window.document.querySelectorAll('h2, h3, h4')
		//    // stripScripts(dom)
		//  for (let i = 0; i < headings.length; i++) {
		// 	 const heading = headings[i]
		// 	 const text = heading.textContent
		// 	 const id = text
		// 		 .trim()
		// 		 .replace(/[\s.,?:]+/g, '-')
		// 		 .replace(/-+$/, '')
		// 		 .toLowerCase()
		// 	 heading.setAttribute('id', id)
		//  }

		//  html = dom.serialize()
		// 	// console.log(html)
		// 	stripScripts(html)
		//  // Minify the HTML
		//  html = minify(html, {
		// 	 removeComments: true,
		// 	 preserveLineBreaks: true,
		// 	 collapseWhitespace: true
		//  })
		//  await fs.writeFile(file, html)
	})
).catch((e) => console.log(e))
