#!/usr/bin/node

const mysql=require('mysql');

const con=mysql.createConnection({
  host:'localhost',
  //主机
  user:'root',
  password:'19980206wjw',
  database:'test'
  //连接到哪个库
});

con.connect();
//连接数据库


//操作数据库

//opteration db

//查
/* 
const sql='select *from books where book_id=?';
//问号是占位符，用变量替代
//条件查询
con.query(sql,[1],function(err,result){
  if(err){
    console.error(err);
    process.exit(100);
  }
  console.log(result);
});
*/


//插入
/* 
const sql='insert into books(book_id,title,status) values(?,?,?);';
con.query(sql,[2,'Java',0],function(err,result){
  if(err){
    console.error(err);
    peocess.exit(100);
  }
  console.log(result);
});
*/

//改
/*
const sql='update books set title=? where book_id=?';
con.query(sql,['MySQL programming',2],function(err,result){
  if(err){
    console.error(err);
    process.exit(100);
  }
  console.log(result);
});
*/

//删

const sql='delete from books where book_id = ?';
con.query(sql, [2], function(err, result){
  if(err) {
        console.error(err.message);
        process.exit(1);
              
  }

    console.log(result);
})

con.end();
