#!/usr/bin/node

const http=require('http'),
      //url =require('url'),
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
  else if(req.url ==='/' && req.method ==='POST') {
    var data='';
    req.on('data',(chunk)=>{ data += chunk;});
    req.on('end',()=>{
      log('data:',data);
      var list=qs.parse(data);
      log('list:',list);
      //log(items);
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
  var  html=''
    +'<!DOCTYPE html>\n'
    + '<html>\n'
    + '  <head>\n'
    + '    <meta charset="UTF-8">\n'
    + '    <title>Todo list</title>\n'
    + '  </head>\n'
                                                               + '  <body>\n'
    + '    <h1>Todo List</h1>\n'
    + '    <ul>\n'
    //+items
    + items.map(function(item) {return '<li>' + item + 
        '</l i>';}).join('\n')
    + '    </ul>\n'
    + '    <form method="post" action="/">\n'
                                                               + '    <p><input type="text" name="item" />'
    + '    <input type="submit" value="Add Item" /></p>\n'
                                                               + '    </form>\n'
    + '  </body>\n'
    + '</html>';
  //req.pipe(process.stdout);
  res.end(html);
}
