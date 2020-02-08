import { db } from './config';
import shortid from 'shortid';
import { freeTemplates } from './utils/get-templates';

shortid.seed(7654987); // Random seed to make less predictable

// curl -X POST \
//   'http://localhost:3000/unwatermark' \
//   -H 'content-type: application/json' \
//   -d '{
//   "template": "basic",
//   "domain": "www.chrisvilla.co.uk",
//   "logo": "https://storage.googleapis.com/saasify-uploads-prod/96fbd695a5200ca9fad74e3d778b5ec91c1b1bf4.png"
// }'

/**
 * Removing the watermark from a free template
 *
 * @param template - Name of the [free template](/docs#section/Quick-Start/Free-Templates). i.e. `basic`
 * @param domain - Domain of your site, excluding protocol. i.e. www.ogimpact.sh
 * @param logo - URL to your brand logo.
 *
 * @return Object containing the template ID
 */
export default async function unwatermark(
  template: string,
  domain: string,
  logo?: string
): Promise<{
  template: string;
}> {
  if (freeTemplates.indexOf(template) === -1) {
    throw new Error('You can only upgrade a free template');
  }

  // TODO validate domain

  const collectionRef = db.collection('templates');

  let result;
  let id;

  while (!result) {
    id = shortid.generate();
    try {
      result = await collectionRef.doc(id).set({
        extendsTemplate: template,
        params: {
          logo,
          watermark: domain
        }
      });

      console.log(
        `Removed the watermark from template ${template} for domain ${domain}. New ID ${id}.`
      );
    } catch {
      console.warn(`Template with id ${id} already exists, trying another...`);
    }
  }

  return {
    template: id
  };
}
