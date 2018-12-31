const express=require('express');
var router = express.Router();

const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});






router.post('/',(req,res)=>{
  req.on('data',(data)=>{
    var username=JSON.parse(data).username;
    var guanusername=JSON.parse(data).guanusername;
    
    db.query('SElECT guanusername FROM guanzhu_table WHERE username=?',[username],(err,data)=>{
      //console.log('这里');
      if(err){
        console.log(err);
        res.status(500).send('database error').end();
      }else if(data[0]==undefined){
        //console.log(i);
        console.log('sha',data[0]);
        if(guanusername==username){
          //自己
          console.log('自己');
          db.query('UPDATE my_gongluo_table SET num=1  WHERE username=?',[guanusername],(err)=>{
            if(err){
              console.log(err);
              res.status(500).send('database').end();
            }
          });
        }else{
          db.query('UPDATE my_gongluo_table SET num="+关注"  WHERE username=?',[guanusername],(err)=>{
            if(err){
              console.log(err);
              res.status(500).send('database error').end();
            }
          }); 

        }
      }else{
        for(var i=0;i<data.length;i++){
          //console.log('guanzhu',guanusername);
          //console.log('daus',data[i].guanusername);

          if(guanusername!=data[i].guanusername){
            if(guanusername==username){
              //自己
              //console.log('自己');
              //console.log('guan1:',guanusername);
              //console.log('data1:',data[i].guanusername);
              db.query('UPDATE my_gongluo_table SET num=1  WHERE username=?',[guanusername],(err)=>{
                if(err){
                  console.log(err);
                  res.status(500).send('database error').end();
                }else{
                  //console.log(data);
                }
              });  
            }else if(guanusername!=data[i].guanusername && guanusername!=username){
              //未关注
              //console.log('未关注');
              //console.log('guan2:',guanusername);
              //console.log('data2:',data[i].guanusername);
              db.query('UPDATE my_gongluo_table SET num="+关注"  WHERE username=?',[guanusername],(err)=>{
                if(err){
                  console.log(err);
                  res.status(500).send('database error').end();
                }
              }); 
            }
          }else{
            //已关注
            //console.log('已关注');
            //console.log('guan3:',guanusername);
            //console.log('data3:',data[i].guanusername);
            i=data.length+5;
            //console.log(i);
            db.query('UPDATE my_gongluo_table SET num="已关注"  WHERE username=?',[guanusername],(err)=>{
              //i=data.length+5;
              //console.log(i);
              if(err){
                console.log(err);
                res.status(500).send('database error').end();
              }              
            });  
          }
        }          
      }      
    });
  });

});

module.exports = router;

