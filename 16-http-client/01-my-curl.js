#!/usr/bin/node
//get请求
const http=require('http'),
      url=require('url');

var address=process.argv[2] ||'http://sample.wangding.in/web/one-div.html';

console.log('URL:',address);
address=global.encodeURI(address);
console.log('encodeURI:',address);

//组装请求数据
const options={
  hostname:url.parse(address).hostname,
  port:url.parse(address).port,
  path:url.parse(address).pathname,
  //path:url.parse(address).path,
  /*method:"POST",*/
  headers:{
    'User-Agent':'01-my-curl.js'
  }
};

//res是个流，往里面写数据
http.get(options,(res)=>{
/*http.get(address,(res)=>{*/
  //解析响应头
  console.log(`HTTP/${res.httpVersion} ${res.statusCode} ${res.statusMessage}`);
  console.log(res.headers);
  console.log();
  res.pipe(process.stdout);
});
