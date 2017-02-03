mui.init();
(function($) {
	var deceleration = mui.os.ios ? 0.003 : 0.0009;
	$('.mui-scroll-wrapper').scroll({
		bounce: true,
		indicators: true, //是否显示滚动条
		deceleration: deceleration
	});
	/**
	 * 跳转搜索
	 */
	mui("#searchId").on('tap', 'a', function() {
		mui.openWindow({
			id: 'search.html',
			url: 'search.html',
			styles: {
				popGesture: 'close',
			},
			extras: {

			},
			createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			show: {
				autoShow: true,
				aniShow: 'slide-in-right',
				duration: mui.os.ios ? 200 : 100
			},
			waiting: {
				autoShow: true,
				title: '正在加载...',
			}
		});
	});
	/**
	 * 资讯列表样式，随机三种样式
	 * @param {Object} ul
	 * @param {Object} index
	 * @param {Object} data
	 */
	var createFragment = function(ul, index, data) {
		var fragment = document.createDocumentFragment();
		var li;
		for(var i = 0; i < data.result.length; i++) {
			li = document.createElement('li');
			var num = Math.round(Math.random() * 1 + 1);
//			alert(data.result[i].arr.length);
			if(data.result[i].arr.length >= 5) {
				li.className = 'mui-table-view-cell mui-media';
				li.innerHTML = '<div class="card1"><a href="information_details.html" id="' + (data.result[i].id) + '" deburl="' + (data.result[i].deburl) + '" likes="' + (data.result[i].likes) + '"articleleng="'+(data.result[i].arr.length)+'"><div class="card_tit"><p class="card_time"><em></em><span>' + (data.result[i].addtime) + '</span></p><p class="card_Source">华地艺术网专稿</p></div><div class="card1_nr"><div class="card1_pic"><span style="background-image: url(' + (data.result[i].arr[2]) + ');"></span><span style="background-image: url(' + (data.result[i].arr[3]) + ');"></span><span style="background-image: url(' + (data.result[i].arr[4]) + ');"></span></div><h2>' + data.result[i].arr[0] + '</h2></div><div class="card_number"><p class="card_xi"><em></em><span>' + (data.result[i].hits) + '</span></p><p class="card_du"><em></em><span>' + (data.result[i].likes) + '</span></p></div></a></div>'
			} else {
				if(num == 1) {
					//卡片2
					li.className = 'mui-table-view-cell mui-media';
					li.innerHTML = '<div class="card2"><a href="information_details.html" id="' + (data.result[i].id) + '" deburl="' + (data.result[i].deburl) + '" likes="' + (data.result[i].likes) +'"articleleng="'+(data.result[i].arr.length)+ '"><div class="card_tit"><p class="card_time"><em></em><span>' + (data.result[i].addtime) + '</span></p><p class="card_Source">华地艺术网专稿</p></div><div class="card2_nr"><div class="card2_pic"><img src=' + (data.result[i].arr[2]) + '></div><h2>' + data.result[i].arr[0] + '</h2></div><div class="card_number"><p class="card_xi"><em></em><span>' + (data.result[i].hits) + '</span></p><p class="card_du"><em></em><span>' + (data.result[i].likes) + '</span></p></div></a></div>'
				} else {
					//卡片3
					li.className = 'mui-table-view-cell mui-media';
					li.innerHTML = '<div class="card3"><a href="information_details.html" id="' + (data.result[i].id) + '" deburl="' + (data.result[i].deburl) + '" likes="' + (data.result[i].likes) +'"articleleng="'+(data.result[i].arr.length)+ '"><div class="card_tit"><p class="card_time"><em></em><span>' + (data.result[i].addtime) + '</span></p><p class="card_Source">华地艺术网专稿</p></div><div class="card3_nr"><div class="card3_tit"><h2>' + data.result[i].arr[0] + '</h2><p>' + data.result[i].arr[1] + '</p></div><div class="card3_pic"><span style="background-image: url(' + (data.result[i].arr[2]) + ');"></span></div></div><div class="card_number"><p class="card_xi"><em></em><span>' + (data.result[i].hits) + '</span></p><p class="card_du"><em></em><span>' + (data.result[i].likes) + '</span></p></div></a></div>'
				}
			}
			//if(num == 1) {
			//	i.className = 'mui-table-view-cell mui-media';
			//	li.innerHTML = '<div class="card1"><a href="information_details.html" id="' + (data.result[i].id) + '" deburl="' + (data.result[i].deburl) + '" likes="' + (data.result[i].likes) + '"><div class="card_tit"><p class="card_time"><em></em><span>' + (data.result[i].addtime) + '</span></p><p class="card_Source">华地艺术网专稿</p></div><div class="card1_nr"><div class="card1_pic"><span style="background-image: url(' + (data.result[i].arr[2]) + ');"></span><span style="background-image: url(' + (data.result[i].arr[3]) + ');"></span><span style="background-image: url(' + (data.result[i].arr[4]) + ');"></span></div><h2>' + data.result[i].arr[0] + '</h2></div><div class="card_number"><p class="card_xi"><em></em><span>' + (data.result[i].hits) + '</span></p><p class="card_du"><em></em><span>' + (data.result[i].likes) + '</span></p></div></a></div>'
			//} else 

			fragment.appendChild(li);
			Common.closeWaiting(waiting);
		}
		return fragment;
	};
	var firstId; //列表第一个id
	var latestId; //列表最后一个id
	var waiting; //加载等待
	var tab_type = 1; //滑动标题类型
	var agnix; //agnix请求数据

	/**
	 * 根据滑动列表索引值获取catid
	 * @param {Object} index
	 */
	var catidWithIndex = function(index) {
		var catid;
		switch(index) {
			case 0:
				{
					catid = 0; //头条
				}
				break;
			case 1:
				{
					catid = 2; //艺术家
				}
				break;
			case 2:
				{
					catid = 3; //书画
				}
				break;
			case 3:
				{
					catid = 4; //艺术品
				}
				break;
			case 4:
				{
					catid = 5; //访谈
				}
				break;
			case 5:
				{
					catid = 6; //古玩
				}
				break;
			case 6:
				{
					catid = 7; //展览
				}
				break;
			case 7:
				{
					catid = 8; //艺术市场
				}
				break;
			case 8:
				{
					catid = 9; //收藏品
				}
				break;
			default:
				break;
		}
		return catid;
	};
	/**
	 *	创建用于记录不同滑动列表的首个id 
	 */
	var firstId0, firstId1, firstId2, firstId3, firstId4, firstId5, firstId6, firstId7, firstId8;

	var setFirstIdWithTypeAndIndex = function(index, firstId) {
		switch(index) {
			case 0:
				{
					firstId0 = firstId;
				}
				break;
			case 1:
				{
					firstId1 = firstId;
				}
				break;
			case 2:
				{
					firstId2 = firstId;
				}
				break;
			case 3:
				{
					firstId3 = firstId;
				}
				break;
			case 4:
				{
					firstId4 = firstId;
				}
				break;
			case 5:
				{
					firstId5 = firstId;
				}
				break;
			case 6:
				{
					firstId6 = firstId;
				}
				break;
			case 7:
				{
					firstId7 = firstId;
				}
				break;
			case 8:
				{
					firstId8 = firstId;
				}
				break;
			default:
				break;
		}
	};
	/**
	 * 根据滑动列表索引取对应列表的第一个id
	 * @param {Object} index
	 */
	var getFirstIdWithTypeAndIndex = function(index) {
		var value;
		switch(index) {
			case 0:
				{
					value = firstId0;
				}
				break;
			case 1:
				{
					value = firstId1;
				}
				break;
			case 2:
				{
					value = firstId2;
				}
				break;
			case 3:
				{
					value = firstId3;
				}
				break;
			case 4:
				{
					value = firstId4;
				}
				break;
			case 5:
				{
					value = firstId5;
				}
				break;
			case 6:
				{
					value = firstId6;
				}
				break;
			case 7:
				{
					value = firstId7;
				}
				break;
			case 8:
				{
					value = firstId8;
				}
				break;
			default:
				break;
		}
		return value;
	};
	/**
	 *	创建用于记录不同滑动列表的最后一个id 
	 */
	var lastId0, lastId1, lastId2, lastId3, lastId4, lastId5, lastId6, lastId7, lastId8;
	var setLastIdWithTypeAndIndex = function(index, lastId) {
		switch(index) {
			case 0:
				{
					lastId0 = lastId;
				}
				break;
			case 1:
				{
					lastId1 = lastId;
				}
				break;
			case 2:
				{
					lastId2 = lastId;
				}
				break;
			case 3:
				{
					lastId3 = lastId;
				}
				break;
			case 4:
				{
					lastId4 = lastId;
				}
				break;
			case 5:
				{
					lastId5 = lastId;
				}
				break;
			case 6:
				{
					lastId6 = lastId;
				}
				break;
			case 7:
				{
					lastId7 = lastId;
				}
				break;
			case 8:
				{
					lastId8 = lastId;
				}
				break;
			default:
				break;
		}
	};
	/**
	 * 根据滑动列表索引取对应列表的最有一个id
	 * @param {Object} index
	 */
	var getLastIdWithTypeAndIndex = function(index) {
		var value;
		switch(index) {
			case 0:
				{
					value = lastId0;
				}
				break;
			case 1:
				{
					value = lastId1;
				}
				break;
			case 2:
				{
					value = lastId2;
				}
				break;
			case 3:
				{
					value = lastId3;
				}
				break;
			case 4:
				{
					value = lastId4;
				}
				break;
			case 5:
				{
					value = lastId5;
				}
				break;
			case 6:
				{
					value = lastId6;
				}
				break;
			case 7:
				{
					value = lastId7;
				}
				break;
			case 8:
				{
					value = lastId8;
				}
				break;
			default:
				break;
		}
		return value;
	};

	mui.plusReady(function() {
		/**
		 * agnix列表请求
		 * @param {Object} ul	tableView的ul
		 * @param {Object} index 索引
		 * @param {Object} type  0=首次请求，1=下拉刷新，2=上拉加载
		 * @param {Object} id    列表id
		 */
		agnix = function(ul, index, type, id, self) {
			var type_index = catidWithIndex(index);
			var data;
			switch(type) {
				case 0:
					{
						data = {
							type: type_index,
							subtype: 0,
						}
					}
					break;
				case 1:
					{
						data = {
							type: type_index,
							subtype: 0,
							id: id,
							action: "referesh",
						}
					}
					break;
				case 2:
					{
						data = {
							type: type_index,
							subtype: 0,
							id: id
						}
					}
					break;
				default:
					break;
			}
			mui.ajax(Common.domain + '/fuwu/api/article.php', {
				data: data,
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(data) {
					if(data.status == "200") {
						switch(type) {
							case 0:
								{
									if(data.result.length !== 0) {
										setFirstIdWithTypeAndIndex(index, data.result[0].id);
										setLastIdWithTypeAndIndex(index, data.result[data.result.length - 1].id);
									}
									ul.appendChild(createFragment(ul, index, data));
								}
								break;
							case 1:
								{
									if(index === 0) {
										if(data.result.length !== 0) {
											setFirstIdWithTypeAndIndex(index, data.result[0].id);
										}
										ul.insertBefore(createFragment(ul, index, data), ul.firstChild);
									} else {
										setFirstIdWithTypeAndIndex(index, data.result[0].id);
										ul.insertBefore(createFragment(ul, index, data), ul.firstChild);
									}
									self.endPullDownToRefresh();
								}
								break;
							case 2:
								{
									setLastIdWithTypeAndIndex(index, data.result[data.result.length - 1].id);
									ul.appendChild(createFragment(ul, index, data));
									if(data.result.length < 10) {
										self.endPullUpToRefresh(true);
									} else {
										self.endPullUpToRefresh(false);
									}
								}
								break;
							default:
								break;
						}
					} else {
						Common.closeWaiting(waiting);
						mui.toast('暂无数据(' + data.status + ')');
						self.endPullUpToRefresh();
						self.endPullDownToRefresh();

					}
				},
				error: function(xhr, type, errorThrown) {
					Common.closeWaiting(waiting);
					self.endPullUpToRefresh();
					self.endPullDownToRefresh();
					mui.toast('服务器异常...错误描述：' + xhr.status);
				}
			});
		};

		/**
		 *	首页列表遍历请求 
		 */
		waiting = Common.showWaiting(); 
		mui('.mui-slider-group .mui-table-view').each(function(index, element) {
			agnix(element, index, 0, 0, this);
			mui('#list' + (index) + '').on('tap', 'a', function() {
				var href = this.href;
				var articleid = this.getAttribute('id');
				var articleurl = this.getAttribute('deburl');
				var articlelength = this.getAttribute('articleleng');
				console.log("详情页长度：：：：：："+articlelength);
				mui.openWindow({
					url: 'informationDetails.html',
					styles: {
						popGesture: 'close',
					},
					extras: {
						articleid: articleid,
						articleurl: articleurl,
						articlelength: articlelength,
					},
					createNew: true, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
					show: {
						autoShow: true,
						aniShow: 'slide-in-right',
						duration: mui.os.ios ? 200 : 100
					},
					waiting: {
						autoShow: true,
						title: '正在加载...',
					}
				});
			});
		});
	});

	$.ready(function() {
		//循环初始化所有下拉刷新，上拉加载。
		$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				down: {
					callback: function() {
						var self = this;
						setTimeout(function() {
							var ul = self.element.querySelector('.mui-table-view');
							var firstId = getFirstIdWithTypeAndIndex(index);
							agnix(ul, index, 1, firstId, self);
						}, 1000);
					}
				},
				up: {
					callback: function() {
						var self = this;
						setTimeout(function() {
							var ul = self.element.querySelector('.mui-table-view');
							var lastId = getLastIdWithTypeAndIndex(index);
							agnix(ul, index, 2, lastId, self);
						}, 1000);
					}
				}
			});
		});
	});
})(mui);