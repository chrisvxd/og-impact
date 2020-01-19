<p align="center">
<img src="https://i.imgur.com/k5oSTYu.png" width=700 />
</p>
<h1 align="center">OG IMPACT</h1>

<p align="center">Dynamic social share images for Facebook, Twitter, Slack etc in a single line of HTML</p>

```html
<meta property="og:image" content="https://ogi.sh?title=Hello%20World" />
```

<p align="center">
  <a href="https://og-impact.saasify.sh">
    https://ogimpact.sh
  </a>
</p>

## Quick Start

### Create your first image

Create a meta tag, and add it to the `<head />` of the page in question.

```html
<meta
  property="og:image"
  content="https://ssfy.sh/chrisvxd/og-impact/image?title=Hello%20World"
/>
```

<img style="border-radius: 8px; margin-bottom: 16px;" src="https://ssfy.sh/chrisvxd/og-impact/image?title=Hello%20World" width=400 />

When the page is shared, Facebook will show the image at https://ssfy.sh/chrisvxd/og-impact/image?title=Hello%20World. For Twitter, add `<meta property="twitter:image" />`.

We can also change the background via the `unsplashId` query param:

```html
<meta
  property="og:image"
  content="https://ssfy.sh/chrisvxd/og-impact/image?title=Hello%20World&unsplashId=phIFdC6lA4E"
/>
```

<img style="border-radius: 8px; margin-bottom: 16px;" src="https://ssfy.sh/chrisvxd/og-impact/image?title=Hello%20World&unsplashId=phIFdC6lA4E" width=400 />

This is using the default template, `basic`. You can see the [full documentation](#free-templates) for `basic` below. To remove the watermark, you'll need to upgrade.

### Trying another template

Let's try another template called `article`, designed for (but not limited to) sharing articles. The query params are URL encoded, and broken onto new lines so you can see what's going on.

```html
<meta
  property="og:image"
  content="https://ssfy.sh/chrisvxd/og-impact/image?
           template=article&
           eyebrow=27%20AUGUST&
           title=INTO%20THE%20OCEAN&
           subtitle=Explore%20the%20depths%20of%20the%20deep%20blue%20sea&
           unsplashId=gGX1fJkmw3k"
/>
```

<img style="border-radius: 8px; margin-bottom: 16px;" src="https://ssfy.sh/chrisvxd/og-impact/image?template=article&eyebrow=TV%20SERIES&title=INTO%20THE%20OCEAN&subtitle=Explore%20the%20depths%20of%20the%20deep%20blue%20sea&unsplashId=gGX1fJkmw3k" width=400 />

Neat, huh? Check out the [template gallery](#free-templates) to explore our beautiful, free templates covering various use cases.

### Create your own image template

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
  'https://ssfy.sh/chrisvxd/og-impact/register' \
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
  content="https://ssfy.sh/chrisvxd/og-impact/image?
    template=M6Hdtamy&
    title=Hello%20World"
/>
```

<img style="border-radius: 8px; margin-bottom: 16px;" src="https://ssfy.sh/chrisvxd/og-impact@5989f6b4/image?template=M6Hdtamy&title=Hello%20World" width=400 />

> **This URL will be public, so it's important to watermark the template with your brand or URL**.

### Free Templates

#### `basic` (the default)

> Renders text on a background image.

<img style="border-radius: 8px; margin-bottom: 16px;" src="https://ssfy.sh/chrisvxd/og-impact/image?title=Hello%20World" width=400 />

##### Params

- `title` _string_ - text to render
- `unsplashId` _string_ - [Unsplash](https://unsplash.com/) image ID for the background
- `unsplashKeywords` _string_ - keywords (comma-separated) for a random image from [Unsplash](https://unsplash.com/) for the background
- `imageUrl` _string_ - URL for the background image

##### Snippet

```html
<meta
  property="og:image"
  content="https://ssfy.sh/chrisvxd/og-impact/image?
    title=Hello%20World&
    unsplashId=WLUHO9A_xik"
/>
```

#### `article`

> Display a title and subtitle on a background image, with an optional eyebrow

<img style="border-radius: 8px; margin-bottom: 16px;" src="https://ssfy.sh/chrisvxd/og-impact/image?template=article&eyebrow=27%20AUGUST&title=INTO%20THE%20OCEAN&subtitle=Explore%20the%20depths%20of%20the%20deep%20blue%20sea&unsplashId=gGX1fJkmw3k" width=400 />

##### Params

- `title` _string_ - title text
- `subtitle` _string_ - subtitle text
- `eyebrow` _string_ - eyebrow text that renders above the title. Use for date
- `unsplashId` _string_ - [Unsplash](https://unsplash.com/) image ID for the background
- `unsplashKeywords` _string_ - keywords (comma-separated) for a random image from [Unsplash](https://unsplash.com/) for the background
- `imageUrl` _string_ - URL for the background image

##### Snippet

```html
<meta
  property="og:image"
  content="https://ssfy.sh/chrisvxd/og-impact/image?
           template=article&
           eyebrow=27%20AUGUST&
           title=INTO%20THE%20OCEAN&
           subtitle=Explore%20the%20depths%20of%20the%20deep%20blue%20sea&
           unsplashId=gGX1fJkmw3k"
/>
```

#### Additional templates

More templates will be added in the near future.

## License

MIT © [Chris Villa](http://www.chrisvilla.co.uk)
