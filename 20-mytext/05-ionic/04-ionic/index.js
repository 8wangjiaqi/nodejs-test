const express=require('express');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const multer  = require('multer');
const multerObj = multer({ dest: './static/upload/'  });
const path = require('path');

const app=express();
app.use(express.static('./static'));

//----------------1、获取请求数据--------------------------------------------------------------
//get自带
app.use(multerObj.any());



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





app.set('views', path.join(__dirname, 'views'));
console.log(app.get('views'));
app.set('view engine', 'ejs');


app.get("/",function(req,res){
  res.end('hello world');
});

var indexRouter = require('./route/1.js');
app.use('/article', indexRouter);

app.use('/blog',require('./route/2.js'));



app.listen('3000');

