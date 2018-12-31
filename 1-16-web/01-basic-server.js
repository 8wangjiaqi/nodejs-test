#!/usr/bin/node

//设置响应信息，增加头部字段
const http = require('http');

http.createServer((req, res) => {
  var body='hello world';

  //res.statusCode=404；
  //post请求如果有内容，在客户端响应信息中出现下列信息;
  res.setHeader('Content-Length',Buffer.byteLength(body));
  res.setHeader('Content-Type','text/plain');

  //req.pipe(process.stdout);
  //console.log(req.headers);
  
  //服务程序打印头部信息
  console.log(req.method);
  console.log(req.headers);
  //把请求req pipe管道到当前屏幕上
  //因为请求可能有主体内容，就把它显示到屏幕上
  req.pipe(process.stdout);
  console.log('');

  res.end(body);

}).listen(8080);
