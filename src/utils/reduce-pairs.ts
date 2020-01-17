export default (pairs: any[]) =>
  pairs.reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});
