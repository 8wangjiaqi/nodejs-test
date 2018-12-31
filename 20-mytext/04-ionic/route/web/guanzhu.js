const express=require('express');
var router = express.Router();

const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});


router.post('/',(req,res)=>{
  req.on('data',(data)=>{
    var username=JSON.parse(data).username;
    //var guanusername=JSON.parse(data).guanusername;
    
    //console.log(username);
 
    db.query('SELECT * FROM guanzhu_table WHERE username=?',[username],(err,data)=>{
      if(err){
        console.log(err);
        res.status(500).send('database error').end();
      }else{
        res.send(data);
        //console.log(data);
      }
    });
            
  });

});

router.post('/a',(req,res)=>{
  req.on('data',(data)=>{
    var username=JSON.parse(data).username;
    //var guanusername=JSON.parse(data).guanusername;
    
    db.query('SELECT signature FROM user_table WHERE username=?',[username],(err,data)=>{
      if(err){
        console.log(err);
        res.status(500).send('database error').end();
      }else{
        res.send(data);
        //console.log(data);
      }
    });
             
  });

});


router.post('/aa',(req,res)=>{
  req.on('data',(data)=>{
    var username=JSON.parse(data).username;
    //var guanusername=JSON.parse(data).guanusername;
    console.log('username',username);
    db.query('SELECT src FROM user_table WHERE username=?',[username],(err,data)=>{
      if(err){
        console.log(err);
        res.status(500).send('database error').end();
      }else{
        res.send(data);
        //console.log('username',data);
      }
    });
             
  });

});






router.post('/b',(req,res)=>{
  req.on('data',(data)=>{
    var ID=JSON.parse(data).ID;
    //var guanusername=JSON.parse(data).guanusername;
    console.log(ID); 
    db.query(`DELETE FROM guanzhu_table WHERE ID='${ID}'`,(err)=>{
      if(err){
        console.log(err);
        res.status(500).send('database error').end();
      }else{
        res.end('0');
        //console.log(data);
      }
    });
             
  });

});

/*
router.post('/c',(req,res)=>{
  req.on('data',(data)=>{
    var username=JSON.parse(data).username;
    var guanusername=JSON.parse(data).guanusername;
    console.log('这个时候执行'); 
    db.query('SElECT guanusername FROM guanzhu_table WHERE username=?',[username],(err,data)=>{
      //console.log('这里');
      if(err){
        console.log(err);
        res.status(500).send('database error').end();
      }else if(data[0]==undefined){
        console.log('guanusername',guanusername);
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
        //console.log('执行这里啊');
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
*/



router.post('/d',(req,res)=>{

  req.on('data',(data)=>{
    var username=JSON.parse(data).username;
    var guanusername=JSON.parse(data).guanusername;
    //console.log('username',username);
    //console.log('guanusername',guanusername);

    db.query('SElECT guanusername FROM guanzhu_table WHERE username=?',[username],(err,data)=>{
      if(err){
        console.log(err);
        res.status(500).send('database error');
      }else{
        //res.end('0');
        for(var i=0;i<data.length;i++){
          if(data[i].guanusername==guanusername){
         
            //0 已关注
            //console.log(data[i]);
        
            //console.log('guanusername',guanusername);
            //console.log('data[i]1:',data[i]);
            //res.write('0');
            res.end('0');
                       
          }else if(data[i].guanusername!=guanusername && guanusername !=username) {
            console.log('data[i]:',data[i].guanusername);
            //1 未关注
            //res.write('1');
            //res.end();
          }else{
            //2 自己
            res.end('2');
          }
        }
        res.end('1');
      }
    });
             
  });

});



router.post('/f',(req,res)=>{
  req.on('data',(data)=>{
    //var ID=JSON.parse(data).ID;
    var guanusername=JSON.parse(data).guanusername;
    var username=JSON.parse(data).username;
    
    db.query(`DELETE FROM guanzhu_table WHERE guanusername='${guanusername}' and username='${username}'`,[username,guanusername],(err)=>{
      if(err){
        console.log(err);
        res.status(500).sned('database error ').end();
      }else{
        res.end('0');
        //console.log(data);
      }
    });
  });
});



router.post('/g',(req,res)=>{
  req.on('data',(data)=>{
    var guanusername=JSON.parse(data).guanusername;
    var username=JSON.parse(data).username;
    
    db.query(`INSERT INTO guanzhu_table (username,guanusername,buttonValue,guansrc)
    VALUE('${username}','${guanusername}','已关注','header_1.jpg')`,(err)=>{
      if(err){
        console.log(err);
        res.status(500).send('database error').end();
      }else{
        //console.log(data);

      }
    });
  });
});





router.post('/h',(req,res)=>{
  req.on('data',(data)=>{
    var username=JSON.parse(data).username;
    //var guanusername=JSON.parse(data).guanusername;
    
    db.query('SELECT username  FROM guanzhu_table WHERE guanusername=?',[username],(err,data)=>{
      if(err){
        console.log(err);
        res.status(500).send('database error').end();
      }else{
        res.send(data);
        console.log('hde',data);
      }
    });
             
  });

});



router.post('/hh',(req,res)=>{
  req.on('data',(data)=>{
    var username=JSON.parse(data).username;
    //var guanusername=JSON.parse(data).guanusername;
    
    db.query('SELECT username  FROM guanzhu_table WHERE guanusername=?',[username],(err,data)=>{
      if(err){
        console.log(err);
        res.status(500).send('database error').end();
      }else{
      
        //console.log('aaaaaaaaaaaaa:',data);
        var arr=[];
        //let count=0;
        for(let i=0;i<data.length;i++){
          //console.log('1111111111111',data[i].username);
          db.query('SELECT *  FROM user_table WHERE username=? ',[data[i].username],(err,data1)=>{
            if(err){
              console.log(err);
              res.status(500).send('database error').end();
            }else{
              //console.log('data1[i]aaa',data1);
              //console.log('1:',i);
              //arr.push(data1);
              /*
              if(count!=data.length){
                console.log(count);
                console.log('data[i]aaaa:',data1);
                arr.push(data1);
                count++;
              }else{
                console.log(arr);
              }
              */
              arr[i]=data1;          

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

/*
router.post('/hhh',(req,res)=>{
  req.on('data',(data)=>{
    var username=JSON.parse(data).username;
    var guanusername=JSON.parse(data).guanusername;
    console.log('guanusername',guanusername);
    db.query('SElECT guanusername FROM guanzhu_table WHERE username=?',[username],(err,data)=>{
      if(err){
        console.log(err);
        res.status(500).send('database error');
      }else{
        //res.end('0');
        for(var i=0;i<data.length;i++){
          if(data[i].guanusername==guanusername.username){
 
            //0 已关注
            console.log('已关注',data[i].guanusername);
            console.log('已关注',guanusername.username);
 
            res.end('0');
                       
          }else{
            //1 未关注
            console.log('未关注guan',data[i].guanusername);
            console.log('未关注user',guanusername.username);

            //res.end('1');
          }
        }
    
      }


                 
      /*setTimeout(()=>{
          console.log('arr[i]',arr);
          res.send(arr);

        },500);

       
    });
             
  });

});
*/



router.post('/ff',(req,res)=>{
  req.on('data',(data)=>{
    var username=JSON.parse(data).username;
    //var guanusername=JSON.parse(data).guanusername;
    
    db.query('SELECT guanusername  FROM guanzhu_table WHERE username=?',[username],(err,data)=>{
      if(err){
        console.log(err);
        res.status(500).send('database error').end();
      }else{
      
        var arr=[];
        //let count=0;
        console.log(data);
        for(let i=0;i<data.length;i++){
          //console.log('1111111111111',data[i].username);
          db.query('SELECT *  FROM user_table WHERE username=? ',[data[i].guanusername],(err,data1)=>{
            if(err){
              console.log(err);
              res.status(500).send('database error').end();
            }else{
              arr[i]=data1;  
              console.log('data1',data1);
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

router.post('/i',(req,res)=>{
  req.on('data',(data)=>{
    var username=JSON.parse(data).username;
    //var guanusername=JSON.parse(data).guanusername;
    
    db.query('SELECT guanusername  FROM guanzhu_table WHERE username=?',[username],(err,data)=>{
      if(err){
        console.log(err);
        res.status(500).send('database error').end();
      }else{
      
        var arr=[];
        //let count=0;
        console.log(data);
        for(let i=0;i<data.length;i++){
          //console.log('1111111111111',data[i].username);
          db.query('SELECT *  FROM my_gongluo_table WHERE username=? ',[data[i].guanusername],(err,data1)=>{
            if(err){
              console.log(err);
              res.status(500).send('database error').end();
            }else{
              arr[i]=data1;  
              console.log('data1',data1);
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

