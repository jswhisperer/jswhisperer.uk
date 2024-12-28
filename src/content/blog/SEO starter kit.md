---
title: SEO starter kit
published: true
date: 2023-01-01
pubDate: 'Jul 02 2022'
description: what do you need for an effective indexable "google-able" site
tags: [seo, beginners, html]
cover_image: https://gregbenner.life/assets/static/alexandr-podvalny-220262-unsplash.07cc2b7.490343832c4705701e26598c1c374606.jpg
---

# SEO starter kit
Earlier I wrote about [ld+json with a vue.js framework gridsome](https://dev.to/jswhisperer/json-ld-with-a-splash-of-gridsome-2hn) but let's take a step back. I want to focus on the barebone what do you need for an effective indexable "google-able" site. 
Not too much too be honest and all the steps optional.
You should have a title in your `<head>` of course 
```html
<title>My Sweet Blog</title>
```

```html
<meta name="description"  content="This is an example of a meta description.”>
```

Ok now the interesting stuff you should have a sitemap created at `/sitemap.xml` you could use an [online](https://www.xml-sitemaps.com/) one to generate it, but many frameworks will have a plugin to do it for you.
You also need to link to it in your `<head>`

```html
<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">
```

Now you need to sign up here at the [Search Console](https://search.google.com/search-console/about) and submit that sitemap to Google to let the indexing begin. You can repeat this process with Bing if you would like.

These two tags say hey, include me in the search results. Technically you can omit them unless you want to block them but better to be explicit and say “hey google I’m here, index me”
```html
<meta name="googlebot" content="index,follow">
<meta name="robots" content="index,follow">
```
  

## An Aside - Social tags
----------

So while these won’t directly affect your SEO, they impact how your site looks when it’s shared which effects your [backlinks](https://moz.com/learn/seo/backlinks); which DOES affect your seo.

**Twitter**

 ```html  
<meta name="twitter:title" content="Your Title">
<meta name="twitter:description" content=" Your Description">
<meta name="twitter:image" content="http://thumbnail.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@username">
```

**Facebook**

```html
<meta property="og:title" content="Your Title">
<meta property="og:description" content="Your Description">
<meta property="og:image" content="http://thumbnail.jpg">
<meta property="og:url" content="http://index.html">
```

## Your secret weapon
----------

[ld+json](https://json-ld.org/) sounds funny I know, I only stumbled onto it by accident whilst late night googling. It stands for linked data and it’s replaces microdata. What does it do? Well it’s basically a way to link data, google can take your blog post know where the title is the article body the cover image then put it all fancy like in their search results. Another tool could also take that data and use it in a different way. 

I’m going to show the [amp](https://amp.dev/) example, amp is just a google thing for getting your articles into their news feed.

```html
    <html amp>
      <head>
        <title>Article headline</title>
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://google.com/article"
          },
          "headline": "Article headline",
          "image": [
            "https://example.com/photos/1x1/photo.jpg",
            "https://example.com/photos/4x3/photo.jpg",
            "https://example.com/photos/16x9/photo.jpg"
           ],
          "datePublished": "2015-02-05T08:00:00+08:00",
          "dateModified": "2015-02-05T09:20:00+08:00",
          "author": {
            "@type": "Person",
            "name": "John Doe"
          },
           "publisher": {
            "@type": "Organization",
            "name": "Google",
            "logo": {
              "@type": "ImageObject",
              "url": "https://google.com/logo.jpg"
            }
          }
        }
        </script>
      </head>
      <body>
      </body>
    </html>
```
You can test that your page will be rich result ready aka SEO-tastic with [this tool](https://search.google.com/test/rich-results) you can find more example schema’s for things other than Articles [here](https://developers.google.com/search/docs/data-types/article)

Hope you enjoyed!

