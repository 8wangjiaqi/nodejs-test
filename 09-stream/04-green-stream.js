#!/usr/bin/node
//自定义可写流

//控制台转义，字符转义


const Writable=require('stream').Writable,
      util=require('util');

function GreenStream(){
  Writable.call(this);
}

GreenStream.prototype._write=function(chunk,encode,cb){
  process.stdout.write('\033[1;32m'+chunk.slice(0,chunk.length-1)+
     '\033[1;37m');
  cb;
};

util.inherits(GreenStream,Writable);

var dst=new GreenStream();
process.stdin.pipe(dst);
