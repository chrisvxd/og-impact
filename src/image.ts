import { HttpResponse } from 'fts-core';
import puppeteer from 'puppeteer-serverless';
import renderSocialImage from 'puppeteer-social-image';
import reducePairs from './utils/reduce-pairs';
import getCustomTemplates from './utils/get-custom-templates';
import configureParams from './utils/configure-params';

let browser;

/**
 * Render a social share image from a template. All remaining params get passed to the handlebars template.
 *
 * @param template - Either a [free](/docs#section/Quick-Start/Free-Templates) or [user template](https://chrisvxd_og-impact_e8cd1a94.saasify.sh/docs#section/Quick-Start/Create-your-own-template) ID
 * @param size - Preset size for the image
 *
 * @return Image as `image/jpeg`
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
      'Content-Type': 'image/jpeg'
    },
    statusCode: 200,
    body
  };
}
