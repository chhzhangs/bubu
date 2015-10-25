var express = require('express');
var router = express.Router();
var pool = require("./mysql").pool;
var mysql = require("mysql");
var query = require("./dao/login_dao").query;
var insert = require("./dao/login_dao").insert;
var insert_user = require("./dao/user_dao").insert;
var check_phone = require("./dao/login_dao").check_phone;
var EventProxy = require('eventproxy');
var crypto = require('crypto');

var alg = 'des-cbc';
var key = '01234567';
var iv = '12345678';

function encrypt(data){
	var cipher = crypto.createCipheriv(alg, key,iv);
    cipher.setAutoPadding(true)  //default true  
    var ciph = cipher.update(data, 'utf8', 'hex');  
    ciph += cipher.final('hex');  
    return ciph;
}

function decrypt(data){
	var decipher = crypto.createDecipheriv(alg, key, iv);  
    decipher.setAutoPadding(true);
    var txt = decipher.update(data, 'hex', 'utf8');  
    txt += decipher.final('utf8');
    return txt;

}

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
     service: 'qq', // <- resolved as 'Postmark' from the wellknown info
     auth: {
        user: '1752884841@qq.com',
        pass: '20140803xl.'
    }
});

function sendMail(email,ep) {
	console.log(email);
    var d = encrypt(email);
    console.log(d);
	var url = 'http://127.0.0.1:3000/user/validate?email='+d;
	console.log(url);
	transporter.sendMail({
	    from: '1752884841@qq.com',
	    to: email,
	    subject: 'hello',
	    text: '请点击以下链接完成注册 '+ url
	},function(err,ret){
		console.log(err);
		if(err){
			console.log("fail");
			ep.emit('sendMail',{status:"0"});
		}else{
			console.log("success");
			ep.emit('sendMail',{status:"1"});
		}
	});
}

//1:登陆成功 0:登陆失败
router.post('/', function(req, res, next) {
	var ep = new EventProxy();
	ep.all("query",function(query){
	console.log(query);
	res.json(query);
	});
	query(req.body.user_id,req.body.password,ep);
});

//2:注册成功 0:注册失败
router.post('/register', function(req, res, next) {
	var ep = new EventProxy();
	var timestamp=parseInt(new Date().getTime());
	ep.all("insert",function(insert){
		ep.all("insert_user",function(insert_user){
			console.log(insert_user);
			ep.all("sendMail",function(sendMail){
				res.json(sendMail);
			});
			sendMail(req.body.user_id,ep);
		});
		var insert_user_data = {};
		insert_user_data.user_id = req.body.user_id;
		insert_user_data.user_star = "";
		insert_user_data.act_star = "";
		insert_user_data.created_time = timestamp;
		insert_user_data.updated_time = timestamp;
		insert_user(insert_user_data,ep);
	});
	var data = {
		user_id:req.body.user_id,
		password:req.body.password,
		login_x:'',
		login_y:'',
		created_time:timestamp,
		updated_time:timestamp
	}
	insert(data,ep);
});

//3:检测手机是否已经被注册
router.post('/check', function(req, res, next) {
	var ep = new EventProxy();
	ep.all("check_phone",function(check_phone){
	console.log(check_phone);
	res.json(check_phone);
	});
	check_phone(req.body.user_id,ep);
});

module.exports = router;