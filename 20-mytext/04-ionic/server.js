const express=require('express');
//const static=require('express-static');
//const mysql=require('mysql');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
//const consolidate=require('consolitade');
//const expressRoute=require('express-route');
const bodyParser=require('body-parser');
const multer  = require('multer');
const multerObj = multer({ dest: './static/upload/'  });
const path = require('path');

const app=express();


//-----------------------------------------------------------------------------------------------
//1、获取请求数据
//get自带

app.use(bodyParser.urlencoded());
app.use(multerObj.any());

//app.use(express.static(path.join(__dirname, 'public')));


//----------------------------------------------------------------------------------------------
//2、cookie、session
app.use(cookieParser());

//防止污染全局变量，包起来

(function(){
  var keys=[];
  for(var i=0;i<100000;i++){
    keys[i]='a_'+Math.random();
  }
  app.use(cookieSession({
    name:'sess_id',
    keys:keys,
    maxAge:20*60*1000  //20min
  }));
})();




//---------------------------------------------------------------------------------------------------------------------
//3、，模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use('views',path.join(__dirname,'public'));

//不用
/* consolidate  
 * 
// 设置把模板以html形式输出
app.set('view engine','html');
// // 模板位置
app.set('views','./template');
// // 使用ejs引擎去解析html，这里可以设置多种多对
app.engine('html',consolidate.ejs);
*/


//------------------------------------------------------------------------------------------------------------------------
//4、route

//var r1=express.Router();
//var r2=express.Router();

/*
var indexRouter = require('./route/1.js');
app.use('/article', indexRouter);
console.log(app.get('views'));

app.use('/blog',require('./route/2.js'));

app.get('/',function(req,res){
  res.end('hello world');
});
*/


//app.use('/article/',require('./route/1.js'));



//添加路由必须用use添加
//app.use('/article',r1);

/*var r2=express.Router();
app.use('/blog',r2);
r2.get('/a.html',function(req,res){
  res.send('你好').end();
});
r2.get('/b.html',function(req,res){
  res.send('你好，世界').end();
});
*/

//-----------------------------------------------------------------------------------------------

app.use('/',require('./route/web/index.js'));

app.use('/admin',require('./route/admin/index.js'));
//app.use('/admin',require('./route/admin/index.js'));
app.use('/api',require('./route/web/login.js'));

/*
app.post('/api',(req,res)=>{
  res.setHeader('Access-Control-Allow-Methods', '*');
  //res.setHeader('Access-Control-Allow-Headers', 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE');
  //res.setHeader('Access-Control-Allow-Origin', '*');
  console.log('req:',req.headers);
  //var json={status:20};
  
  //res.send('json');
  //res.json(json);
  //res.header('Access-Control-Allow-Origin：*');
  
  var chunk='';
  req.on('data',(data)=>{
    chunk=JSON.parse(data);
    res.end(chunk.a);
    //compare(chunk.tel,chunk.pwd,res);
    //res.json(chunk);
    console.log(chunk);
    //console.log('req:',req.headers);         
  });
                
  res.end('hello world');
});
*/













//----------------------------------------------------------------------------------------------
//5、default：static
//从static下拿东西
//app.use(static())
app.use(express.static('./static'));




/*app.get('/',(req,res)=>{
  res.end('hello world');

});*/

app.listen('3000',function(){
  console.log('server start 3000');

});


//app.listen('3000');

