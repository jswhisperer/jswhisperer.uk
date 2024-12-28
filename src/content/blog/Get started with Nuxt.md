---
title: Get started with Nuxt
author: src/content/author/greg.mdx
published: true
date: 2023-01-01
pubDate: 'Jul 02 2022'
description: This is my goto stack Nuxt.js which is server side rendered framework around vue. It plays on Next.js from the React world. At the end you’ll have a super performant website to build off of.
tags: [nuxt, node, vue, beginner]
heroImage: /public/project.png
---

# Get started with Nuxt
This is my goto stack Nuxt.js which is server side rendered framework around vue. It plays on Next.js from the React world. At the end you’ll have a super performant website to build off of.

Let’s get started!

`npx create-nuxt-app <project-name>`

Let’s choose (javascript/or ts) , (npm / yarn ),  (tailwind), space bar to select all 3 (axios, content, and pwa), choose the linters you prefer; I like eslint and prettier. Testing will be beyond this article but I recommend trying out jest it will add a sample test you can examine.

- Choose: Rendering mode: Universal (SSR / SSG). 
- Server (Node.js hosting). 
- Static (Static/JAMStack hosting).
- Development tools: jsconfig.json
- Version control system: Git

let’s `cd <project-name>` and let’s checkout what we get out of the box `npm run generate`
This will create all our static html for us in the dist folder we could open up [netlify](https://app.netlify.com/) create an app and drag that folder there then open Chrome devTools and run lighthouse to check out performance. Why would we do this? I usually do this at the beginning of using a new framework to set a baseline, this is probably the best score you can get. It should be in the mid to high 90’s which is pretty good.

Ok now we can actually develop with `npm run dev` so if you now navigate to the url it says probably localhost:3000 you will see `pages/index.vue` which is wrapped in `layouts/default.vue`  it contains a `components/Logo.vue` also which was automagically imported by Nuxt but normally would have to be imported in traditional Vue.js.

Some of the other folders are `static/` which is just assets you don’t want webpack to touch, you just want copied as is, to `/dist`. Then `assets/` which is touched by webpack meaning it optimizes some things, it appends a hash to version them and more. There is a `content/` folder since we opted into the content module; more on this later. `middleware/` will be for another day. `store` is for use of vuex a redux like state management library for vue. `plugins` is also for the next post.

Let’s have a peak at the config now to see some of the magic. Open `nuxt.config.js`
Here we see how the components are automagically imported as I mentioned earlier
```javascript
    // Auto import components (https://go.nuxtjs.dev/config-components)
      components: true,
```
and here we see our modules included and where we could add more
```javascript
      modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://go.nuxtjs.dev/content
        '@nuxt/content',
      ],
```
Just by including the [pwa module](https://pwa.nuxtjs.org/) and a 512x512 icon in `static` you already get a fully functioning [Progressive Web App](https://web.dev/progressive-web-apps/); that’s something really special. I can’t tell you the headaches I’ve had trying to do this with [WorkBox](https://developers.google.com/web/tools/workbox) and similar tools. You can of course override all the settings to your hearts content.

To make a new top level page is as easy as creating a new file in `pages/` let’s copy paste a sweet template from [tailwind](https://tailwindcomponents.com/component/hero-component)

```javascript
    <template>
      <div class="flex flex-wrap md items-center h-screen">
        <div class="bg-white w-full md:w-1/2 h-screen">
          <div class="mx-32">
            <h1 class="text-6xl font-bold mt-16">Tokyo</h1>
            <!-- country region island -->
            <div class="flex mt-16 font-light text-gray-500">
              <div class="pr-4">
                <span class="uppercase">Country</span>
                <p class="text-2xl text-gray-900 font-semibold pt-2">Japan</p>
              </div>
              <div class="pr-4">
                <span class="uppercase">Region</span>
                <p class="text-2xl text-gray-900 font-semibold pt-2">Kanto</p>
              </div>
              <div class="pr-4">
                <span class="uppercase">island</span>
                <p class="text-2xl text-gray-900 font-semibold pt-2">Honshu</p>
              </div>
            </div>
            <!-- description -->
            <div
              class="description w-full sm: md:w-2/3 mt-16 text-gray-500 text-sm"
            >
              Tokyo, Japan’s busy capital, mixes the ultramodern and the
              traditional, from neon-lit skyscrapers to historic temples. The
              opulent Meiji Shinto Shrine is known for its towering gate and
              surrounding woods. The Imperial Palace sits amid large public gardens
            </div>
            <button class="uppercase mt-5 text-sm font-semibold hover:underline">
              read more
            </button>
          </div>
        </div>
        <div class="bg-red-600 w-full md:w-1/2 h-screen">
          <img
            src="https://source.unsplash.com/7H77FWkK_x4/1600x900"
            class="h-screen w-full"
            alt=""
          />
        </div>
      </div>
    </template>
```
Awesome I’ll let you read up on tailwind but basically it is many small utility classes that form building blocks for powerful layout and design. One advantage of tailwind is during the build phase nuxt (webpack) is able to determine and strip-out any unused css rules. You can create a link to you about or home page like so `<nuxt-link to="/about">about</nuxt-link>`

Maybe you want to add your own touch to your page, I’ll show you how to add plugins, specifically the google fonts module for nuxt. `npm i @nuxtjs/google-fonts`
and open `nuxt.config.js` and add this to the `modules`
```javascript
    '@nuxtjs/google-fonts',
```
so it looks like this now
```
     modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://go.nuxtjs.dev/content
        '@nuxt/content',
        '@nuxtjs/google-fonts',
      ],
```
now add a property “googleFonts” underneath “build : {} “ like so:
```javascript
    build:{}
    googleFonts: {
        families: {
          Hind: true
        }
      },
```
You can select whatever font from [google fonts](https://fonts.google.com/) you would like, I’ve chosen Hind for now. This is the pattern for customizing modules, for pwa you would create a pwa: {}, for content a content: {}
To make use of the font in index or layout we would paste this rule and let it cascade as css tends to do:
```javascript
    * {
      font-family: 'Hind', sans-serif;
    }
```
 
Ok we’re making progress on our site, why not through in a markdown powered blog? Let’s move our first post called `hello.md` into a folder called `posts` inside `content/` Now we need a template for our blog create a folder under `pages/` called `blog/` and the dynamic template called `_slug.vue`  copy and paste the below code:
```javascript
    <template>
      <article>
        <nuxt-content :document="article" />
      </article>
    </template>
    <script>
    export default {
      async asyncData({ $content, params }) {
        const article = await $content('articles', params.slug).fetch()
        return { article }
      },
    }
    </script>
```
Boom navigate to yoursite/blog/hello you now have a blog, rather then go into more detail read this [excellent post](https://nuxtjs.org/blog/creating-blog-with-nuxt-content) that does it for me!

I’m going to stop here I think that’s enough to ponder for now, let me know if you have any questions or comments. I will do a follow up post if there is interest. Cheers!

