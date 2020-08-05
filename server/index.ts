// #region Global Imports
import next from 'next';
import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
// #endregion Global Imports

// #region Local Imports
import routes from './routes';
import devProxy from './proxy';
// #endregion Local Imports

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();

  app.setAssetPrefix(process.env.STATIC_PATH);
  server.use(express.static(path.join(__dirname, '../public/static')));

  Object.keys(devProxy).forEach((context) => {
    server.use(createProxyMiddleware(context, devProxy[context]));
  });

  server.get('*', (req, res) => handler(req, res));

  server.listen(port);

  // eslint-disable-next-line no-console
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`,
  );
});
