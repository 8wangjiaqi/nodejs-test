#!/usr/bin/node
//启动定时器，每隔一秒钟产生数据
//通过8080端口监听  curl http://localhost:8080  
const http=require('http'),
      cp=require('child_process');

http.createServer((req,res)=>{
  var cmd=cp.spawn('./02-child.js');

  cmd.stdout.pipe(res)
}).listen(8080);
