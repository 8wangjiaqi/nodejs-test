#!/usr/bin/node

const http=require('http'),
      server=http.createServer();

server.on('request',(req,res)=>{
  req.pipe(process.stdout);
  console.log(req.headers);
  res.end('Hello World!');
});

server.listen(8080);
