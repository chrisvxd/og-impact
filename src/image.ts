import { HttpResponse } from 'fts-core';
import puppeteer from 'puppeteer';
import renderSocialImage from 'puppeteer-social-image';
import reducePairs from './utils/reduce-pairs';
import { getCustomTemplates } from './utils/get-templates';
import configureParams from './utils/configure-params';

let browser;

/**
 * Render an image from a template. Remaining params are passed to the handlebars template.
 *
 * @param template - Either a [free](/docs#section/Quick-Start/Free-Templates) or [user template](/docs#section/Quick-Start/Create-your-own-image-template) ID
 * @param size - Size of the image to render. Can be `facebook`, `twitter`, `ig-landscape`, `ig-square`, `ig-portrait`, `ig-story`, `pinterest` or any `WIDTHxHEIGHT` value in pixels.
 *
 * @return Image as `image/png`
 */
export default async function image(
  template: string = 'basic',
  size?: string,
  ...templateParamsArr: any[]
): Promise<HttpResponse> {
  browser = browser || (await puppeteer.launch({ args: ['--no-sandbox'] }));

  const templateParams = reducePairs(templateParamsArr);

  const {
    customTemplates,
    isFreeTemplate,
    resolvedTemplate,
    extendedParams,
  } = await getCustomTemplates(template);

  const templateParamsWithConfig = configureParams(
    { ...templateParams, ...extendedParams },
    isFreeTemplate
  );

  const body = await renderSocialImage({
    template: resolvedTemplate,
    templateParams: templateParamsWithConfig,
    customTemplates,
    size,
    browser,
    type: 'jpeg',
    jpegQuality: 80,
  });

  return {
    headers: {
      'Content-Type': 'image/jpeg',
    },
    statusCode: 200,
    body,
  };
}
