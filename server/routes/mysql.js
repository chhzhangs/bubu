//mysql链接部分
var mysql = require("mysql");

var pool = mysql.createPool({
	connectionLimit: 10,
	host:'127.0.0.1',
	user:'root',
	password: '',
    database: 'hackthon',
    port: 3306,
    debug: false	//默认为true即sql操作出错时会中断服务器，设定为false则只会打印错误信息
});

module.exports.pool = pool;