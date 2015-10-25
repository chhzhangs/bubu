//搜索附近的合伙人
(function($){
	var mode = "map";
	var global_users = [];
	var user_lon = 0.1;
	var user_lat = 0.1;

	$(".mode-item").click(function(){
		if($(this).attr("mode") == $(".mode-item.active").attr("mode")) return;
		$(".mode-item").removeClass('active');
		$(this).addClass('active');

		mode = $(this).attr('mode');

		fillArea(global_users);
	});

	apiready = function(){
		var bMap = api.require('bMap');
		
		$(".category-item").click(function(){
			if(localStorage.hasLogin != 1){
				alert("请登录后操作！");
				return;
			}

			//样式变换之skill选取
			if($(this).attr("skill") == $(".category-item.active").attr("skill")) return;
			$(".category-item").removeClass('active');
			$(this).addClass('active');

			var skill = $(this).attr('skill');

			//位置查询
			bMap.getLocation({
				accuracy : '100m',
				autoStop : true,
				filter : 1
			}, function(ret, err) {
				var data = {
					skill: skill,
					lat : ret.lat,
					lon : ret.lon,
				}

				user_lat = data.lat;
				user_lon = data.lon;

				//获取用户信息
				$.post(localStorage.siteUrl+'/bmap/getlist', data, fillArea, 'json');
			});
		});
	}//apiready end

	//填充目标区域（依据选择，按地图模式或列表模式填充）
	function fillArea(users){
		if(user_lat == 0.1 && user_lon == 0.1) return;
		global_users = users;
		if(mode == 'map') fillAreaMap(users);
		else if(mode == 'list') fillAreaList(users);
	}

	//采用地图的方式填充
	function fillAreaMap(users){
		//删除已有元素，从而初始化地图
		var map_ele = $('<div id="map-content"></div>').css('height', '400px');
		$("#map-content").remove();
		$(".mode-list").after(map_ele);

		//地图初始化
		var map = new BMap.Map("map-content");			//地图绘制所在元素
		map.centerAndZoom(new BMap.Point(user_lon,user_lat), 13)	//地图中心以及地图范围
		map.addControl(new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_ZOOM})); 	//地图控制器

		//利用获取的users创建标注
		for(var i=0; i<users.length; i++){
			var marker = new BMap.Marker(new BMap.Point(users[i].lon, users[i].lat));		//创建标注
			map.addOverlay(marker);			//将标注添加到地图中

			var str = 	"<div class='contacts flex-wrap' uid='"+ users[i].user_id +"'>"+
							"<div class='contacts-img'>"+
								"<img src='' alt=''>"+
							"</div>"+
							"<div class='contacts-content flex-con'>"+users[i].nickname+"</div>"+
							"<div class='go-contacts'></div>"+
						"</div>"

			marker.addEventListener("click", function(e){
				var p = e.target;
				var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
				
				var infoWindow = new BMap.InfoWindow(str,{
					width: 150,     // 信息窗口宽度
					height: 50,     // 信息窗口高度
					enableMessage: true//设置允许信息窗发送短息
			    });  // 创建信息窗口对象 
				
				map.openInfoWindow(infoWindow, point); 			//开启信息窗口
				$(".contacts").unbind('click');
				$(".contacts").bind('click', function(){
					api.openWin({
						name: 'user_detail',
						url: '../detail/user_detail.html'
					});
				});
			});
		}
	}

	//采用列表的方式添加
	function fillAreaList(users){
		var list_html = "";
		for(var i=0; i<users.length; i++){
			list_html += 	'<div class="activity-item flex-wrap" uid="'+ users[i].user_id +'">' +
								'<img class="activity-img" src="../../image/touxiang.jpg"></img>' +
								'<div class="activity-content flex-con">' +
									'<p class="activity-title">'+ users[i].nickname +'</p>' +
									'<p class="activity-subtitle">'+ users[i].dis +'千米</p>' +
								'</div>' +
							'</div>'
		}

		$("#map-content").html(list_html);
		$(".activity-item").unbind('click');
		$(".activity-item").bind('click', function(){
			api.openWin({
				name: 'user_detail',
				url: '../detail/user_detail.html'
			});
		});
	}

})(jQuery);

