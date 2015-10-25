var express = require('express');
var pool = require('../mysql').pool;
var mysql = require('mysql');
var EventProxy = require('eventproxy');

function check_phone(user_id,ep){
	pool.getConnection(function(err,conn){
		if (err) {throw err};

		var sql = 'SELECT * FROM ?? WHERE ?? = ?';
		var inserts = ['login','user_id',user_id,];
		sql = mysql.format(sql,inserts);
		conn.query(sql, function(err, rows, fields){
			if(err) throw err;
			if(rows){
				ep.emit('check_phone', {status:"1"});
			}else{
				ep.emit('check_phone', {status:"0"});
			}		
			conn.release();
		});
	});
}

function query(user_id,password,ep){
	pool.getConnection(function(err,conn){
		if (err) {throw err};

		var sql = 'SELECT * FROM ?? WHERE ?? = ? and ?? = ?';
		var inserts = ['login','user_id',user_id,'password',password];
		sql = mysql.format(sql,inserts);
		conn.query(sql, function(err, rows, fields){
			if(err) throw err;
			if(rows){
				ep.emit('query', {status:"1"});
			}else{
				ep.emit('query', {status:"0"});
			}		
			conn.release();
		});
	});
}

function insert(data,ep){
	pool.getConnection(function(err,conn){
		if (err) {throw err};
		var sql = 'INSERT INTO ?? SET ?';
		var inserts = ['login',data];
		console.log(data);
		console.log(sql);
		sql = mysql.format(sql,inserts);
		console.log(sql);
		conn.query(sql,function(err, rows, fields){
			if(err){
				ep.emit('insert',{status:"0"});
			}else{
				ep.emit('insert',{status:"1"});
			}	
			conn.release();
		});
	});	
}
module.exports.query = query;
module.exports.insert = insert;
module.exports.check_phone = check_phone;