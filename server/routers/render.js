'use strict';
const router = require('koa-router')();

router.get('/', async(ctx)=>{
    return ctx.redirect('pagea');
});

router.get('/pagea', async(ctx)=>{
    return ctx.render('pagea' , {
        title:'Webpack4 构建案例_页面A'
    });
});

router.get('/pageb', async(ctx)=>{
    return ctx.render('pageb' , {
        title:'Webpack4 构建案例_页面B'
    });
});

module.exports = router;
