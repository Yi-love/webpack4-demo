'use strict';
/*global __dirname process*/
const path = require('path');

const Koa = require('koa');
const json = require('koa-json');
const serve = require('koa-static');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const views = require('koa-views');
const routers = require('./routers');

const app = new Koa();

//log
app.use(logger());
//静态文件
app.use(serve(path.join(__dirname , '../static')));
//response
app.use(json());
//模版文件
app.use(views('server/views',  { map: {html: 'ejs'}}));
//解析body
app.use(koaBody());
//路由
routers(app);

//程序错误
process.on('uncaughtException', function(err) {
    console.error('[app] uncaughtException : Error caught in uncaughtException event: ' + JSON.stringify(err));
});

app.listen(4000 , ()=>{
    console.log(`server start listening port 4000...`);
});
