import s3 from 's3';
export * from 's3';

export const createClient = options => {
  const client = s3.createClient(options);

  const uploadFile = params =>
    new Promise((resolve, reject) => {
      const uploader = client.uploadFile(params);

      uploader.on('error', err => {
        reject(err);
      });

      uploader.on('end', () => {
        resolve(params.s3Params.Key);
      });
    });

  return {
    ...client,
    uploadFile
  };
};

export default {
  ...s3,
  createClient
};
