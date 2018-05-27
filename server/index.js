'use strict';

const path = require('path');

const Koa = require('koa');
const koaBody = require('koa-body');
const serve = require('koa-static');
const views = require('koa-views');
const routers = require('./routers');

const app = new Koa();

//解析body
app.use(koaBody());
app.use(serve(path.join(__dirname , '../static')));
app.use(views('server/views',  { map: {html: 'ejs'}}));
routers(app);

app.listen(4000 ,'127.0.0.1', ()=>{
  console.log(`server start listening port 4000...`);
});