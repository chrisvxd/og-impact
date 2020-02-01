import fb from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

fb.initializeApp({
  credential: fb.credential.cert(serviceAccount),
  databaseURL: 'https://awesomesocialshare.firebaseio.com'
});

export const db = fb.firestore();
