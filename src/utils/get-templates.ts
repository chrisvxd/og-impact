import { db } from '../config';

export const freeTemplates = ['article', 'basic', 'fiftyfifty'];
const customTemplates = {};

export const getCustomTemplates = async template => {
  const isFreeTemplate = freeTemplates.indexOf(template) !== -1;

  // Load template from DB if it's not already in cache
  if (!isFreeTemplate && typeof customTemplates[template] === 'undefined') {
    const snapshot = await db
      .collection('templates')
      .doc(template)
      .get();

    const { body, styles } = snapshot.data();

    customTemplates[template] = { body, styles };
  }

  return { customTemplates, isFreeTemplate };
};
