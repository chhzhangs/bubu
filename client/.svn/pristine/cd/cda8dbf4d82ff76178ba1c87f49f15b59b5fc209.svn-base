//个人信息管理界面
(function($){
	//判断是否登录---------------------------------------------------------------------------
	function hasLogin(){
		if(localStorage.getItem('hasLogin') == 1){
			$("#nickname userinfo-value").html(localStorage.nickname ? localStorage.nickname : '--');
			$("#sex userinfo-value").html(localStorage.sex ? localStorage.sex : '--');
			$("#skill userinfo-value").html(localStorage.skill ? localStorage.skill : '--');
			$("#tags userinfo-value").html(localStorage.tags ? localStorage.tags : '--');
		}
		return;
	}
	hasLogin();

	$(".userinfo-item").click(function(){
		if(localStorage.getItem('hasLogin') != 1){
			alert('请登录后操作');
			return;
		}

		var item_id = $(this).attr('id');

		api.openWin({
			name: item_id,
			url: '../user_info_change/'+ item_id +'.html'
		});
		
		return;
	});

})(jQuery);