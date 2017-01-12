mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			callback: pulldownRefresh
		},
		up: {
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});
var refresh = true; // =true为下拉刷新，=flase为上拉加载
var articleId; //文章id
var commentFirstId = 0; //评论列表第一条id
var commentLastId = 0; //评论列表第一条id
var getCommetnList; // 获取评论列表

/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	setTimeout(function() {
		refresh = true;
		getCommetnList(articleId, commentFirstId, refresh);
	}, 1500);
};

/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	setTimeout(function() {
		refresh = false;
		getCommetnList(articleId, commentLastId, refresh);
	}, 1500);
};

mui.plusReady(function() {
	/**
	 * 获取文章id
	 */
	var self = plus.webview.currentWebview();
	articleId = self.articleid;

	/**
	 * 	获取评论列表
	 */
	getCommetnList = function(articleId, commentId, refresh) {
		var data;
		if(refresh) {
			data = {
				articleid: articleId
			}

		} else {
			data = {
				id: commentId,
				articleid: articleId
			}
		}
		mui.ajax(Common.domain + '/fuwu/api/article_comment.php', {
			data: data,
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				if(data.status == 200) {
					if(refresh) {
						$('ul li').remove();
						commentFirstId = data.result[0].id;
						commentLastId = data.result[data.result.length - 1].id;
					} else {
						commentLastId = data.result[data.result.length - 1].id;
					}
					var table = document.body.querySelector('.mui-table-view');
					for(var i = 0; i < data.result.length; i++) {
						if(i == 0) {
							commentFirstId = data.result[i].id;
						}
						var li = document.createElement('li');
						li.innerHTML = '<div class="comment"><ul><li><p class="commne_nr">' + (data.result[i].comment) + '</p><p class="comment_peo"><img src="images/toupic.png"><span>用户' + (data.result[i].userid) + '</span></p><p class="comment"><span>' + (data.result[i].time) + '</span><span></span></p></li></ul></div>';
						//下拉刷新，新纪录插到最前面；
						if(refresh) {
							table.appendChild(li, table.firstChild);
						} else {
							table.appendChild(li, table.lastChild);
						}
					}
				} else {
					mui.toast('暂无数据...状态码(' + data.status + ')');
				}

				mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
				mui('#pullrefresh').pullRefresh().endPullupToRefresh();
			},
			error: function(xhr, type, errorThrown) {
				mui.toast('服务器异常...');
				commentFirstId = 0; //评论列表第一条id
				commentLastId = 0; //评论列表第一条id
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
				mui('#pullrefresh').pullRefresh().endPullupToRefresh();
			}
		});
	};
	/**
	 * 	获取评论列表数据
	 */
	getCommetnList(articleId, commentFirstId, refresh);
});