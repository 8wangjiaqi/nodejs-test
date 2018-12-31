const express=require('express');
//const common=require('../../libs/common.js');

var router = express.Router();

const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});


router.post('/',(req,res)=>{
  req.on('data',(data)=>{
    var username=JSON.parse(data).username;
    db.query('SELECT * FROM my_gongluo_table WHERE username=?',[username],(err,data)=>{
      if(err){
        console.log(err);
        res.status(500).send('database error').end();
      }else{
        res.send(data);
      }
    });
  });
});



module.exports = router;

