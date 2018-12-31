#!/usr/bin/node

/*写一个web服务*/
const http=require('http'),
      path=require('path'),
      fs=require('fs');

var file;

http.createServer((req,res)=>{
  /*console.log(ireq);*/
  console.log(req.url);
  //console.log(req.headers);
  file=path.join(__dirname,req.url);

  /* res.end('hello world')*/
  /*会报错，做错误处理，使程序在遇到错误时候不会崩溃*/
  //res.end(fs.readFileSync(file).toString('utf8'));
  //fs.readFileSync()同步读取文件，只有全部读取之后才转换
  
  //利用管道
  fs.createReadStream(file).pipe(res);
}).listen(8080);



