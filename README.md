<p align="center">
<img src="https://i.imgur.com/k5oSTYu.png" width=700 />
</p>
<h1 align="center"> <a href="https://ogimpact.sh">ogimpact.sh</a></h1>

<p align="center">Instant social images, one line of HTML. Hosted version of <a href="https://github.com/chrisvxd/puppeteer-social-image">puppeteer-social-image</a>.</p>

```html
<meta property="og:image" content="https://ogi.sh?title=Hello%20World" />
```

<p align="center"><a href="#free-templates">Gallery</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="https://ogimpacteditor.netlify.com">Template Editor</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="https://ogimpact.sh/pricing">Pricing</a></p>

## Quick Start

### Create your first image

Create a meta tag, and add it to the `<head />` of each page:

```html
<meta property="og:image" content="https://ogi.sh?title=Hello%20World" />
```

<img style="margin-bottom: 16px;" src="https://ogi.sh/preview?title=Hello%20World&ghbust=2" width=400 />

When the page is shared, Facebook will show the image at https://ogi.sh?title=Hello%20World. For Twitter, see our [recommended meta tags](#recommended-meta-tags).

Try changing the background via the `unsplashId` param:

```html
<meta
  property="og:image"
  content="https://ogi.sh?title=Hello%20World&unsplashId=phIFdC6lA4E"
/>
```

<img style="margin-bottom: 16px;" src="https://ogi.sh/preview?title=Hello%20World&unsplashId=phIFdC6lA4E&ghbust=2" width=400 />

Add your logo via the `logo` param:

```html
<meta
  property="og:image"
  content="https://ogi.sh?title=Hello%20World&unsplashId=phIFdC6lA4E&logo=https%3A%2F%2Fi.imgur.com%2FyKp8kEI.png"
/>
```

<img style="margin-bottom: 16px;" src="https://ogi.sh/preview?title=Hello%20World&unsplashId=phIFdC6lA4E&logo=https%3A%2F%2Fi.imgur.com%2FyKp8kEI.png" width=400 />

This is using the default template, `basic`. You can see the [full documentation](#free-templates) for `basic` below. Want to remove the watermark? See the [instructions below](#remove-the-watermark).

### Trying another template

Let's try another template called `article` by pointing to `/article`. The query params are broken onto new lines so you can see what's going on.

```html
<meta
  property="og:image"
  content="https://ogi.sh/article?
           eyebrow=27%20AUGUST&
           title=INTO%20THE%20OCEAN&
           subtitle=Explore%20the%20depths%20of%20the%20deep%20blue%20sea&
           unsplashId=gGX1fJkmw3k"
/>
```

<img style="margin-bottom: 16px;" src="https://ogi.sh/preview?template=article&eyebrow=27%20AUGUST&title=INTO%20THE%20OCEAN&subtitle=Explore%20the%20depths%20of%20the%20deep%20blue%20sea&unsplashId=gGX1fJkmw3k&ghbust=2" width=400 />

Neat, huh? Check out the [template gallery](#free-templates) to explore our beautiful, free templates covering various use cases.

### Create your own image template

> This is a [pro feature](https://ogimpact.sh/pricing).

Creating your own, branded template can be done via [the Editor](http://ogimpacteditor.netlify.com). It's as simple as HTML and CSS, with [handlebars](https://handlebarsjs.com/guide/#what-is-handlebars) for templating. We also provide [an API](https://ogimpact.sh/docs#operation/publishPOST) to publish custom templates if that's more your thing.

**IMPORTANT: Your template will be public, so it's important to watermark the template with your brand or URL**.

Using your template:

```html
<meta
  property="og:image"
  content="https://ogi.sh?
    template=infGC5AQ&
    title=MIND%20BLOWN"
/>
```

<img style="margin-bottom: 16px;" src="https://ogi.sh/preview?template=infGC5AQ&title=MIND%20BLOWN&ghbust=2" width=400 />

### Free Templates

#### `basic` (the default)

> Renders text on a background image.

<img style="margin-bottom: 16px;" src="https://ogi.sh/preview?title=Hello%20World&ghbust=2" width=400 />

##### Params

- `title` _string_ - text to render
- `logo` _string_ - URL for the logo
- `unsplashId` _string_ - [Unsplash](https://unsplash.com/) image ID for the background
- `unsplashKeywords` _string_ - keywords (comma-separated) for a random image from [Unsplash](https://unsplash.com/) for the background
- `imageUrl` _string_ - URL for the background image
- `googleFont` _string_ - Google Font to render

##### Snippet

```html
<meta
  property="og:image"
  content="https://ogi.sh?title=Hello%20World&unsplashId=WLUHO9A_xik"
/>
```

#### `article`

> Display a title and subtitle on a background image, with an optional eyebrow

<img style="margin-bottom: 16px;" src="https://ogi.sh/preview/article?eyebrow=27%20AUGUST&title=INTO%20THE%20OCEAN&subtitle=Explore%20the%20depths%20of%20the%20deep%20blue%20sea&unsplashId=gGX1fJkmw3k&ghbust=2" width=400 />

##### Params

- `title` _string_ - title text
- `subtitle` _string_ - subtitle text
- `eyebrow` _string_ - eyebrow text that renders above the title. Use for date
- `logo` _string_ - URL for the logo
- `unsplashId` _string_ - [Unsplash](https://unsplash.com/) image ID for the background
- `unsplashKeywords` _string_ - keywords (comma-separated) for a random image from [Unsplash](https://unsplash.com/) for the background
- `imageUrl` _string_ - URL for the background image
- `googleFont` _string_ - Google Font to render

##### Snippet

```html
<meta
  property="og:image"
  content="https://ogi.sh/article?
           eyebrow=27%20AUGUST&
           title=INTO%20THE%20OCEAN&
           subtitle=Explore%20the%20depths%20of%20the%20deep%20blue%20sea&
           unsplashId=gGX1fJkmw3k"
/>
```

#### `fiftyfifty`

> Multi-use template for an array of use cases

<img style="margin-bottom: 16px;" src="https://ogi.sh/preview/fiftyfifty?title=What%20NOT%20to%20do%20when%20remote%20working&subtitle=Lorem%20ipsum%20dolor%20sit%20amet%2C%20consectetur%20adipiscing%20elit%2C%20sed%20do%20eiusmod%20tempor%20incididunt%20ut%20labore%20et%20dolore%20magna%20aliqua.%20Test%20and%20test%20some%20more.&unsplashId=QLqNalPe0RA&split=diagonal&logo=data%3Aimage%2Fsvg%2Bxml%3Bcharset%3Dutf-8%3Bbase64%2CPHN2ZyB3aWR0aD0nMjA5NicgaGVpZ2h0PSc0NDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc%2BPGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz48cmVjdCBmaWxsPScjRkZFNjAwJyB3aWR0aD0nNDQwJyBoZWlnaHQ9JzQ0MCcgcng9JzUyJy8%2BPGcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoODYgMTQyKSc%2BPHBhdGggZD0nTTE3Ni4xMzkgOTcuMTVsLTE2LjA5MSA1Mi45MDNTMTU4Ljg2NCAxNTUgMTUzLjY1NSAxNTVoLTE5Ljg4N2MtNi4xNTUgMC03LjU3Ni01LjQxOC03LjU3Ni01LjQxOGwtMjMuNjc1LTc1LjE0NC0yMy42NzUgNzUuMTQ0Uzc3LjQyMiAxNTUgNzEuMjY2IDE1NUg1MC40M2MtNS4yMDggMC02LjM5Mi00Ljk0Ny02LjM5Mi00Ljk0N0wuMjQgNi44MzFDLS40NyA0LjAwNS4yNCAwIDQuNTAyIDBoMjYuMDQzYzcuMTAzIDAgOC41MjMgNC43MTEgOS40NyA3LjUzOGwyMy40MzkgODAuMDkxTDg2LjE4IDcuNTM4Qzg3LjEyOCA0LjI0IDg4Ljc4NSAwIDk0LjIzMSAwaDE2LjU3MmM1LjIwOSAwIDYuODY2IDQuMjQgNy44MTMgNy41MzhsMjIuOTY1IDgwLjA5MSAyMy40MzgtODAuMDkxYy42Mi0yLjQ2NyAxLjk2Mi02LjM3IDcuMDE1LTcuMzIzLjY1LS4xNDIgMS40LS4yMTUgMi4yNjUtLjIxNWg0Ny40NDlDMjU4LjAyIDAgMjc3IDE5LjcyNCAyNzcgNDguNjhjMCAyOS4xNjUtMTkuNDAxIDQ4LjQ3LTU1LjQ2MyA0OC40N0gxNzYuMTR6bTQ0LjcyLTMwLjY0NWMxNS4zNzIgMCAyMi4wNzMtOC40MzEgMjIuMDczLTE4LjIzNSAwLTEwLjE5Ny02LjctMTguNDMyLTIyLjA3Mi0xOC40MzJoLTIzLjQ0M2wtMTEuMTcyIDM2LjY2N2gzNC42MTV6JyBmaWxsLW9wYWNpdHk9Jy44NycgZmlsbD0nIzAwMCcvPjxjaXJjbGUgZmlsbD0nIzIxMUQwMCcgY3g9JzI2MycgY3k9JzE0MScgcj0nMTQnLz48L2c%2BPHRleHQgZm9udC1mYW1pbHk9J0F2ZW5pck5leHQtRGVtaUJvbGQsIEF2ZW5pciBOZXh0JyBmb250LXNpemU9JzIxMCcgZm9udC13ZWlnaHQ9JzUwMCcgbGV0dGVyLXNwYWNpbmc9JzE3LjIxMycgZmlsbD0nIzIxMUQwMCc%2BPHRzcGFuIHg9JzU2MCcgeT0nMjk3Jz5XRUxMUEFJRC5JTzwvdHNwYW4%2BPC90ZXh0PjwvZz48L3N2Zz4%3D&ghbust=2" width=400 />

##### Params

- `title` _string_ - title text
- `subtitle` _string_ - subtitle text
- `logo` _string_ - URL for the logo
- `unsplashId` _string_ - [Unsplash](https://unsplash.com/) image ID for the background
- `unsplashKeywords` _string_ - keywords (comma-separated) for a random image from [Unsplash](https://unsplash.com/) for the background
- `imageUrl` _string_ - URL for the background image
- `googleFont` _string_ - Google Font to render

##### Snippet

```html
<meta
  property="og:image"
  content="https://ogi.sh/fiftyfifty?title=INTO%20THE%20MOUNTAINS"
/>
```

### Recommended Meta Tags

Here's a full list of the social tags we recommend using on your webpage. These will be picked up by social platforms whenever your webpage is shared in order to enhance the preview.

Place these inside the `<head>` of your webpage, and make sure they're rendered server-side.

#### Open Graph Meta Tags

Used by Facebook and many other platforms.

```html
<meta property="og:image" content="https://ogi.sh?title=Hello%20World" />
<meta property="og:site_name" content="EuroTravel" />
<meta property="og:type" content="website" />
<meta property="og:title" content="European Travel Destinations" />
<meta property="og:description" content="Offering tour packages for groups." />
```

#### Twitter Meta Tags

Used by Twitter.

```html
<meta name="twitter:image" content="https://ogi.sh?title=Hello%20World" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="European Travel Destinations" />
<meta name="twitter:description" content="Offering tour packages for groups." />
```

> Note that Twitter uses `name` instead of `property`.

See [this article](https://css-tricks.com/essential-meta-tags-social-media/) for a much more in-depth explanation of meta tags.

## License

MIT © [Chris Villa](http://www.chrisvilla.co.uk)
