import { db } from './config';
import shortid from 'shortid';

shortid.seed(7654987); // Random seed to make less predictable

/**
 * Generate an image with an existing or custom template and save to S3.
 *
 * @param body - Handlebars template to render in the body for a custom template.
 * @param styles - CSS to use for a custom template. Passed to the head.
 *
 * @return Object containing the template
 *
 */
export default async function register(
  body: string,
  styles: string
): Promise<{
  template: string;
}> {
  const collectionRef = db.collection('templates');

  let result;
  let id;

  while (!result) {
    id = shortid.generate();
    try {
      result = await collectionRef.doc(id).set({
        body,
        styles
      });

      console.log(`Created template with id ${id}`);
    } catch {
      console.warn(`Template with id ${id} already exists, trying another...`);
    }
  }

  return {
    template: id
  };
}
