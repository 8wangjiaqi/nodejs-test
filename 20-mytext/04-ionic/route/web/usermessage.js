const express=require('express');
var router = express.Router();

const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});


router.post('/a',(req,res)=>{
  req.on('data',(data)=>{
    var username=JSON.parse(data).username;
    var signature=JSON.parse(data).signature;
    //var ousername=JSON.parse(data).ousername;
    //console.log('o',ousername);
    
    db.query('SELECT ID FROM user_table WHERE username=?',[username],(err,data)=>{
      if(err){
        console.log(err);
        res.status(500).send('database error').end();
      }else{
        if(!signature){
          db.query(`UPDATE user_table SET  signature='${''}'
          WHERE ID="${data[0].ID}"`,(err,data1)=>{
            if(err){
              console.log(err);
              res.status(500).send('database error').end();
            }else{
              console.log(data1);
              res.end('0');
            }
          });

        }else{
          db.query(`UPDATE user_table SET  signature='${signature}'
          WHERE ID="${data[0].ID}"`,(err,data1)=>{
            if(err){
              console.log(err);
              res.status(500).send('database error').end();
            }else{
              console.log(data1);
              res.end('0');
            }
          });
        }
      }
    });
            
  });

});



module.exports = router;

