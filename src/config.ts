import s3 from './s3-promise';
import fb from 'firebase-admin';

export const s3Client = s3.createClient({
  maxAsyncS3: 20, // this is the default
  s3RetryCount: 3, // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'us-east-1'
  }
});

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

fb.initializeApp({
  credential: fb.credential.cert(serviceAccount),
  databaseURL: 'https://awesomesocialshare.firebaseio.com'
});

export const db = fb.firestore();
