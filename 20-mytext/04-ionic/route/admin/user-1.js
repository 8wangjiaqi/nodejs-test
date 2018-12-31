const express=require('express');
var router = express.Router();


const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});




//----------------------------------------------------------------------------------------------
//get

router.get('/',(req,res)=>{
  db.query('SELECT * FROM user_table',(err,evaluations)=>{
    if(err){
      console.error(err);
      res.status(500).send('database error').end();
    }else{
      res.render('admin/user.ejs',{evaluations});
    }     
  });


});

module.exports = router;

