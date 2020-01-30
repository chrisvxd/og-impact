import { db } from '../config';

const prebuiltTemplates = ['article', 'basic', 'fiftyfifty'];
const customTemplates = {};

export default async template => {
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

  return { customTemplates, isPrebuiltTemplate };
};
