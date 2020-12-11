import { HttpResponse } from 'fts-core';
import puppeteer from 'puppeteer';
import renderSocialImage from 'puppeteer-social-image';
import reducePairs from './utils/reduce-pairs';
import { getCustomTemplates } from './utils/get-templates';
import configureParams from './utils/configure-params';

let browser;

/**
 * Preview an image wrapped in a Twitter-style chrome. Remaining params are passed to the handlebars template.
 *
 * @param template - Either a [free](/docs#section/Quick-Start/Free-Templates) or [user template](/docs#section/Quick-Start/Create-your-own-image-template) ID
 * @param body - Handlebars template to render in the body. If used, `template` will be ignored.
 * @param styles - CSS to use for a custom template. Use with `body`.
 * @param size - Size of the image to render. Can be `facebook`, `twitter`, `ig-landscape`, `ig-square`, `ig-portrait`, `ig-story`, `pinterest` or any `WIDTHxHEIGHT` value in pixels.
 *
 * @return Image as `image/png`
 */
export default async function preview(
  template: string = 'basic',
  body?: string,
  styles?: string,
  size?: string,
  ...templateParamsArr: any[]
): Promise<HttpResponse> {
  browser = browser || (await puppeteer.launch({}));

  const templateParams = reducePairs(templateParamsArr);

  const options: any = {
    templateParams,
    browser,
    preview: true,
    size,
    type: 'jpeg',
    jpegQuality: 70,
  };

  if (body) {
    options.templateBody = body;
    options.templateStyles = styles;
  } else {
    const {
      customTemplates,
      isFreeTemplate,
      resolvedTemplate,
      extendedParams,
    } = await getCustomTemplates(template);

    options.template = resolvedTemplate;

    options.customTemplates = customTemplates;
    options.templateParams = configureParams(
      { ...templateParams, ...extendedParams },
      isFreeTemplate
    );
  }

  const img = await renderSocialImage(options);

  return {
    headers: {
      'Content-Type': 'image/jpeg',
    },
    statusCode: 200,
    body: img,
  };
}
