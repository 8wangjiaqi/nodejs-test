#!/usr/bin/node

/*写一个web服务*/
const http=require('http'),
      path=require('path'),
      fs=require('fs'),
      //log=console.log;
      util=require('util'),
      log=util.debuglog('wd');


var file;  //request file in URL

http.createServer((req,res)=>{
  log(req.headers);
  log();//空行，使调试信息更可读
  log(req.url);
  /*console.log(ireq);*/
  //console.log(req.url);
  //console.log(req.headers);
  file=path.join(__dirname,req.url);
  log(file);

  /* res.end('hello world')*/
  /*会报错，做错误处理，使程序在遇到错误时候不会崩溃*/
  //res.end(fs.readFileSync(file).toString('utf8'));
  //fs.readFileSync()同步读取文件，只有全部读取之后才转换
  
  //利用管道
  //创建一个可读流，在留上捕获Error事件
  var read=fs.createReadStream(file);
  read.on('error',(err)=>{
    res.end(err.message);
    return;
  });
  read.pipe(res);
  }).listen(8080);



