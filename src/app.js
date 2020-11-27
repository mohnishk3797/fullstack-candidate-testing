'use strict';

const log = require('./log')('app');
const Koa = require('koa');
const routes = require('./routes');
const { error, response } = require('./middlewares');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const env = process.env.NODE_ENV;

module.exports = async _ => {
  if (!process.env.NODE_ENV) {
    log.error('NODE_ENV not set');
    process.exit(1);
  }

  const app = new Koa();

  app.use(cors({
    credentials: true
  }));

  app.use(error());
  app.use(response());
  app.use(bodyParser());
  app.use(routes());

  if (env !== 'development') {
    app.proxy = true;
  }

  if (env === 'production') {
    app.use(ctx => ctx.empty());
  } else {
    app.use(ctx => ctx.bad(404, 'Not found'));
  }

  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '0.0.0.0';

  return app.listen(port, host, () => {
    log.info(`Server started ${host}:${port}`);
  });
};
