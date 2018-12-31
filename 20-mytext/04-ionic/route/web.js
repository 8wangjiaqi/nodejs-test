const express=require('express');
var router = express.Router();

router.get('/',function(req,res){
  res.send('我是web').end();

});

/*router.get('/b.html',function(req,res){
    res.send('你好 世界').end();

});
*/

module.exports = router;

