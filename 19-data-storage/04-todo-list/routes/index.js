const TodoList=require('../models/todo.js');
var express = require('express');
var router = express.Router();

//var items=[];
var todo =new TodoList();

/* GET home page. */
router.get('/', function(req, res, next) {
  todo.getAll(function(err,items){
    if(err){
      res.status(500).send('DB error!');
      return;
    }
  res.render('index', { items:items });
});
});


router.post('/',function(req,res,next){
  //if(req.body.item !=='') items.push(req.body.item);
  todo.addItem(req.body.item,function(err){
    if(err){
      res.status(500).send('DB err');
      return;
  }
    todo.getAll(function(err,items){
      if(err){
        res.status(500).send('DB error');
        return;
      }
      res.render('index',{items:items})
  });
});
});

module.exports = router;
