import { HttpResponse } from 'fts-core';
import puppeteer from 'puppeteer-serverless';
import renderSocialImage from 'puppeteer-social-image';
import reducePairs from './utils/reduce-pairs';
import { db } from './config';

const prebuiltTemplates = ['article', 'basic'];
const customTemplates = {};

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

  const isPrebuiltTemplate = prebuiltTemplates.indexOf(template) !== -1;

  // Load template from DB if it's not already in cache
  if (!isPrebuiltTemplate && typeof customTemplates[template] === 'undefined') {
    const snapshot = await db
      .collection('templates')
      .doc(template)
      .get();

    const { body, styles } = snapshot.data();

    customTemplates[template] = { body, styles };
  }

  const definedImage =
    templateParams.unsplashId ||
    templateParams.unsplashKeywords ||
    templateParams.imageUrl;

  const templateParamsWithConfig = isPrebuiltTemplate
    ? {
        unsplashId: definedImage ? null : 'OeC1wIsKNpk',
        ...templateParams,
        watermark: null,
        watermarkUrl: 'ogimpact.sh'
      }
    : templateParams;

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
