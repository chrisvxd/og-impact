export default (templateParams, isPrebuiltTemplate) => {
  const definedImage =
    templateParams.unsplashId ||
    templateParams.unsplashKeywords ||
    templateParams.imageUrl;

  return isPrebuiltTemplate
    ? {
        unsplashId: definedImage ? null : 'OeC1wIsKNpk',
        ...templateParams,
        watermark: null,
        watermarkUrl: 'ogimpact.sh'
      }
    : templateParams;
};
