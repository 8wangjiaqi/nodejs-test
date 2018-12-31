

const express=require('express');
const app=express();

app.get('/',(req,res)=>{
  res.end('hello world');
});
//定义路由
//路由组件
function c1(req,res,next){
  console.log('c1');
  next();
}
function c2(req,res,next){
  console.log('c2');
  next();
  //一个路由可以有多个路由处理函数，next就是把它交给下一个
  //一般不这么写
}

//app.get('/abc',(req,res)=>{
app.get('/abc',[c1,c2],function(req,res,next){
  console.log('abc!');
  next();
},function(req,res){
  console.log('def!');
  res.send('OK!');
});
//回调函数可以支持多个
app.listen('8080');
