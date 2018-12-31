#!/usr/bin/node
//异步
const fs=require('fs');

var file=process.argv[2] || __filename;

var fid=fs.openSync(file,'r');

var len =fs.statSync(file).size;

var buf=new Buffer(len);
fs.readSync(fid,buf,0,len);

console.log(buf.toString('utf8'));

fs.closeSync(fid);


//同步
/*
const fs=require('fs');

var file=process.argv[2] || __filename;

try{

//同步的错误处理

console.log(fs.readFileSync(file).toString('utf8'));}
catch(err){
  console.log('Sorry,Something wrong!')
 console.log(err .message,err.name)
   process.exit(100);
}*/

