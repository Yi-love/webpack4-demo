'use strict';
const router = require('koa-router')();

router.get('/', async(ctx)=>{
  return ctx.render('index');
});

module.exports = router;
