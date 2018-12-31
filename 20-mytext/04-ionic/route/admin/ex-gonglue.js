const express=require('express');
//const common=require('../../libs/common.js');

var router = express.Router();

const mysql=require('mysql');
var db = mysql.createPool({host:'192.168.62.144',user:'root',password:'ddd',database:'ionic'});



//----------------------------------------------------------------------------------------------
//get

/*
router.get('/',(req,res)=>{
  res.render('admin/login.ejs',{});

});
*/


router.post('/',function(req,res){
  var chunk='';
  req.on('data',(data)=>{
    chunk=JSON.parse(data); 
    compare(chunk.tel,res);
    console.log('tel:',chunk.tel); 
  });
});

  
function compare(username,res){
  const sql='SELECT * FROM gonglue_table WHERE username=?';
  db.query(sql,[username],(err,result)=>{
    if(err){
      console.error('Error:',err);
      res.status(500).end('DB ERROR!');
    }else{
      

module.exports = router;

