const express=require('express');
//const common=require('../../libs/common.js');

var router = express.Router();

const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});

router.get('/get',(req,res)=>{
  db.query('SELECT * FROM banner_table',(err,data)=>{
    if(err){
      res.status(500).send('database error').end();
    }else{
      res.send(data);
      console.log(data);
    }
  });
});


module.exports = router;

