'use strict';

const chokidar = require('chokidar');
const cp = require('child_process');

const watcher = chokidar.watch(['./server']);

let appIns = cp.fork('./server/index');

function reload(app) {
  app.kill('SIGINT');
  return cp.fork('./server/index');
}

watcher.on('add' , path=>appIns = reload(appIns))
  .on('change' , path=>appIns = reload(appIns))
  .on('unlink' , path=>appIns = reload(appIns));

process.on('SIGINT' , ()=>process.exit(0));