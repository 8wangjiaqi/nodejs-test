#!/usr/bin/node
//异步的错误处理
const fs=require('fs');
var file=process.argv[2] || __filename;

fs.readFile(file,(err,data)=>{
  if(err){
    console.log('Sorry,Something Wrong!');
    process.exit(100);
  }else{
    console.log(data.toString('utf8'));
  }
});
