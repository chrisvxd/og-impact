import { HttpResponse } from 'fts-core';
import puppeteer from 'puppeteer-serverless';
import renderSocialImage from 'puppeteer-social-image';
import reducePairs from './utils/reduce-pairs';

let browser;

/**
 * Generate an image with an existing or custom template and save to S3.
 *
 * @param body - Handlebars template to render in the body for a custom template.
 * @param styles - CSS to use for a custom template. Passed to the head.
 *
 * @return Object containing the template
 *
 */
export default async function preview(
  body: string,
  styles: string,
  size?: 'facebook' | 'twitter',

  ...templateParamsArr: any[]
): Promise<HttpResponse> {
  browser = browser || (await puppeteer.launch({}));

  const templateParams = reducePairs(templateParamsArr);

  // TODO watermark preview image (or render inside "Twitter" share frame preview)
  const img = await renderSocialImage({
    templateBody: body,
    templateStyles: styles,
    templateParams,
    size,
    browser,
    preview: true
  });

  return {
    headers: {
      'Content-Type': 'image/jpeg'
    },
    statusCode: 200,
    body: img
  };
}
