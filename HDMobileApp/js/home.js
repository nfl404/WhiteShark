mui.init();
(function($) {
	//阻尼系数
	var deceleration = mui.os.ios ? 0.003 : 0.0009;
	//等待
	var waiting;
	$('.mui-scroll-wrapper').scroll({
		bounce: false,
		indicators: true, //是否显示滚动条
		deceleration: deceleration
	});
	/***
	 * 	网络请求
	 * @param {dataect} ul
	 * @param {dataect} index
	 * @param {dataect} reverse
	 */
	var ajax = function(ul, index, reverse, page) {
		var catid = catidWithIndex(index);
		var ctime;
		var data;
		if(reverse) {
			ctime = readCtimeWithIndex(index);
			data = {
				page: page,
				catid: catid,
				ctime: ctime,
				action: 'referesh'
			}
		} else {
			data = {
				page: page,
				catid: catid
			}
		}
		mui.ajax('http://192.168.0.112/fuwu/api/article.php', {
			data: data, // 请求参数
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				if(reverse) {
					ul.insertBefore(createFragment(ul, index, data, true), ul.firstChild);
				} else {
					ul.appendChild(createFragment(ul, index, data));
				}
				Common.closeWaiting(waiting);
			},
			error: function(xhr, type, errorThrown) {
				Common.closeWaiting(waiting);
			}
		});
	}

	var catidWithIndex = function(index) {
		var catid;
		switch(index) {
			case 0:
				{
					catid = 131; //推荐
				}
				break;
			case 1:
				{
					catid = 366; //热点
				}
				break;
			case 2:
				{
					catid = 367; //上海
				}
				break;
			case 3:
				{
					catid = 376; //社会
				}
				break;
			case 4:
				{
					catid = 373; //娱乐
				}
				break;
			case 5:
				{
					catid = 371; //科技
				}
				break;
			default:
				break;
		}
		return catid;
	};

	var page0 = 1;
	var page1 = 1;
	var page2 = 1;
	var page3 = 1;
	var page4 = 1;
	var pageWithReverseAndIndex = function(index) {
		var page;
		switch(index) {
			//推荐
			case 0:
				{
					page0++;
					page = page0;
				}
				break;
				//热点
			case 1:
				{
					page1++;
					page = page1;
				}
				break;
				//上海
			case 2:
				{
					page2++;
					page = page2;
				}
				break;
				//社会
			case 3:
				{
					page3++;
					page = page3;
				}
				break;
				//娱乐
			case 4:
				{
					page4++;
					page = page4;
				}
				break;
				//科技
			case 5:
				{
					page5++;
					page = page5;
				}
				break;
			default:
				break;
		}
		return page;
	};

	var ctime0;
	var ctime1;
	var ctime2;
	var ctime3;
	var ctime4;
	var ctime5;
	var ctimeWithIndex = function(index, ctimes) {
		switch(index) {
			//推荐
			case 0:
				{
					ctime0 = ctimes;
				}
				break;
				//热点
			case 1:
				{
					ctime1 = ctimes
				}
				break;
				//上海
			case 2:
				{
					ctime2 = ctimes;
				}
				break;
				//社会
			case 3:
				{
					ctime3 = ctimes;
				}
				break;
				//娱乐
			case 4:
				{
					ctime4 = ctimes;
				}
				break;
				//科技
			case 5:
				{
					ctime5 = ctimes;
				}
				break;
			default:
				break;
		}
	};

	var readCtimeWithIndex = function(index) {
		var ctime;
		switch(index) {
			//推荐
			case 0:
				{
					ctime = ctime0;
				}
				break;
				//热点
			case 1:
				{
					ctime = ctime1;
				}
				break;
				//上海
			case 2:
				{
					ctime = ctime2;
				}
				break;
				//社会
			case 3:
				{
					ctime = ctime3;
				}
				break;
				//娱乐
			case 4:
				{
					ctime = ctime4;
				}
				break;
				//科技
			case 5:
				{
					ctime = ctime5;
				}
				break;
			default:
				break;
		}
		return ctime;
	};

	var createFragment = function(ul, index, data, reverse) {
//		var length = ul.querySelectorAll('li').length;
		var fragment = document.createDocumentFragment();
		var li;
		console.log(data.list[0].title);
		for(var i = 0; i < data.list.length; i++) {
			ctimeWithIndex(index, data.list[i].ctime);
			li = document.createElement('li');
			if(data.list[i].type == '置顶') {
				li.className = 'list1-list';
				li.innerHTML = '<a id="' + (data.list[i].itemid) + '" href="info.html"><h2>' + (data.list[i].title) + '</h2><p><span class="index-zhiding">置顶</span><span>专题</span><span>' + (data.list[i].hits) + '浏览</span><span>' + (data.list[i].addtime) + '发布</span><span class="index-close"></span></p></a>';
			} else if(data.list[i].type == '推荐') {
				li.className = 'list2-list';
				li.innerHTML = '<a id="' + (data.list[i].itemid) + '" href="info.html"><div class="list2-left"><h2>' + (data.list[i].title) + '</h2><p><span>艺术网</span><span>' + (data.list[i].addtime) + '发布</span><span class="index-close"></span></p></div><img style="float: right;width: 40%;height: 6.4rem;" src="' + (data.list[i].thumb) + '"></a>';
			} else if(data.list[i].type == '精选') {
				li.className = 'list3-list';
				li.innerHTML = '<a id="' + (data.list[i].itemid) + '" href="info.html"><h2>' + (data.list[i].title) + '</h2><div class="list3-pic"><img style="float: left;width: 31.33%;margin: 0 1%;" src="' + (data.list[i].thumb) + '"><img style="float: left;width: 31.33%;margin: 0 1%;" src="' + (data.list[i].thumb) + '"><img style="float: left;width: 31.33%;margin: 0 1%;" src="' + (data.list[i].thumb) + '"></div><p><span class="index-jing">精选</span><span>专题</span><span>' + (data.list[i].hits) + '浏览</span><span>' + (data.list[i].addtime) + '发布</span><span class="index-close"></span></p></a>';
			} else {
				li.className = 'list4-list';
				li.innerHTML = '<a id="' + (data.list[i].itemid) + '" href="info.html"><h2>' + (data.list[i].title) + '</h2><div class="list4-vido"><img src="' + (data.list[i].thumb) + '"></div><p><span class="index-shi">视频</span><span>专题</span><span>' + (data.list[i].hits) + '浏览</span><span>' + (data.list[i].addtime) + '发布</span><span class="index-close"></span></p></a>';
			}
			fragment.appendChild(li);
		}
		return fragment;
	};

	$.ready(function() {
		//循环初始化所有下拉刷新，上拉加载。
		$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				down: {
					callback: function() {
						var self = this;
						setTimeout(function() {
							var ul = self.element.querySelector('.mui-table-view');
							ajax(ul, index, true, 1);
							self.endPullDownToRefresh();
						}, 1000);
					}
				},
				up: {
					callback: function() {
						var self = this;
						setTimeout(function() {
							var ul = self.element.querySelector('.mui-table-view');
							var page = pageWithReverseAndIndex(index);
							ajax(ul, index, false, page);
							self.endPullUpToRefresh();
						}, 1000);
					}
				}
			});
		});
	});
	mui('#search').on('tap', 'a', function() {
				mui.openWindow({
				id: 'search',
				url: 'search.html',
				styles: {
					popGesture: 'close',
				},
				createNew: false //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			});
			});
	

	mui.plusReady(function() {
		waiting = Common.showWaiting();
		mui('.mui-slider-group .mui-table-view').each(function(index, element) {
			ajax(element, index, false, 1);
			mui('#list'+(index)+'').on('tap', 'a', function() {
				var id = this.getAttribute('id');
				var href = this.href;
				var type = this.getAttribute("open-type");
				mui.openWindow({
					id: id,
					url: this.href,
					styles: {
						popGesture: 'close',
					},
					createNew: false //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
				});
			});
		})
	});
})(mui);