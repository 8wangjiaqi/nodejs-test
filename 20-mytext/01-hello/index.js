//express是一个函数
const express=require('express');
const app=express();
//const bodyParser = require('body-parser');



//app是一个监听函数

app.get('/api',(req,res)=>{
  res.setHeader('Access-Control-Allow-Methods', '*');
  //res.setHeader('Access-Control-Allow-Headers', 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE');
  //res.setHeader('Access-Control-Allow-Origin', '*');
  console.log('req:',req.headers);

  //var json={status:20};
  //res.write('aaa');
  res.send('json');
  //res.json(json);

  //res.header('Access-Control-Allow-Origin：*');
  
  //res.end('hello world');
});




/*
//可以配置多个路径
app.get('/name',(req,res)=>{
  res.end('name');
});*/



//发送cookie
/*app.use('/',function(req,res){
  //向前台发东西用res
  res.cookie('user','blue',{path:'/aaa/a.html',maxAge:30*24*3600*1000});
  res.send('OK');
});*/




//读取cookie
/*app.use(cookieParser());
app.use('/aaa/a.html',function(req,res){
  console.log(req.cookies);
});*/




/*app.use(bodyParser.urlencoded({
  extended:false,     //扩展模式
  limit: 2*1024*1024  //限制2M
}));
*/


/*app.use('/',function(req,res){
  var html=''
              +'<!DOCTYPE html>\n'
              + '<html>\n'
              + '  <head>\n'
              + '    <meta charset="UTF-8">\n'
              + '    <title>登录</title>\n'
              + '  </head>\n'
              + '  <body>\n'
              + '    <form  method="post" action="/">\n'
              + '       用户：<input type="text" name="user" /><br>'
              +'        密码：<input type="password" name="pass" /><br>'
              + '       <input type="submit" value="提交" />\n'
              + '    </form>\n'
              + '  </body>\n'
              + '</html>';

  console.log(req.body);
  
  //req.query获取参数
  //console.log(req.query);
  res.end(html);
});
*/



app.listen('3000',function(){
  console.log('server start 8080');
});



