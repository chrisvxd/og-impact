import { HttpResponse } from 'fts-core';
import puppeteer from 'puppeteer-serverless';
import renderSocialImage from 'puppeteer-social-image';
import reducePairs from './utils/reduce-pairs';
import getCustomTemplates from './utils/get-custom-templates';
import configureParams from './utils/configure-params';

let browser;

/**
 * Preview an image wrapped in a Twitter-style chrome. Remaining params are passed to the handlebars template.
 *
 * @param template - Either a [free](/docs#section/Quick-Start/Free-Templates) or [user template](/docs#section/Quick-Start/Create-your-own-image-template) ID
 * @param body - Handlebars template to render in the body. If used, `template` will be ignored.
 * @param styles - CSS to use for a custom template. Use with `body`.
 *
 * @return Image as `image/png`
 */
export default async function preview(
  template: string = 'basic',
  body?: string,
  styles?: string,
  ...templateParamsArr: any[]
): Promise<HttpResponse> {
  browser = browser || (await puppeteer.launch({}));

  const templateParams = reducePairs(templateParamsArr);

  const options: any = {
    templateParams,
    browser,
    preview: true
  };

  if (body) {
    options.templateBody = body;
    options.templateStyles = styles;
  } else {
    options.template = template;

    const { customTemplates, isPrebuiltTemplate } = await getCustomTemplates(
      template
    );

    options.customTemplates = customTemplates;
    options.templateParams = configureParams(
      templateParams,
      isPrebuiltTemplate
    );
  }

  const img = await renderSocialImage(options);

  return {
    headers: {
      'Content-Type': 'image/png'
    },
    statusCode: 200,
    body: img
  };
}
