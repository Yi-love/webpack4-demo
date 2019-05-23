'use strict';
const router = require('koa-router')();

router.get('/', async(ctx)=>{
    return ctx.redirect('pagea');
});

router.get('/pagea', async(ctx)=>{
    return ctx.render('pagea' , {
        lang: ctx.getLang()
    });
});

router.get('/pageb', async(ctx)=>{
    return ctx.render('pageb' , {
        lang: ctx.getLang()
    });
});

module.exports = router;
