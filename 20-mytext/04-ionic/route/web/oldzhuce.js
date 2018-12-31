const express=require('express');
var router = express.Router();

const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});



router.post('/',(req,res)=>{
  req.on('data',(data)=>{
    var username=JSON.parse(data).tel;
    //console.log('JSON:',JSON.parse(data).tel);
    var password=JSON.parse(data).pwd;
    //console.log('JSON:',JSON.parse(data));
    

    if(!username)
    {
      //console.log('请输入用户名');
      res.end('-1');
    }
    else if(!password)
    {
      res.end('-2');
      //console.log('请输入密码');
    }
    else 
    {
      //console.log('执行了');
      //if((db.query('SELECT * FROM user_table WHERE username=?',[username])
      //console.log(db.query('SELECT * FROM user_table WHERE username=`wq`'));
      db.query('SELECT * FROM user_table WHERE username=?',[username],(err,result)=>{
        //console.log('re:',username);
        //console.log('ress',result[0]);
        if(err){
          console.log(err);
          res.status(500).send('database error').end();
        }else{
          //天知道我这个bug改的多久，因为当数据库没有我的username，强制退出，报错，！！！
          if(result[0]!=undefined){
             
            console.log('re:',result[0]);
            //就是它一直在报错，啊啊啊啊啊啊啊啊！1111！
        
            //console.log('user:',username);
            res.end('1');
            //console.log('用户名重复');
          }else{
            db.query(`INSERT INTO user_table (username,password)
            VALUE('${username}','${password}')`,(err)=>{
              //console.log('2:');
              if(err){
                //console.error('1:',err);
                res.status(500).send('database error').end();
              }else{
                res.end('0');
                //console.log('data:',username);
              }
            }); 
          }
        }     
    
      });
    }
  });
});

module.exports = router;

