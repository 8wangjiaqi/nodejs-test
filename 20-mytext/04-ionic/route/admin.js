const express=require('express');
const common=require('../libs/common.js');

const mysql=require('mysql');
//const db=mysql.createPool();

var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});

//const con=mysql.createConnection({host:'192.168.62.144',user:'root',port:'3306', password:'ddd',
//  database:'ionic'});

var router=express.Router();


//---------------------------------------------------------------------------------------------------

//检查登录状态
router.use((req,res,next)=>{
  //不管访问谁，都要先去登录
  //console.log(req.url);
  if(!req.session['admin_id'] && req.url!='/login'){//没有登录
    //在router内部，所以/admin已经被去掉 
    //重定向，去登陆
    res.redirect('/admin/login');
  }else{
    next();
  }
});

//---------------------------------------------------------------------------------------------------

router.get('/login',(req,res)=>{
  res.render('admin/login.ejs',{});
});

router.post('/login',function(req,res){
  //res.send('我是admin').end();
  
  var username=req.body.username;
  var password=common.md5(req.body.password+common.MD5_SUFFIX);

  db.query(`SELECT *FROM admin_table WHERE username='${username}'`,
    (err,data)=>{
      if(err){
        console.error(err);
        res.status(500).send('database error').end();
      }else{
        if(data.length==0){
          res.status(400).send('no this admin').end();
        }else{
          if(data[0].password==password){
            //成功
            
            req.session['admin_id']=data[0].ID;
            res.redirect('/admin/');
          }else{
            res.status(404).send('this password is incorrect').end();
          }
        }
      }
    });
  //console.log(req.body);
  //res.render('admin/login',{});
});


router.get('/',(req,res)=>{
  res.render('admin/index.ejs',{});
  //res.send('welcome ').end();

});



//-----------------------------------------------------------------------------------------------
//增加东西用的

router.get('/banners',(req,res)=>{
  switch(req.query.act){
    case  'mod':
      db.query(`SELECT * FROM banner_table WHERE id='${req.query.id}'`,
      (err,data)=>{
          if(err){
            console.error(err);
            res.status(500).send('database error').end();
          }else if(data.length==0){
            res.status(404).send('data not found').end();
          }else{
            db.query('SELECT *FROM banner_table',(err,banners)=>{
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
      
      db.query(`DELETE FROM banner_table WHERE ID='${req.query.id}'`,
        (err,data)=>{

        
          if(err){
            console.error(err);
            res.status(500).send('database error').end();
          }else{
            res.redirect('/admin/banners');
          }
        });
      break;

    default:
      db.query('SELECT *FROM banner_table',(err,banners)=>{
        if(err){
          console.error(err);
          res.status(500).send('database error').end();
        }else{
          res.render('admin/banners.ejs',{banners});
        }
      });

      break;
  }

  
});



router.post('/banners',(req,res)=>{
  var title=req.body.title;
  var description=req.body.description;
  var href=req.body.href;

  if(!title || !description || !href){
    res.status(400).send('arg error').end();
  }else{
    if(req.body.mod_id){ 
      
      db.query(`UPDATE banner_table SET \
        title='${req.body.title}', \
        description='${req.body.description}',\
        href='${req.body.href}'\
        WHERE ID=${req.body.mod_id}`,
        (err,data)=>{
          if(err){
            console.error(err);
            res.status(500).send('database error').end();
          }else{
            res.redirect('/admin/banners');
          }
        } 
      );
    }else{    
      
      db.query(`INSERT INTO banner_table (title,description,href)
      VALUE('${title}','${description}','${href}')`,(err,data)=>{
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

