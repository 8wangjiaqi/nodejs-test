#!/usr/bin/node
//处理http响应

const http=require('http');

http.createServer((req,res)=>{
  if(req.url==='/'){
     var html = '<!DOCTYPE html><html><head><title>Hello</title><head><body><h1>Hello world!</h1></body></html>';
  
     //两种写报文头的方法
    /*res.statusCode=200;
     res.setHeader('Conent-Type','text/html');
      res.end(html);*/

      res.writeHead(200,{
        'Content-Type':'text/html',
        'Conent-Length':Buffer.byteLength(html),
      });
      res.end(html);
  }else {
   res.statusCode = 404;
   res.end('Resource not found!');
    //res.end('error!');
  }
}).listen(8080);
