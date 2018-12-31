const express=require('express');
const common=require('../../libs/common.js');

var router = express.Router();

const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});



//----------------------------------------------------------------------------------------------
//get

router.get('/',(req,res)=>{
  res.render('admin/login.ejs',{});

});

router.post('/',function(req,res){
  //res.send('我是admin').end();
  var username=req.body.username;
  var password=common.md5(req.body.password+common.MD5_SUFFIX);
  db.query(`SELECT *FROM admin_table WHERE username='${username}'`,
    (err,data)=>{
      if(err){
        console.error(err);
        res.status(500).send('database error').end();
      }else{
        if(data.length==0){
          res.status(400).send('no this admin').end();
        }else{
          if(data[0].password==password){
            //成功
            
            req.session['admin_id']=data[0].ID;
            res.redirect('/admin/');
          }else{
            res.status(404).send('this password is incorrect').end();
          }
        }
      }
    });

  //console.log(req.body);
  //res.render('admin/login',{});
});
module.exports = router;

