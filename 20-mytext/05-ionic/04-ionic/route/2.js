const express=require('express');
var router = express.Router();

router.get('/a.html',function(req,res){
  res.send('你好').end();
});

router.get('/b.html',function(req,res){
  res.send('你好 世界').end();
});


module.exports = router;
