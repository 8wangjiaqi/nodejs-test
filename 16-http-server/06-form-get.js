#!/usr/bin/node

const http=require('http'),
      url =require('url'),
      qs  = require('querystring');

//var items=['吃饭','睡觉'];
var items=[];

http.createServer((req,res)=>{
  if(url.parse(req.url).pathname ==='/' && req.method ==='GET'){
    console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
    console.log(req.headers);
    console.log('');
  
    

    var data=qs.parse(url.parse(req.url).query);

    console.log('query string:',url.parse(req.url).query);
    console.log('data:',data);
    /*if(url.parse(req.url).query!==''){
      var data=url.parse(req.url).query;
      items.push(data.item);
    }*/

    if(typeof data.item !== 'undefined')
      items.push(data.item);
    //items.push(data.item);
    //通过pipe管道直接放在控制台
    req.pipe(process.stdout);
    //req.setEncoding('utf8');
    // res.setEncoding('binary');
    var html=''
      +'<!DOCTYPE html>\n'
      + '<html>\n'
      + '  <head>\n'
      + '    <meta charset="UTF-8">\n'
      + '    <title>Todo list</title>\n'
      + '  </head>\n'
      + '  <body>\n'
      + '    <h1>Todo List</h1>\n'
      + '    <ul>\n'
      +      items.map(function(item) {return '<li>' + item      +               '</li>';}).join('\n')
      + '    </ul>\n'

      + '    <form method="get" action="/">\n'
      + '    <p><input type="text" name="item" />'
      + '       <input type="submit" value="Add Item" /></p               >\n'
      + '    </form>\n'
      + '  </body>\n'
        + '</html>';
    //res.setEncoding('utf8');
    //res.end(html,'binary');
    res.end(html);
  }else{
    res.statusCode=404;
    res.end('Error!');
  }
}).listen(8080);
