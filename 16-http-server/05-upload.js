#!/usr/bin/node

const http=require('http');

http.createServer((req,res)=>{
  if(req.url ==='/' && req.method ==='POST'){
    console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}`)
  console.log(req.headers);
console.log('');
//通过pipe管道直接放在控制台
req.pipe(process.stdout);
  res.end('OK');
  }else{
    res.statusCode=404;
    res.end('Error!');

  }
}).listen(8080);
