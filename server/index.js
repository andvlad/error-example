const compress = require('@fastify/compress');
const middie = require('@fastify/middie');
const fastifyStatic = require('@fastify/static');
const fastify = require('fastify');
const path = require('path');
const vite = require('vite');
const { renderPage } = require('vite-plugin-ssr');
const { mountRoutes } = require('./routes');

const defaultLanguage = 'en';
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const root = `${__dirname}/..`;

(async function() {
  const app = fastify();

  await app.register(middie);
  await app.register(compress);

  mountRoutes(app);

  if (isProduction) {
    const distPath = path.join(root, '/dist/client/assets');

    app.register(fastifyStatic, {
      root: distPath,
      prefix: '/assets/'
    });
  } else {
    const viteServer = await vite.createServer({
      root,
      server: { middlewareMode: true }
    });

    await app.use(viteServer.middlewares);
  }

  app.get('*', async (req, reply) => {
    const pageContextInit = {
      urlOriginal: req.url,
      locale: defaultLanguage,
    }
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;

    if (!httpResponse) {
      return reply.code(404).type('text/html').send('Not Found');
    }

    const { body, statusCode, contentType } = httpResponse;

    return reply
      .status(statusCode)
      .type(contentType)
      .send(body);
  })

  app.listen({ port });

  console.log(`Server running at http://localhost:${port}`);
})();
