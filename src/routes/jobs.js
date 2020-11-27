'use strict';

const Router = require('koa-router');

const { JobService } = require('../services');

const router = new Router({
  prefix: '/jobs'
});
router.get('/', async ctx => {
  try {
    const sortingQuery = ctx.query.sorting;
    const filtersQuery = ctx.query.filter;
    const search = ctx.query.search;
    const result = await JobService.get({ filtersQuery, sortingQuery, search });
    ctx.ok({ result });
  } catch (err) {
    ctx.bad(400, 'Something went wrong');
  }
});

router.get('/:id', async ctx => {
  try {
    const id = ctx.params.id;
    ctx.test(id, 400, 'No id');
    const job = await JobService.getById({ id });
    ctx.ok({ job });
  } catch (err) {
    ctx.bad(400, err);
  }
});

module.exports = router;
