#!/usr/bin/node

//通过spawn的方法引用

const cp=require('child_process');


var cmd=cp.spawn('./02-child.js');


cmd.stdout.pipe(process.stdout);
cmd.stderr.pipe(process.stderr);
