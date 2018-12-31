#!/usr/bin/node

//自己定义可读流
//继承类

const Readable =require('stream').Readable,
      util=require('util');
var c=97;

var MyReadable=function(){
  Readable.call(this);
};



MyReadable.prototype._read=function(){
  this.push(String.fromCharCode(c++));
  //this是这个流，放数据
  if(c>'z'.charCodeAt(0))  this.push(null);
};

util.inherits(MyReadable,Readable);


var src=new MyReadable();
src.pipe(process.stdout);

