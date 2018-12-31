#!/usr/bin/node

/*写一个web服务*/
const http=require('http'),
      //path=require('path'),
      fs=require('fs');

//var file;

//根路径,当前目录下的www文件找要的东西
var root=__dirname+'/' +(process.argv[2] || 'www');

http.createServer((req,res)=>{

  console.log(__dirname);
  var url='http://'+req.headers.host +req.url;
  /*console.log(ireq);*/
 
  console.log('host:',req.headers.host);
  console.log('url:',req.url);
  console.log('URL:',url);
  //因为要在控制台显示请求的头信息，所以写在这里
  console.log(req.headers);
  console.log('');


  //file=path.join(__dirname,req.url);
  //www下的哪一个文件
  var fileName=root+req.url;

  /* res.end('hello world')*/
  /*会报错，做错误处理，使程序在遇到错误时候不会崩溃*/
  //res.end(fs.readFileSync(file).toString('utf8'));
  //fs.readFileSync()同步读取文件，只有全部读取之后才转换
  
  //上一步读取文件后，pipe管道过来
  fs.createReadStream(fileName).pipe(res);
}).listen(8080);



