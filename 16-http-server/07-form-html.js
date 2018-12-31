#!/usr/bin/node
//后台模板渲染

const http=require('http'),
      url =require('url'),
      fs=require('fs'),
      qs  =require('querystring'),
      log =console.log;

//var items=['吃饭','睡觉'];
var items=[];

http.createServer((req,res)=>{
  log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  log(req.headers);
  log('');
  //showPage(req,res);
    
  if(req.url ==='/' && req.method==='GET'){
    showPage(req,res);
  }
  //get 给她数据，post先返回数据？
  else if(req.url ==='/' && req.method ==='POST') {
    var data='';
    req.on('data',(chunk)=>{ data += chunk;});
    req.on('end',()=>{
      log('data:',data);
      var list=qs.parse(data);
      log('list:',list);

      if(list.item !=='') items.push(list.item);
      showPage(req,res);
    });
    //showPage(req,res);
  }
  else{
    res.statusCode=404;
    res.end('Error!');

  }
}).listen(8080);


function showPage(req,res){
  var html=fs.readFileSync('todo-list-template.html').toString('utf8');
  var content=items.map(function(item){return '<li>' +item +'</li>'}).join('\n');
  //log('content:',content);
  //!!replace要有返回值
  html=html.replace('%',content);
  //log(%);
  log(html);
  res.end(html);
}
