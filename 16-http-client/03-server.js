#!/usr/bin/node
//服务器端解析请求数据（请求体）
const http=require('http');

http.createServer((req,res)=>{
  console.log(req.headers);
  req.pipe(process.stdout);
  res.end('OK!');
}).listen(8080);
