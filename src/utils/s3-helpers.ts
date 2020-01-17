const s3 = require('../s3-promise');
const uuid = require('uuid/v1');
const tempWrite = require('temp-write');

export const upload = async (client, body, suffix = ''): Promise<string> => {
  const params = {
    localFile: tempWrite.sync(body, `file${suffix}`),
    s3Params: {
      Bucket: 'awesome-social-share',
      Key: `${uuid()}${suffix}`
    }
  };

  const key = await client.uploadFile(params);

  return s3.getPublicUrlHttp('awesome-social-share', key);
};
