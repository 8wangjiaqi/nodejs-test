const express=require('express');
var router = express.Router();

const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});



router.get('/',(req,res)=>{
/* req.on('data',(data)=>{
    
    var username=JSON.parse(data).username;
    var title=JSON.parse(data).title;
    //console.log('JSON:',JSON.parse(data).style);
    var description=JSON.parse(data).description;
    var article=JSON.parse(data).article;
    

    if(! && !description && !article)
    {
      console.log('请添加完整的内容');
      res.end('-1');
    }
    else 
    {
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
  });*/


  db.query('SELECT * FROM suggestion_table',(err,banners)=>{
    if(err){
      console.log(err);
      res.status(500).send('database error').end();
    }else{
      console.log(banners);
      res.render('admin/suggestion.ejs',{banners});

    }
  });
});

module.exports = router;

