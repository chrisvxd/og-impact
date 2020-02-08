import { db } from '../config';

export const freeTemplates = ['article', 'basic', 'fiftyfifty'];
const customTemplates = {};
const additionalParams = {};

export const getCustomTemplates = async template => {
  const isFreeTemplate = freeTemplates.indexOf(template) !== -1;
  let resolvedTemplate = template;

  // Load template from DB if it's not already in cache
  if (!isFreeTemplate && typeof customTemplates[template] === 'undefined') {
    const snapshot = await db
      .collection('templates')
      .doc(template)
      .get();

    const { body, styles, extendsTemplate, params = {} } = snapshot.data();

    if (extendsTemplate) {
      resolvedTemplate = extendsTemplate;
      additionalParams[template] = params;
    } else {
      customTemplates[template] = { body, styles };
    }
  }

  return {
    customTemplates,
    isFreeTemplate,
    resolvedTemplate,
    extendedParams: additionalParams[template] || {}
  };
};
