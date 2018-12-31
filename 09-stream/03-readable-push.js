#!/usr/bin/node
//推送流
const Readable=require('stream').Readable;

var src=new Readable();

src.push('hello');
src.push('world');
src.push(null);

src.pipe(process.stdout);
