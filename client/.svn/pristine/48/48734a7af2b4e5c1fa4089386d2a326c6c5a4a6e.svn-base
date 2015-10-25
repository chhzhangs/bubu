//用户登录部分处理逻辑
(function($){
	//页面跳转部分 start-----------------------------------------------------
	//关闭当前窗口
	$('.back').click(function(){
		api.closeWin();
	});

	//进入注册界面
	$('.btn-register').click(function(){
		api.openWin({
			name: 'register',
			url: './user_register.html'
		});
	});
	//页面跳转部分 end-------------------------------------------------------

	//登录处理 start---------------------------------------------------------
	$(".btn-login").click(function(){
		var data = {
			user_id: $("#username").val(),
			password: $.md5($("#password").val())
		}

		//客户端表单验证部分（username为邮箱格式，password为6位以上）
		if(data.user_id == ''){
			alert('用户名不能为空！');
			$("#username").focus();
			return;
		}

		//数据提交以及交互处理
		$.post(localStorage.siteUrl+'/login', data, function(callback){
			//登录成功
			if(callback.status == '1'){
				//获取用户的信息
				$.post(localStorage.siteUrl+'/user/info', data, function(callback){
					//获取数据成功
					if(callback.status == '1'){
						//将数据存储
						localStorage.setItem('hasLogin', 1);
						localStorage.setItem('user_id', callback.user_id);
						localStorage.setItem('nickname', callback.nickname);
						localStorage.setItem('sex', callback.sex);
						localStorage.setItem('skill', callback.skill);
						localStorage.setItem('tags', callback.tags);

						//切换到用户管理界面
						api.openWin({
							name: 'user',
							url: '../../user.html',
							reload: true
						});
					}
					//获取数据失败
					else if(callback.status == '0'){
						alert('系统错误，请重新登录');
						return;
					}
				});
			}
			//登录失败
			else if(callback.status == '0'){
				//页面变换提示错误消息
				$(".login-message").html('用户名或密码错误');
				$(".login-message").addClass('login-message-fail');
				return;
			}
			return;
		});
	});

	$("input").focus(function(){
		$(".login-message").removeClass('login-message-fail');
	});

	//登录处理 end-----------------------------------------------------------


})(jQuery);