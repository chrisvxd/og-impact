import { HttpContext } from 'fts-http';
import { db } from './config';
import shortid from 'shortid';

shortid.seed(7654987); // Random seed to make less predictable

/**
 * Publish a custom template
 *
 * @param body - Handlebars template to render in the body for a custom template.
 * @param styles - CSS to use for a custom template. Passed to the head.
 *
 * @return Object containing the template
 */
export default async function publish(
  body: string,
  styles: string,
  context: HttpContext
): Promise<{
  template: string;
}> {
  const collectionRef = db.collection('templates');
  const user = context.headers['x-saasify-user'];
  const plan = context.headers['x-saasify-plan'];

  console.log('publish', { user, plan });

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
