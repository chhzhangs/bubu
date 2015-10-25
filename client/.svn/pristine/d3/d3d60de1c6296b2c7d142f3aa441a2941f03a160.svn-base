//首页frame部分
(function($){
	//界面的初始化（瀑布流式布局）
	$('.grid').masonry({
		itemSelector: '.grid-item',
		columnWidth: $('.grid').width()/2,
		isAnimated: true
	});

	//打开活动详情页
	$('.grid-item').click(function(){
		api.openWin({
			name: 'activity_detail',
			url: '../detail/activity_detail.html',
			bounces: true
		});
	});

	//下拉刷新（优先级低）
	
})(jQuery);