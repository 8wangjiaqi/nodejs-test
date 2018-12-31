#!/usr/bin/node
//执行程序
const cp=require('child_process');

//不写这个就是写死了
var cmd=process.argv[2],
    arg=[];

for(var i=3;i<process.argv.length;i++) arg.push(process.argv[i])
   // arg=process.argv;

//写死的代码
//cp.execFile('cat',['01-exec-file.js'],(err,out,error)=>{

cp.execFile(cmd,arg,(err,out,error)=>{
  if(err){
    console.log(error);
    
    process.exit(100);//错误编号
  }

  console.log(out);
});
