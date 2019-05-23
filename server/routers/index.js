'use strict';

module.exports = (app)=>{
  app.use(require('./api').routes());
  app.use(require('./render').routes());
};