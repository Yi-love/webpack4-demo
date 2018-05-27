'use strict';

const router = require('koa-router')();

router.prefix('/api');

router.get('/getUserList' , async(ctx)=>{
  ctx.set('Content-Type', 'application/json');
  let data = [{name:'Jin' , age:26},{name:'Yi',age:27},{name:'soul',age:28}];
  ctx.body = {code: 0 , data ,message:'success'};
});

module.exports = router;