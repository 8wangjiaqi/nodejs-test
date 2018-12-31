const express=require('express');
//var router = express.Router();

//function (){
var router=express.Router();
      
router.get('/1.html',function(req,res){
  //res.send('hello').end();
  res.render('web/1',{title:'我是标题',a:12,b:5}); 
  //console.log(111);
});
router.get('/2.html',function(req,res){
  res.send('hello world').end();
            
});

//return router;

//};

module.exports = router;

