import { HttpResponse } from 'fts-core';
import { getUrl } from './utils/get-url';
import reducePairs from './utils/reduce-pairs';
import qs from 'qs';

/**
 * Render a shareable URL and redirect to the original page
 *
 * @param id - URL id
 *
 * @return HTML page containing meta tags
 */
export default async function url(
  id: string,
  ...passthroughQsPairs: any[]
): Promise<HttpResponse> {
  const urlObj = await getUrl(id);

  const redirectUrlParts = urlObj.url.split('?');
  const redirectUrlQsObj =
    redirectUrlParts.length > 1 ? qs.parse(redirectUrlParts) : {};
  const passthroughQsObj = reducePairs(passthroughQsPairs);
  const passthroughQs = qs.stringify({
    ...redirectUrlQsObj,
    ...passthroughQsObj,
  });

  const redirectUrl = `${redirectUrlParts[0]}${
    passthroughQs ? '?' + passthroughQs : ''
  }`;

  return {
    headers: {
      'Content-Type': 'text/html',
      Location: redirectUrl,
    },
    statusCode: 200,
    body: Buffer.from(`<html>
    <head>
      <meta property="og:image" content="${urlObj.image}" />
      <meta name="image" content="${urlObj.image}" />
      <meta itemprop="image" content="${urlObj.image}" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="${urlObj.image}" />
      <title>${urlObj.title}</title>
      <meta name="description" content="${urlObj.description}"/>
      <meta http-equiv="Refresh" content="0; URL=${redirectUrl}">
    </head>
    <body>
      <a href="${redirectUrl}">Click here</a> if you're not automatically redirected.
    </body>
  </html>`),
  };
}
