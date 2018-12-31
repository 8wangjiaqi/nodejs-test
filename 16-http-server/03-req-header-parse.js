#!/usr/bin/node
//请求头的解析
const http=require('http');

//createServer创建一个wen服务
http.createServer((req,res)=>{
  //console.log(req.headers);
  console.log('host:',req.headers.host);
  console.log('user-Agent:',req.headers['user-agent']);
}).listen(8080);


