#!/usr/bin/node

//设置响应信息，增加头部字段
const http = require('http'),
      qs=require('querystring');

//空数组用来存放待办事项
var items=[];

http.createServer((req, res) => {
  if(req.url != '/'){
    //提示错误信息
    err(res);
    return;
  }

  
  console.log(req.headers);
  console.log('');

  console.log(req.method);
  switch(req.method){
    case 'GET':
      //判断是get请求直接显示页面
      show(res);
      break;

    case 'POST':
      //post请求，把post提交的数据放到提交列表中
      add(req,res);
      break;

    default:
      err(res);
      break;
  }

  

}).listen(8080);


function show(res){
  var html='<!DOCTYPE html>\n'
          +'<html>\n'
          +'  <head>\n'
          +'    <meta charset="UTF-8">\n'
          +'    <title>To Do List</title>\n'
          +'  </head>\n'
          +'  <body>\n'
          +'    <h1>Todo List</h1>\n'
          +'    <ul>\n'
          +items.map(function(item){return '<li>'+item+'</li>';}).join('\n')
          +'    </ul>\n'
          +'    <form method="post" action="/"\n'
          +'      <p><input type="text" name="item"/></p>\n'
          +'      <p><input type="submit" value="Add Item"/></p>\n'
          +'    </form>\n'
          +'  </body>\n'
          +'</html>';
  
  res.setHeader('Content-Type','text/html');
  res.setHeader('Content-Length',Buffer.byteLength(html));
  
  res.statuCode=200;
  res.end(html);

}

function add(req,res){
  var body='';

  //req是可读流，可以用事件来获取
  //流操作两种方式：事件操作，管道操作
  req.on('data',function(chunk) { body += chunk; });
  req.on('end',function(){
    console.log(body);

    if(body !=''){
      items.push(qs.parse(body).item);
      //items.push(body.item);
    }
    
    show(res);
  });

}

function err(res){
  var msg='Not Found!';

  res.statuCode=404;
  res.setHeader('Content-Length',msg.length);
  res.setHeader('Content-Type','text/plain');

  res.end(msg);
}
