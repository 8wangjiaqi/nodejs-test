const mysql=require('mysql');
const express=require('express');
const app=express();

const db=mysql.createPool({host:'192.168.62.144',user:'root',port:'3306', password:'ddd',
  database:'ionic'});

//socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'

//db.connect();
//连接数据库


//操作数据库
//opteration db

//可以配置多个路径
app.get('/',(req,res)=>{
  db.query('SELECT * FrOM `admin_table`;',(err,data)=>{
    if(err){
      console.log(err);
      res.status(500).send('database error').end();
    }else{
      res.send(data);
    }
  });
});


/*
con.query('SELECT * FROM `admin_table`;',(err,data)=>{
  if(err)
    console.log('出错了',err);
  else
    console.log('成功了',data);
});
*/


app.listen('3000',function(){
  console.log('server start 8080');

});

