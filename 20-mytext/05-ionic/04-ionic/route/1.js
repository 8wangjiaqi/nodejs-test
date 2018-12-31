const express=require('express');

var router=express.Router();
      
router.get('/1.html',function(req,res){
  console.log(1111)
  res.render('web/1',{title:'握手标题'});
            
});
router.get('/2.html',function(req,res){
  res.send('hello world').end();
            
});



module.exports = router;

