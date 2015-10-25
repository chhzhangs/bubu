var express = require('express');
var router = express.Router();
var pool = require("./mysql").pool;
var mysql = require("mysql");
var query = require("./dao/user_dao").query;
var insert = require("./dao/user_dao").insert;
var update = require("./dao/user_dao").update;
var replace = require("./dao/user_dao").replace;
var query_stars = require("./dao/user_dao").query_stars;
var query_ids = require("./dao/user_dao").query_ids;
var crypto = require('crypto');
var EventProxy = require('eventproxy');


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


//个人信息查询
router.post('/info', function(req, res, next) {
	var ep = new EventProxy();
	ep.all("query",function(query){
		console.log(query);
		res.json(query);
	});
	query(req.body.user_id,ep);
});

//更新个人所以信息
router.post('/replace', function(req, res, next) {
	console.log('start');
	var ep = new EventProxy();
	ep.all("replace",function(replace){
	console.log(replace);
	res.json(replace);
	});
	replace(req.body,req.body.user_id,ep);
});

//更新个人单一属性信息
router.post('/update', function(req, res, next) {
	console.log('start');
	var ep = new EventProxy();
	ep.all("update",function(update){
	console.log(update);
	res.json(update);
	});
	update(req.body.user_id,req.body.prop_name,req.body[req.body.prop_name],ep);
});

//查询user_star用户信息
router.post('/user_stars', function(req, res, next) {
	var ep = new EventProxy();
	ep.all("query_stars",function(query_stars){
		var user_stars = query_stars.user_star.split(","); 
		console.log(user_stars);
		ep.all("query_ids",function(query_ids){
			console.log(query_ids);
			res.json(query_ids);
		});
		query_ids(user_stars,ep);
	});
	query_stars(req.body.user_id,'user_star',ep);
});

//更新user_star关注信息
router.post('/update_user_star', function(req, res, next) {
	var ep = new EventProxy();
	ep.all("update",function(update){
	console.log(update);
	res.json(update);
	});
	update(req.body.user_id,'user_star',req.body.user_star,ep);
});

//更新act_star关注信息
router.post('/update_act_star', function(req, res, next) {
	var ep = new EventProxy();
	ep.all("update",function(update){
	console.log(update);
	res.json(update);
	});
	update(req.body.user_id,'act_star',req.body.act_star,ep);
});


var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
     service: 'qq', // <- resolved as 'Postmark' from the wellknown info
     auth: {
        user: '1752884841@qq.com',
        pass: '20140803xl.'
    }
});

router.post('/sendMail', function(req, res, next) {
	console.log(req.body.email);
	var email = req.body.email;
	console.log(email);
    var d = encrypt(email);
    console.log(d);
	var url = 'http://127.0.0.1:3000/user/validate?email='+d;
	console.log(url);
	transporter.sendMail({
	    from: '1752884841@qq.com',
	    to: email,
	    subject: '激活账号',
	    text: '请点击以下链接完成注册 '+ url
	},function(err,ret){
		if(err){
			res.json({status:"0"});
		}else{
			console.log("success");
			res.json({status:"1"});
		}
	});
});

router.get('/validate',function(req,res,next){
	var email = decrypt(req.query.email);
	console.log(email);
	res.json("激活成功！");
});

module.exports = router;






