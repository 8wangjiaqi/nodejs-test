#!/usr/bin/node
//实现 RESTful API
const http=require('http'),
      url=require('url'),
      qs=require('querystring');

//var items=['吃饭','睡觉'];

var items=[];
//启动一个服务，监听8080端口，
http.createServer((req,res)=>{
  console.log(req.method);
  //req.method方法解析，解析出四个，分别负责增删改查
  switch(req.method){
    case "GET":
      select(req,res);
      break;

    case "POST":
      add(req,res);
      break;

    case "PUT":
      update(req,res);
      break;

    case "DELETE":
      remove(req,res);
      break;



    default:
      res.end('error');

  }

  //res.end('OK');
}).listen(8080);



function select(req,res){
  var msg=JSON.stringify(items);
  console.log(msg);
  res.statusCode=200;
//res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
  res.setHeader('Content-Type','application/json');
  res.setHeader('Content-Length',Buffer.byteLength(msg));
   res.end(msg);
}
function remove(req,res){
  if(req.url==='/'){
    items =[];
    res.end('OK!');
  }else{
    var id=qs.parse(url.parse(req.url).query).id;
    console.log('ID',id);
    if(id>=0 && id<items.length){
      items.splice(id,1);
      res.end('OK!');
    }else{
      res.end('Error!');
    }

  }
  res.end('OK!');
}
function add(req,res){
  var data='';
  req.on('data',(chunk)=>{data+=chunk;});
  req.on('end',()=>{
    //console.log(qs.parse)
    var item=qs.parse(data).item;
  if(item !=='') items.push(item);
  })
  res.end('OK!')
}
function update(req,res){ 
  res.end(req.method)
}
