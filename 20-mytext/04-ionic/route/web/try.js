const express=require('express');
//const common=require('../../libs/common.js');

var router = express.Router();

const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});


router.post('/',(req,res)=>{
  //req.on('data',(data)=>{
    //var username=JSON.parse(data).username;
    db.query('SELECT * FROM banner_table',(err,data1)=>{
      if(err){
        console.log('1:',err);
        res.status(500).send('error database').end();
      }else{
        //console.log(username);
        res.send(data1);
        //console.log(data1);
      }
    });                 
  //});

});



module.exports = router;

