<img src="https://i.imgur.com/ammCmgh.png" />

<h2 align="center">Dynamic social images</h2>

<p align="center">Dynamic social share images for Facebook, Twitter, Slack etc in a single line of HTML</p>

```html
<meta property="og:image" content="https://ogi.sh?title=Hello%20World" />
```

<p align="center">
<img src="https://ssfy.sh/chrisvxd/og-impact@e8cd1a94/image?title=Hello%20World&backgroundImageUrl=https://source.unsplash.com/WLUHO9A_xik" width=500 />
</p>

<p align="center">
  <a href="https://og-impact.saasify.sh">
    https://og-impact.sh
  </a>
</p>

## Intro

OG IMPACT is highly-cached API for generating dynamic social images, built on top of [puppeteer-social-image](https://github.com/chrisvxd/puppeteer-social-image). It's designed to be used directly in your HTML, making integration as simple as possible.

## Features

- **Make social sharing more engaging** by adding a dynamic visual to each page.
- **Beautiful, free templates** for many different use cases.
- **Custom templates** to represent your brand, using just HTML & CSS (Pro).
- **Perfect for large data sets** like jobs boards, real estate platforms and more.

## Quick Start

Welcome to the quick-start! Below are some examples for common ways of dynamically generating an image.

Also be sure to check out the full reference of [API endpoints](https://og-impact.saasify.sh/docs#tag/service).

### Generate your first image

Let's start by creating a `<meta />` tag for social sharing using a URL that dynamically generates an image using the default template. This should go in the `<head />` of your web page.

```html
<meta
  property="og:image"
  content="https://ssfy.sh/chrisvxd/og-impact@e8cd1a94/image?
    title=Hello%20World"
/>
```

<img style="border-radius: 8px; margin-bottom: 16px;" src="https://ssfy.sh/chrisvxd/og-impact@e8cd1a94/image?title=Hello%20World" width=400 />

> Hint: Try copying the URL out of the `meta` tag to test it.

When your page gets shared, the social platform will read the meta tag and present [the image](https://ssfy.sh/chrisvxd/og-impact@e8cd1a94/image?title=Hello%20World) to the user. Upon receiving the request, OG IMPACT will render the image dynamically based on the query params before caching it.

This example will render in Facebook and others. For Twitter, add `<meta property="twitter:image" />`. For a full list, see [this reference]().

Now let's add a big more sex appeal to this by adding a background image via the `basic` template's `unsplashId` param, which takes an [Unsplash](https://unsplash.com/) image ID:

```html
<meta
  property="og:image"
  content="https://ssfy.sh/chrisvxd/og-impact@e8cd1a94/image?
    title=Hello%20World&
    unsplashId=WLUHO9A_xik"
/>
```

<img style="border-radius: 8px; margin-bottom: 16px;" src="https://ssfy.sh/chrisvxd/og-impact@e8cd1a94/image?title=Hello%20World&backgroundImageUrl=https://source.unsplash.com/WLUHO9A_xik" width=400 />

Nice! You can use anyone of our beautiful [free templates](#free-templates) that cover a wide variety of use cases, or create your own.

### Create your own template

> This is a pro feature, so you'll need to [upgrade](https://og-impact.saasify.sh/pricing) to access it.

Our templates run on HTML and CSS, so creating your own one as simple as:

1. Build your template in HTML and CSS
2. Register your template

#### Build your template

You can use any HTML/CSS editor you want, but [here's a CodePen](https://codepen.io/chrisvxd/pen/jOEvGWV?editors=1100) that can be used to build new templates. Let's start with a really simple template. Here's the HTML:

```html
<div class="social">
  <h1>{{title}}</h1>

  <!-- Include a branded watermark as templates are public -->
  <h2>example.com</h2>
</div>
```

In reality, this is a [handlebars template](https://handlebarsjs.com/guide/#what-is-handlebars). `{{title}}` will be replaced by the query param `?title` when rendering the image.

Now for the CSS:

```css
.social {
  align-items: center;
  display: flex;
  background: lightgray;
  flex-direction: column;
  font-size: 2rem;
  height: 100%;
  justify-content: center;
  font-family: sans-serif;
}
```

> If you want to use template params in CSS, it's recommended to use a `style` tag in your HTML.

#### Register your template

Registering the template can be done via the `/register` API. This is most easily done using cURL from the command line. We're working on a UI to simplify this for the future.

First, minify your HTML and CSS - then post via the CLI:

```bash
curl -X POST \
  'https://ssfy.sh/chrisvxd/og-impact@e8cd1a94/register' \
  -H 'content-type: application/json' \
  -d '{
  "body": "<div class=\"social\"><h1>{{title}}</h1><h2>example.com</h2></div>",
  "styles": ".social{align-items:center;display:flex;background:#d3d3d3;flex-direction:column;font-size:2rem;height:100%;justify-content:center;font-family:sans-serif}"
}'
```

Response

```json
{
  "template": "M6Hdtamy"
}
```

Now we can render our template using the `/image` URL as before

```html
<meta
  property="og:image"
  content="https://ssfy.sh/chrisvxd/og-impact@e8cd1a94/image?
    template=M6Hdtamy&
    title=Hello%20World"
/>
```

<img style="border-radius: 8px; margin-bottom: 16px;" src="https://ssfy.sh/chrisvxd/og-impact@5989f6b4/image?template=M6Hdtamy&title=Hello%20World" width=400 />

> **This URL will be public, so it's important to watermark the template with your brand or URL**.

### Free Templates

#### `basic` (the default)

> Renders text on a background image.

<img style="border-radius: 8px; margin-bottom: 16px;" src="https://ssfy.sh/chrisvxd/og-impact@e8cd1a94/image?title=Hello%20World&backgroundImageUrl=https://source.unsplash.com/WLUHO9A_xik" width=400 />

##### Params

- `title` _string_ - text to render
- `unsplashId` _string_ - [Unsplash](https://unsplash.com/) image ID for the background
- `unsplashKeywords` _string_ - keywords (comma-separated) for a random image from [Unsplash](https://unsplash.com/) for the background
- `imageUrl` _string_ - URL for the background image

##### Snippet

```html
<meta
  property="og:image"
  content="https://ssfy.sh/chrisvxd/og-impact@e8cd1a94/image?
    title=Hello%20World&
    unsplashId=WLUHO9A_xik"
/>
```

#### Additional templates

More templates will be added in the near future.

## License

MIT © [Chris Villa](http://www.chrisvilla.co.uk)
