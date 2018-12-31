const express=require('express');
var router = express.Router();

const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});



//----------------------------------------------------------------------------------------------
//get

router.get('/',(req,res)=>{
  switch(req.query.act){
    case  'mod':
      db.query(`SELECT * FROM my_gongluo_table WHERE id='${req.query.id}'`,
        (err,data)=>{
          if(err){
            console.error('1:',err);
            res.status(500).send('database error').end();
                                                        
          }else if(data.length==0){
            res.status(404).send('data not found').end();
          }else{
            db.query('SELECT *FROM my_gongluo_table',(err,banners)=>{
              if(err){
                console.error(err);
                res.status(500).send('database error').end();                                            
              }else{
                res.render('admin/banners.ejs',{banners,mod_data:data[0]});
              }
                                    
            });
                                
          }
                            
        });
      break;

    case  'del':
      db.query(`DELETE FROM my_gongluo_table WHERE ID='${req.query.id}'`,
        (err)=>{
          if(err){
            console.error(err);
            res.status(500).send('database error').end();
          }else{
            res.redirect('/admin/banners');
          }
        });
      break;

    default:
      db.query('SELECT *FROM my_gongluo_table',(err,banners)=>{
        if(err){
          console.error('2:',err);
          res.status(500).send('database error').end();
        }else{
          res.render('admin/banners.ejs',{banners});
        }
      });

      break;
                            
  }
});



//-------------------------------------------------------------------------------------------------------
//post

router.post('/',(req,res)=>{
  var username=req.body.username;
  var title=req.body.title;
  var description=req.body.description;
  var article=req.body.article;

  if(!username || !title || !description || !article){
    res.status(400).send('arg error').end();
  }else{
    if(req.body.mod_id){
      db.query(`UPDATE my_gongluo_table SET \
        username='${req.body.username}', \
        title='${req.body.title}', \
        description='${req.body.description}',\
        article='${req.body.article}'\
        WHERE ID=${req.body.mod_id}`,
      (err)=>{
        if(err){
          console.error('3:',err);
          res.status(500).send('database error').end();
        }else{
          res.redirect('/admin/banners');
        }
      } 
      );
    }else{
      db.query(`INSERT INTO my_gongluo_table (username,title,description,article)
      VALUE('${username}','${title}','${description}','${article}')`,(err)=>{
        if(err){
          console.error(err);
          res.status(500).send('database error').end();
        }else{
          res.redirect('/admin/banners');
        }
      });
    }
  }

});






module.exports = router;

