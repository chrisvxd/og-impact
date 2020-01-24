<p align="center">
<img src="https://i.imgur.com/k5oSTYu.png" width=700 />
</p>
<h1 align="center"> <a href="https://chrisvxd_og-impact.saasify.sh">ogimpact.sh</a></h1>


<p align="center"><a href="#free-templates">Gallery</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="https://ogimpacteditor.netlify.com">Template Editor</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="https://chrisvxd_og-impact.saasify.sh/pricing">Pricing</a></p>

<p align="center">Dynamic social share images for Facebook, Twitter, Slack etc in a single line of HTML</p>

```html
<meta property="og:image" content="https://ogi.sh?title=Hello%20World" />
```

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

<img style="border-radius: 8px; margin-bottom: 16px;" src="https://ssfy.sh/chrisvxd/og-impact/image?template=article&eyebrow=27%20AUGUST&title=INTO%20THE%20OCEAN&subtitle=Explore%20the%20depths%20of%20the%20deep%20blue%20sea&unsplashId=gGX1fJkmw3k" width=400 />

Neat, huh? Check out the [template gallery](#free-templates) to explore our beautiful, free templates covering various use cases.

### Create your own image template ([Pro feature](https://og-impact.saasify.sh/pricing))

Creating your own, branded template can be done via [the Editor](http://ogimpacteditor.netlify.com). It's as simple as HTML and CSS, with [handlebars](https://handlebarsjs.com/guide/#what-is-handlebars) for templating. We also provide [an API](https://chrisvxd_og-impact.saasify.sh/docs#operation/registerPOST) to register custom templates if that's more your thing.

> **IMPORTANT: Your template will be public, so it's important to watermark the template with your brand or URL**.

Using your template:

```html
<meta
  property="og:image"
  content="https://ssfy.sh/chrisvxd/og-impact/image?
    template=M6Hdtamy&
    title=Hello%20World"
/>
```

<img style="border-radius: 8px; margin-bottom: 16px;" src="https://ssfy.sh/chrisvxd/og-impact/image?template=M6Hdtamy&title=Hello%20World" width=400 />

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
