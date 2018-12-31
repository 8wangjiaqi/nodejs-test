const express=require('express');
//const common=require('../../libs/common.js');
const pathLib=require('path');
const fs=require('fs');

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
      db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${req.query.id}`,(err,data)=>{
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
            fs.unlink('static/upload/'+data[0].src,(err)=>{
              if(err){

                console.error(err);
                res.status(500).send('file opration error').end();
              }else{
                //数据库删除
                
                db.query(`DELETE  FROM custom_evaluation_table WHERE ID='${req.query.id}'`,
                  (err)=>{
                    if(err){
                      console.error(err);
                      res.status(500).send('database error').end();
                    }else{
                      res.redirect('/admin/custom');
                    }
                  });
              }
            });
          }
        }
      });

    
      break;

    //修改
    case 'mod':
      db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${req.query.id}`,(err,data)=>{
        if(err){
          console.error(err);
          res.status(500).send('database error').end();
        }else if(data.length==0){
          res.status(404).send('no this  evaluation').end();
        }else{
          //console.log('这是啥');
          db.query('SELECT * FROM custom_evaluation_table',(err,evaluations)=>{
            if(err){
              console.error(err);
              res.status(500).send('database error').end();
            }else{
              res.render('admin/custom.ejs',{evaluations,mod_data:data[0]});
            }
          });

          //res.render('admin/custom.ejs',{mod_data:data[0]});
        }
      });
      break;

    default:
      db.query('SELECT * FROM custom_evaluation_table',(err,evaluations)=>{
        if(err){
          console.error(err);
          res.status(500).send('database error').end();
        }else{
          console.log(1,evaluations);
          res.render('admin/custom.ejs',{evaluations});
        }
      });

  }
});




//-----------------------------------------------------------------------------------
//post

router.post('/',(req,res)=>{
  var title=req.body.title;
  var description=req.body.description;
  //console.log('post');
  //console.log('1:',req.files);
  //判断传没传图片
  if(req.files[0]){
    //console.log('2:',req.files);
    var ext=pathLib.parse(req.files[0].originalname).ext;
    var oldPath=req.files[0].path;
    var newPath=req.files[0].path+ext;

    var newFileName=req.files[0].filename + ext;

  }else{
    //console.log('3:',req.files);
    newFileName=null;

  }

  /* 
  //console.log(req.files);
  //扩展名
  var ext=pathLib.parse(req.files[0].originalname).ext;
  //parse出来的是个对象
  //console.log('ext:',ext);

  var oldPath=req.files[0].path;
  //console.log(oldPath);
  var newPath=req.files[0].path+ext;
  //console.log(newPath);
  
  var newFileName=req.files[0].filename + ext;
  //xxx.jpg
  //console.log(newFileName);
  */
  
  if(newFileName){
    //console.log('new1:',newFileName);
    //重命名，加扩展名
    fs.rename(oldPath,newPath,(err)=>{
      if(err){
        console.error(err);
        res.status(500).send('file opration error').end();
      }else{
        if(req.body.mod_id){ //修改
          console.log('aaa');
          //先删除老的
          db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${req.body.mod_id}`,(err,data)=>{
            if(err){
              console.error(err);
              res.status(500).send('database error a').end();
            }else if(data.length==0){    //没有老的
              res.status(404).send('old file not found a').end();
            }else{
              //添加
              fs.unlink('static/upload/'+data[0].src,(err)=>{
                if(err){
                  console.error(err);
                  res.status(500).send('file opration error').end();
                }else{
                  db.query(`UPDATE custom_evaluation_table SET \
                  title='${title}',description='${description}', \
                  src='${newFileName}' \
                  WHERE ID=${req.body.mod_id}`,(err)=>{
                    if(err){
                      console.error(err);
                      res.status(500).send('database error').end();
                    }else{
                      res.redirect('/admin/custom');
                    }
                  });
                }
              });
            }
          });
        }else{                //添加
          //console.log(newFileName);
          db.query(`INSERT INTO custom_evaluation_table \
            (title,description,src)
          VALUE('${title}','${description}','${newFileName}')`,(err)=>{
            if(err){
              console.error(err);
              res.status(500).send('database error').end();
            }else{
              res.redirect('/admin/custom');
            }
          });
        }
      }   
    });
  }else{   //没有上传头像
    if(req.body.mod_id){ //修改
      //直接改
      db.query(`UPDATE custom_evaluation_table SET \
      title='${title}',description='${description}' \
      WHERE ID=${req.body.mod_id}`,(err)=>{
        if(err){
          console.error(err);
          res.status(500).send('database error').end();
        }else{
          res.redirect('/admin/custom');
        }
      });
    }else{                //添加
      db.query(`INSERT INTO custom_evaluation_table (title,description,src) 
      VALUE('${title}','${description}','${newFileName}')`,(err)=>{
        if(err){
          console.error(err);
          res.status(500).send('database error').end();
        }else{
          res.redirect('/admin/custom');
        }
      });
    }
  }


  
});


/*
      if(req.body.mod_id){ //修改

      }else{                //添加
        db.query(`INSERT INTO custom_evaluation_table \
          (title,description,src)
        VALUE('${title}','${description}','${newFileName}')`,
        (err,data)=>{
          if(err){
            console.error(err);
            res.status(500).send('database error').end();
          }else{
            res.redirect('/admin/custom');
          }
        });
      }
    }
*/

module.exports = router;

