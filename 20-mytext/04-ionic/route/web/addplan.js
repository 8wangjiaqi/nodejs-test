const express=require('express');
var router = express.Router();

const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});



router.post('/',(req,res)=>{
  req.on('data',(data)=>{
    
    var username=JSON.parse(data).username;
    var days=JSON.parse(data).days;
    //console.log('JSON:',JSON.parse(data).days);
    var morning=JSON.parse(data).morning;
    var afternoon=JSON.parse(data).afternoon;
    var evening=JSON.parse(data).evening;

    //console.log('JSON:',JSON.parse(data));
    

    if(!days && !morning && !afternoon && !evening)
    {
      console.log('请输入数据');
      res.end('-1');
    }else{
      db.query(`INSERT INTO dayplan_table (username,days,morning,afternoon,evening)
      VALUE('${username}','${days}','${morning}','${afternoon}','${evening}')`,(err,data)=>{
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

