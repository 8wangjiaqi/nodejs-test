const db=require('./database.js');

//db就是pool连接池

var TodoList=function(){};

//查询
TodoList.prototype.getAll=function(cb){
  const sql='SELECT * FROM todo';
  var items=[];
  db.query(sql,function(err,result){
    if(err){
      cb(true);
      //console.error(err);
      return;
    }
    result.forEach((e)=>{items.push(e.item);});
    cb(false,items);
  });
  //return items;
  //不能直接返回，是异步的，查询结果还没有出来，已经返回了
};

//插入
TodoList.prototype.addItem=function(item,cb){
   const sql = 'INSERT INTO todo(item) VALUES(?)';
    
   db.query(sql, [item], function(err, result) {
     if (err) {
             cb(true);
             return;
                       
     }
         cb(false, result);
           
   });

};

module.exports=TodoList;
