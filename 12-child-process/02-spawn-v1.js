#!/usr/bin/node
const cp=require('child_process');
//模块引用

/*const child = cp.spawn('cat', ['02-child.js']);*/
var cmd = process.argv[2];

const child = cp.spawn('cat',[cmd]);
//写死了，只能打印02-child.js
//spawn只能运行指定的程序，参数需要在列表中给出

child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
