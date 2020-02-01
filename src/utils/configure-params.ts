export default (templateParams, isFreeTemplate) => {
  const definedImage =
    templateParams.unsplashId ||
    templateParams.unsplashKeywords ||
    templateParams.imageUrl;

  return isFreeTemplate
    ? {
        unsplashId: definedImage ? null : 'OeC1wIsKNpk',
        ...templateParams,
        watermark: null,
        watermarkUrl: 'ogimpact.sh'
      }
    : templateParams;
};
