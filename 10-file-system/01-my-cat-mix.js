#!/bin/usr/node
const fs=require('fs');

var file=process.argv[2] || __filename;

var fid=fs.openSync(file,'r');
//'r' 说明只是可读的

//console.log(fs.readFileSync(fid).toString('utf8'));
fs.writeSync(1,fs.readFileSync(fid).toString('utf8'));
//1 是内置的标准输出流，0是输入，2是错误
fs.closeSync(fid);

