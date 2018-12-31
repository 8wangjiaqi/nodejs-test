const express=require('express');
//const common=require('../../libs/common.js');

var router = express.Router();

const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});


router.post('/',(req,res)=>{
  //req.on('data',(data)=>{
  //var username=JSON.parse(data).username;
  db.query('SELECT * FROM my_gongluo_table',(err,data1)=>{
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

router.post('/a',(req,res)=>{
  req.on('data',(data)=>{
    var username=JSON.parse(data).username;
    db.query('SELECT src FROM user_table WHERE username=?',[username],(err,data)=>{
      if(err){
        console.log(err);
        res.status(500).send('database error').end();
      }else{
        res.send(data);
      }
    });
  });
});





router.post('/src',(req,res)=>{
  req.on('data',(data)=>{
    //var username=JSON.parse(data).username;
    //var guanusername=JSON.parse(data).guanusername;
           
    db.query('SELECT username  FROM my_gongluo_table ',(err,data)=>{
      if(err){
        console.log(err);
        res.status(500).send('database error').end();
      }else{
        //console.log('home',data);
        var arr=[];
        for(let i=0;i<data.length;i++){
          
          db.query('SELECT *  FROM user_table WHERE username=? ',[data[i].username],(err,data2)=>{
            if(err){
              console.log(err);
              res.status(500).send('database error').end();
            }else{
              arr[i]=data2;  
              //res.send(data2);
              console.log('data2',data2);
            }
          });
        }

        setTimeout(()=>{
          //console.log('arr[i]',arr);
          res.send(arr);
        },500);
      }
    });
  });
});


module.exports = router;

