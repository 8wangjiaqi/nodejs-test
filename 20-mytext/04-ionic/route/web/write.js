const express=require('express');
var router = express.Router();

const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});



router.post('/',(req,res)=>{
  req.on('data',(data)=>{
    
    var username=JSON.parse(data).username;
    var money=JSON.parse(data).money;
    //console.log('JSON:',JSON.parse(data).style);
    var shijian=JSON.parse(data).shijian;
    var style=JSON.parse(data).style;
    var other=JSON.parse(data).other;

    //console.log('JSON:',JSON.parse(data));
    

    if(!money)
    {
      console.log('请输入花销');
      res.end('-1');
    }
    else if(!style)
    {
      res.end('-2');
      console.log('请输入付款方式');
    }
    else 
    {
      db.query(`INSERT INTO account_table (username,money,shijian,style,other)
      VALUE('${username}','${money}','${shijian}','${style}','${other}')`,(err,data)=>{
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

