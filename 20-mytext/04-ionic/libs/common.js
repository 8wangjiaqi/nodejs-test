const crypto=require('crypto');

module.exports={
  MD5_SUFFIX:'21423435yhfgdf43523098&079324h$@#*2413hlul',
  md5:function (str){
    var obj=crypto.createHash('md5');

    obj.update(str);
    return obj.digest('hex');
  }
};
