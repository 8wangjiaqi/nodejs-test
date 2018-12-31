var mysql=require('mysql');
var cfg=require('./config.json');

var pool=mysql.createPool(cfg);

module.exports=pool;
//在连接池上直接query操作，在连接上查询之前需要打开，之后需要关闭
//连接池自己会回收，不需要关闭
