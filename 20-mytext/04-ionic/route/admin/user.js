const express=require('express');
//const common=require('../../libs/common.js');
//const pathLib=require('path');
//const fs=require('fs');

const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});

var router = express.Router();


//-------------------------------------------------------------------------------------------
//get请求

router.get('/',(req,res)=>{
  //console.log('get');
  switch(req.query.act){
    //删除
    case 'del':
      //文件删除
      db.query(`SELECT * FROM user_table WHERE ID=${req.query.id}`,(err,data)=>{
        if(err){
          console.error(err);
          res.status(500).send('database error').end();
        }else{
          //没有数据
          if(data.length==0){
            res.status(404).send('no this custom evaluation').end();
          }else{
            //fs用来专门删除文件的unlink(path,callback)
            //被server包起来，不用向上推
            //fs.unlink('static/upload/'+data[0].src,(err)=>{
            //  if(err){

            //    console.error(err);
            //    res.status(500).send('file opration error').end();
            //  }else{
            //数据库删除
                
            db.query(`DELETE  FROM user_table WHERE ID='${req.query.id}'`,(err)=>{
              if(err){
                console.error(err);
                res.status(500).send('database error').end();
              }else{
                res.redirect('/admin/user');
              }
            });
          //}
          //});
          }
        }
      });

    
      break;

    default:
      db.query('SELECT * FROM user_table',(err,evaluations)=>{
        if(err){
          console.error(err);
          res.status(500).send('database error').end();
        }else{
          console.log(1,evaluations);
          res.render('admin/user.ejs',{evaluations});
        }
      });

  }
});




//-----------------------------------------------------------------------------------
//post


module.exports = router;

