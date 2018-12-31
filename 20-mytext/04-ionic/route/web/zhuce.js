const express=require('express');
var router = express.Router();

const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});



router.post('/',(req,res)=>{
  req.on('data',(data)=>{
    var username=JSON.parse(data).tel;
    var password=JSON.parse(data).pwd;
    //console.log('JSON:',JSON.parse(data));
    

    if(!username){
      //console.log('请输入用户名');
      res.end('-1');
    }else if(!password){
      res.end('-2');
    }else{
      console.log('执行了');
      console.log('user1:',username);
      db.query(`INSERT INTO user_table (username,password)
      VALUE('${username}','${password}')`,(err)=>{
        console.log('2:');
        if(err){
          console.error('1:',err);
          res.status(500).send('database error').end();
        }else{
          res.end('0');
          console.log('data:',username);
        }
      }); 
    }
  });
});

module.exports = router;

