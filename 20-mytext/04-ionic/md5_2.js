const common=require('./libs/common');

//var str=common.md5(common.md5(common.md5('123456')));

//暴力破解也做不到

var str='123456';
str=common.md5(str+'21423435yhfgdf43523098&079324h$@#*2413hlul');

console.log(str);
