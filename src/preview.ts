import { HttpResponse } from 'fts-core';
import puppeteer from 'puppeteer-serverless';
import renderSocialImage from 'puppeteer-social-image';
import reducePairs from './utils/reduce-pairs';
import getCustomTemplates from './utils/get-custom-templates';
import configureParams from './utils/configure-params';

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
  template: string = 'basic',
  body?: string,
  styles?: string,
  size?: 'facebook' | 'twitter',

  ...templateParamsArr: any[]
): Promise<HttpResponse> {
  browser = browser || (await puppeteer.launch({}));

  const templateParams = reducePairs(templateParamsArr);

  const options: any = {
    templateParams,
    size,
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
      'Content-Type': 'image/jpeg'
    },
    statusCode: 200,
    body: img
  };
}
