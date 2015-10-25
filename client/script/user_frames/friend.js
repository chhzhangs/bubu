//关注的人列表界面脚本逻辑
(function($){
	//过长文本的省略号的处理
	$(".activity-content p").dotdotdot();

	//用户详情界面
	$(".activity-item").click(function(){
		api.openWin({
			name: 'user_datail',
			url: '../detail/user_detail.html'
		});
	});

})(jQuery);