//用户注册部分处理逻辑
(function($){
	//页面跳转部分 start-----------------------------------------------------
	//关闭当前窗口
	$('.back').click(function(){
		api.closeWin();
	});

	//点击注册按钮后注册
	$('#register').click(function(){
		var data = {
			user_id: $("#username").val(),
			password: $.md5($("#password").val())
		}

		if(data.user_id == ''){
			alert('用户名不能为空！');
			$("#username").focus();
			return;
		}

		$.post(localStorage.siteUrl+'/login/register', data, function(callback){
			if(callback.status == "1"){
				alert('激活邮件已经发送到您的邮箱，请登录邮箱进行激活');
				api.openWin({
					name: 'user_login',
					url: './user_login.html'
				});
			}
			else if(callback.status == "0"){
				api.openWin({
					name: 'user_register',
					url: './user_register.html',
					reload: true
				});
			}
			return;
		}, 'json');
	});

})(jQuery);