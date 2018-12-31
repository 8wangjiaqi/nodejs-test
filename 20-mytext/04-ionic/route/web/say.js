const express=require('express');
var router = express.Router();

const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});



router.post('/',(req,res)=>{
  req.on('data',(data)=>{
    
    var username=JSON.parse(data).username;
    var phone=JSON.parse(data).phone;
    var say=JSON.parse(data).say;
    
    if(!say)
    {
      console.log('请输入数据');
      res.end('-1');
    }else{
      db.query(`INSERT INTO suggestion_table (username,say,phone)
      VALUE('${username}','${say}','${phone}')`,(err,data)=>{
        //console.log('2:');
        if(err){
          console.error('1:',err);
          res.status(500).send('database error').end();
        }else{
          res.end('0');
          console.log(data);
        }
      }); 
    }

  });
});

module.exports = router;

