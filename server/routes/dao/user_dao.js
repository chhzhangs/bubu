var express = require('express');
var pool = require('../mysql').pool;
var mysql = require('mysql');
var EventProxy = require('eventproxy');

//查询某条记录
function query(user_id,ep){
	pool.getConnection(function(err,conn){
		if (err) {throw err};

		var sql = 'SELECT * FROM ?? WHERE ?? = ?';
		var inserts = ['user','user_id',user_id];
		sql = mysql.format(sql,inserts);
		console.log(sql);
		conn.query(sql, function(err, rows, fields){
			var data = {};
			if(err) {
				data.status = "0";
			}else{
				if(rows.length == 0){
					console.log(rows.length);
					data.status = "0";
				}else{
					data = rows[0];
					data.status = "1";
				}
			}
			ep.emit('query',data);
			conn.release();
		});
	});
}

function query_ids(user_ids,ep){
	pool.getConnection(function(err,conn){
		if (err) {throw err};

		var sql = 'SELECT * FROM ?? WHERE ?? = ?';
		var inserts = ['user','user_id',user_ids[0]];
		for(var i = 1;i<user_ids.length;i++){
			sql += "|| ?? = ?";
			inserts[1+i*2] = 'user_id';
			inserts[2+i*2] = user_ids[i];
		}

		sql = mysql.format(sql,inserts);
		console.log(sql);
		conn.query(sql, function(err, rows, fields){
			if(err) {
				throw err;
			}else{
				ep.emit('query_ids',rows);
			}
			conn.release();
		});
	});
}

function query_stars(user_id,star_type,ep){
	pool.getConnection(function(err,conn){
		if (err) {throw err};

		var sql = 'SELECT ?? FROM ?? WHERE ?? = ?';
		var inserts = [star_type,'user','user_id',user_id];
		sql = mysql.format(sql,inserts);
		conn.query(sql, function(err, rows, fields){
			var data = {};
			if(err) {
				data.status = "0";
			}else{
				if(rows.length == 0){
					console.log(rows.length);
					data.status = "0";
				}else{
					data = rows[0];
					data.status = "1";
				}
			}
			ep.emit('query_stars',data);
			conn.release();
		});
	});
}

//插入整条记录
function insert(data,ep){
	pool.getConnection(function(err,conn){
		if (err) {throw err};
		var sql = 'INSERT INTO ?? SET ?';
		var inserts = ['user',data];
		sql = mysql.format(sql,inserts);
		conn.query(sql,function(err, rows, fields){
			if(err){
				ep.emit('insert_user',{status:"0"});
			}else{
				ep.emit('insert_user',{status:"1"});
			}	
			conn.release();
		});
	});	
}

//更新整条记录
function replace(data,user_id,ep){
	pool.getConnection(function(err,conn){
		if (err) {throw err};

		var sql = 'UPDATE ?? SET ? WHERE ?? = ?';
		console.log(sql);
		var inserts = ['user',data,'user_id',user_id];
		sql = mysql.format(sql,inserts);
		console.log(sql);
		conn.query(sql,function(err, rows, fields){
			if(err){
				ep.emit('replace',{status:"0"});
			}else{
				ep.emit('replace',{status:"1"});
			}	
			conn.release();
		});
	});	
}



//更新某一字段
function update(user_id,field,value,ep){
	pool.getConnection(function(err,conn){
		if (err) {throw err};
		var sql = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
		var inserts = ['user',field,value,'user_id',user_id];
		sql = mysql.format(sql,inserts);
		console.log(sql);
		conn.query(sql,function(err, rows, fields){
			if(err){
				ep.emit('update',{status:"0"});
			}else{
				ep.emit('update',{status:"1"});
			}
			conn.release();
		});
	});
 }

module.exports.query = query;
module.exports.insert = insert;
module.exports.update = update;
module.exports.replace = replace;
module.exports.query_stars = query_stars;
module.exports.query_ids = query_ids;