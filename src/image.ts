import { HttpResponse } from 'fts-core';
import renderSocialImage from 'puppeteer-social-image-lambda';
import reducePairs from './utils/reduce-pairs';
import { db } from './config';

const prebuiltTemplates = ['basic'];
const customTemplates = {};

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
  const templateParams = reducePairs(templateParamsArr);

  // Load template from DB if it's not already in cache
  if (
    prebuiltTemplates.indexOf(template) === -1 &&
    typeof customTemplates[template] === 'undefined'
  ) {
    const snapshot = await db
      .collection('templates')
      .doc(template)
      .get();

    const { body, styles } = snapshot.data();

    customTemplates[template] = { body, styles };
  }

  const body = await renderSocialImage({
    template,
    templateParams,
    customTemplates,
    size
  });

  return {
    headers: {
      'Content-Type': 'image/jpeg'
    },
    statusCode: 200,
    body
  };
}
