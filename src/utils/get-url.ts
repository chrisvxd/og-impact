import { db } from '../config';

export const getUrl = async (urlId) => {
  const snapshot = await db.collection('urls').doc(urlId).get();

  return snapshot.data();
};
