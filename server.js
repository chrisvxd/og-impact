const fts = require('fts');
const ftsHttp = require('fts-http');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const createEndpoint = async (path, type = 'get') => {
  const tsFilePath = `./src/${path}.ts`;
  const jsFilePath = `./build/${path}.js`;

  const definition = await fts.generateDefinition(tsFilePath);
  const handler = ftsHttp.createHttpHandler(definition, jsFilePath);

  app[type](`/${path}`, handler);

  console.log(`Registered /${path} handler`);
};

async function createServer() {
  console.log('Registering endpoints...');

  await createEndpoint('image');
  await createEndpoint('preview');
  await createEndpoint('publish', 'post');
  await createEndpoint('url');

  app.listen(port, () => {
    console.log(`OG IMPACT server listening at http://localhost:${port}`);
  });
}

createServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
