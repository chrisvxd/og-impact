import { HttpResponse } from 'fts-core';
import puppeteer from 'puppeteer-serverless';
import renderSocialImage from 'puppeteer-social-image';
import reducePairs from './utils/reduce-pairs';
import getCustomTemplates from './utils/get-custom-templates';
import configureParams from './utils/configure-params';

let browser;

/**
 * Render an image from a template. Remaining params are passed to the handlebars template.
 *
 * @param template - Either a [free](/docs#section/Quick-Start/Free-Templates) or [user template](/docs#section/Quick-Start/Create-your-own-image-template) ID
 * @param body - Handlebars template to render in the body. If used, `template` will be ignored.
 * @param styles - CSS to use for a custom template. Use with `body`.
 *
 * @return Image as `image/png`
 */
export default async function image(
  template: string = 'basic',
  size?: 'facebook' | 'twitter',
  ...templateParamsArr: any[]
): Promise<HttpResponse> {
  browser = browser || (await puppeteer.launch({}));

  const templateParams = reducePairs(templateParamsArr);

  const { customTemplates, isPrebuiltTemplate } = await getCustomTemplates(
    template
  );

  const templateParamsWithConfig = configureParams(
    templateParams,
    isPrebuiltTemplate
  );

  const body = await renderSocialImage({
    template,
    templateParams: templateParamsWithConfig,
    customTemplates,
    size,
    browser
  });

  return {
    headers: {
      'Content-Type': 'image/png'
    },
    statusCode: 200,
    body
  };
}
