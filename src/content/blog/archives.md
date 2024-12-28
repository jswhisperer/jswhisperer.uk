---
title: "Caddy 2 server the silver bullet of serving"
published: true
description: "Node.js is beautiful and brilliant. It takes a mature developer to admit where something shines and where it could use some help. With every language, or library the authors make some choices on where it should it shine and what can lag."
tags: ["backend", "server", "reverseproxy", "caddy"]
canonical_url: "https://gregbenner.life/caddy-2-server-the-silver-bullet-of-serving/"
pubDate: 'Jul 02 2022'
---

## Caddy 2 server the silver bullet of serving

_First and foremost this post is about a Go-lang server; wait it will be in a node.js context!_

Node.js is beautiful and brilliant. It takes a mature developer to admit where something shines and where it could use some help. With every language, or library the authors make some choices on where it should it shine and what can lag.

I won't drill down into the nitty gritty but where I think node can use a friend like Caddy are things like serving binary files, rate limiting access to the server, creating an HTTP/2 or /3 server. (node recently made HTTP/2 a first class citizen but you still need to setup a Let's encrypt certificate)

HTTP/2 really shines with serving static assets, in the past with HTTP/1 we used CDN's to maximize parallel requests and dns lookups. Nowadays you can create many requests with only one DNS lookup and all the assets over the same wire.

I've been using Caddy since the early v1 days, there are a few feature I miss that haven't landed in v2 yet; such as protecting routes with JWT via a plugin. Overall if you are creating a new project you should use V2.

Getting started!
You can download the binary [here](https://caddyserver.com/docs/download) or use the handy [DigitalOcean](https://digitalocean.com) [droplet](https://marketplace.digitalocean.com/apps/caddy)

For me a common use case of Caddy is as a static file server and a reverse proxy for my backend services. Here's what works for me as "Caddyfile" the yaml edition of the configuration file

```yaml
example.com {
encode gzip
header Cache-Control max-age=31536000
file_server {
root /var/www/html
}
log {
output file /var/log/access.log
}

}

api.example.com {
reverse_proxy 127.0.0.1:3000
}
```

And just like that you are likely to get 100 lighthouse score on google served over http/2.

[Here's](https://caddyserver.com/v2) more information about Caddy, hope this helps!

Comments and retweets welcome https://twitter.com/cactusanddove/status/1274861623094763531?s=20
