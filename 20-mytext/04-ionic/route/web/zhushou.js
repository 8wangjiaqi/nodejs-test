const express=require('express');
var router = express.Router();

const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});


router.post('/',(req,res)=>{
  req.on('data',(data)=>{
    var ID=JSON.parse(data).ID;
    var money=JSON.parse(data).money;
    var shijian=JSON.parse(data).time;
    var style=JSON.parse(data).style;
    var other=JSON.parse(data).other;
    //console.log('1',JSON.parse(data));
    //console.log('o',ousername);
    
    if(!money){
      console.log('请输入花销');
      res.end('-1');
    }else if(!style){
      res.end('-2');
      console.log('请输入付款方式');               
    }else {
      db.query(`UPDATE account_table SET money='${money}',shijian='${shijian}',style='${style}',other='${other}'
      WHERE ID="${ID}"`,(err)=>{
        if(err){
          console.log(err);
          res.status(500).send('database error').end();
        }else{
          //console.log('uda',data);
          res.end('0');
        }
      });
    }           
  });

});

router.post('/del',(req,res)=>{
  req.on('data',(data)=>{
    var ID=JSON.parse(data).ID;
    
    db.query(` DELETE FROM account_table WHERE ID='${ID}'`,(err)=>{
      if(err){
        console.log(err);
        res.status(500).send('database error').end();
      }else{
        //console.log('uda',data);
        res.end('0');
      }
    });
  });

});


module.exports = router;

