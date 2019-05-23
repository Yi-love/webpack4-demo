'use strict';
/*global __dirname process*/
const path = require('path');

const Koa = require('koa');
const json = require('koa-json');
const serve = require('koa-static');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const views = require('koa-views');
const locale = require('koa-locale');
const i18n = require('koa-i18n');
const routers = require('./routers');
const {i18nCookie} = require('./middleware/i18nCookie');
const {baseContext} = require('./middleware/baseContext');

const app = new Koa();

//log
app.use(logger());
//静态文件
app.use(serve(path.join(__dirname , '../static')));
//response
app.use(json());
//添加方法
app.use(baseContext);
//多语言cookie
app.use(i18nCookie);
//模版文件
app.use(views('server/views',  { map: {html: 'ejs'}}));

//i18n
locale(app);

app.use(i18n(app, {
    directory: 'server/locales',
    locales: ['cn' , 'en'], // default Locale
    modes: ['cookie']
}));

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
