var express = require('express');
var pool = require('../mysql').pool;
var mysql = require('mysql');
var EventProxy = require('eventproxy');

function query(user_id,ep){
	pool.getConnection(function(err,conn){
		if (err) {throw err};

		var sql = 'SELECT * FROM ?? WHERE ?? = ?';
		var inserts = ['user','user_id',user_id];
		sql = mysql.format(sql,inserts);
		conn.query(sql, function(err, rows, fields){
			if(err) throw err;
			ep.emit('query', rows);	
			conn.release();
		});
	});
}