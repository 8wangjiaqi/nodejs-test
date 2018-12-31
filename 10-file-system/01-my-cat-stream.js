#!/usr/bin/node

const fs=require('fs');
var file=process.argv[2]|| __filename;


fs.createReadStream(file).pipe(process.stdin);

//加全局异常处理
process.on('uncaughtException',(err)=>{
  console.error(err.message);
  process.exit(100);
});

/*
var src= fs.createReadStream(file);

src.on('error',(err)=>{
  console.error(err.message);
  process.exit(1);
})

src.on('open',function(){
 // console.log(open);
  this.pipe(process.stdout);
});*/
