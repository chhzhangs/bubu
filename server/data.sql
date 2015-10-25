#hackthon的sql文件
#建立的表为：
#   login						登陆信息表
#  	user					    user信息表
#	activity            		活动信息表

drop database if exists hackthon;
create database hackthon default character set utf8;
use hackthon;

#登陆信息表
create table login(
	id int not null auto_increment primary key,
	user_id char(32) not null unique,
	password char(32) not null,
	login_x char(32),
	login_y char(32),
	created_time bigint not null,
	updated_time bigint not null
);

#user信息表
create table user(
	id int not null auto_increment primary key,
	user_id char(32) not null unique,
	nickname char(32) not null,
	telephone char(32) not null,
	email char(32),
	qq char(32),
	sex char(10),
	city char(32),
	portrait char(100),
	user_star text,
	act_star text,
	tags char(100),
	skill char(32),
	created_time bigint not null,
	updated_time bigint not null,
	FOREIGN key (user_id) references login(user_id) on delete cascade on update cascade
);

#活动信息表
create table activity(
	id int not null auto_increment primary key,
	title char(50) not null,
	sub_title char(50),
	content char(50),
	img char(50),
	created_time bigint not null,
	updated_time bigint not null
);