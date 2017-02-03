(function($, doc) {
	/**
	 *	mui插件初始化 
	 */
	mui.init();
	/**
	 *	mui将该事件封装成了mui.plusReady()方法，涉及到HTML5+的api，建议都写在mui.plusReady方法中。 
	 */
	mui.plusReady(function() {
		/**
		 * 可选值：
		 * “adjustPan”- 弹出软键盘时Webview窗口自动上移，以保证当前输入框可见；
		 * “adjustResize”- 自动调整Webview窗口大小（屏幕区域减去软键盘区域），同时自动滚动Webview保证输入框可见。 默认值为“adjustPan”。
		 */
		plus.webview.currentWebview().setStyle({
			softinputMode: "adjustResize"
		});

		/**
		 * 文章id
		 */
		var articleId = plus.webview.currentWebview().articleid;
		/**
		 * 文章url
		 */
		var articleUrl = plus.webview.currentWebview().articleurl;
		/**
		 * 
		 * 图片长度
		 */
		var articlelength = plus.webview.currentWebview().articlelength;
		console.log("长度：：：：：：" + articlelength);
		/**
		 *	纠正高度 
		 */
		setTimeout(function() {
			var iframe = document.getElementById("iframepage");
			try {
				var bHeight = iframe.contentWindow.document.body.scrollHeight;
				var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
				var height = Math.max(bHeight, dHeight);
				iframe.height = height;
			} catch(ex) {}
		}, 2000);

		/**
		 *	文章详情 
		 */
		//					document.getElementById("article_details").innerHTML = '<iframe src=' + (articleUrl) + ' id="iframepage" name="iframepage" frameBorder=0 scrolling=no width="100%"></iframe>';

		//		var info = function() {
		//			$.ajax({
		//				url: articleUrl,
		//				async: false,
		//				success: function(data) {
		//					var inof_connet = data;
		//					//					$(".inof_connet").html(inof_connet);
		//					console.log("成功......" + inof_connet);
		//					//					if()
		//					document.getElementById('article_details').innerHTML = '<iframe src=' + (articleUrl) + ' id="iframepage" name="iframepage" frameBorder=0 scrolling=no width="100%"></iframe>';
		//
		//				}
		//
		//			});
		//		}

		console.log("文章ID：：" + articleUrl);
		/**
		 * 获取推荐资讯列表请求
		 * @param {Object} articleId  文章id
		 */
		var arrimg = new Array();
		var arrtitle = new Array();
		var getInformationList = function(articleId) {
			mui.ajax(Common.domain + '/fuwu/api/check_article.php', {
				data: {
					id: articleId
				},
				dataType: 'json', //服务器返回html格式数据
				type: 'post', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(data) {
					if(data.status == 200) {
						//arrimg = data.image.length
						//alert(arrimg);
						//图片存储
						for(var x = 2, y = 0; x < data.image.length; x++, y++) {
							arrimg[y] = data.image[x];
						}
						//内容存储
						for(var x = 0, y = 0; x < data.image.length; x++, y++) {
							arrtitle[y] = data.image[0];
							//							arrtitle[y]=data.image[1];
						}
						//						alert(arrtitle);
						console.log('beforeSend:::' + JSON.stringify(data));
						document.getElementById("comment_num").innerText = data.result.commentnum;
						document.getElementById("like_num").innerText = data.result.likes;
						var table = document.body.querySelector('.mui-table-view');
						for(var i = 0; i < data.result.list.length; i++) {
							var li = document.createElement('li');
							li.innerHTML = '<a href="informationDetails.html" id="' + (data.result.list[i].id) + '" deburl="' + (data.result.list[i].deburl) + '"><h3>' + (data.result.list[i].arr[0]) + '</h3><p>华地艺术网专稿</p></a>';
							table.appendChild(li);
						}
					} else {
						mui.toast('新闻推荐列表获取失败...状态码(' + data.status + ')');
					}
					//					推荐资讯列表请求成功之后对详情页的展示方式做一个判断
					if(articlelength > 5) {
						/**
						 *全图隐藏关联新闻 
						 */
						document.getElementById("hiddenAssociated").style.display = 'none';
						document.getElementById("hiddenAssociated1").style.display = 'none';
						$(function() {
							var div = '';
							var boxheight = window.screen.height 
							for(var i = 0; i < arrimg.length; i++) {
								div += '<div class="mui-slider-item" style="margin-top: 40%;"><a class="pic_box" ><img id="infoimg" src="' + arrimg[i] + '" style="height: 250px;"/><p class="mui-slider-title">' + arrtitle[i] + '</p></a></div>';
							}
							document.getElementById("ceshi").innerHTML = div;
						});
						
					} else {
						/**
						 *全图显示关联新闻 
						 */
						document.getElementById("hiddenAssociated").style.display = 'block';
						document.getElementById("hiddenAssociated1").style.display = 'block';
						document.getElementById('article_details').innerHTML = '<iframe src=' + (articleUrl) + ' id="iframepage" name="iframepage" frameBorder=0 scrolling=no width="100%"></iframe>';
					}
				},
				error: function(xhr, type, errorThrown) {
					mui.toast('服务器异常...错误描述：' + xhr.status);
				}
			});
			
			
		};
		
		getInformationList(articleId);

		var isColleciton = function(userId, articleId) {
			mui.ajax(Common.domain + '/fuwu/api/favorite.php', {
				data: {
					userid: userId,
					articleid: articleId,
					action: 'check'
				},
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(data) {
					if(data.status == 200) {
						collection = data.type;
						if(collection == 1) {
							document.getElementById('collection_click').src = "images/collection_on.png";
						} else {
							document.getElementById('collection_click').src = "images/collection_off.png";
						}
					}
				},
				error: function(xhr, type, errorThrown) {

				}
			});
		};

		isColleciton(Common.getUserid(), articleId);

		/*
		 * 收藏、取消收藏
		 */
		var clickCollection = function(userId, articleId, cid) {
			mui.ajax(Common.domain + '/fuwu/api/favorite.php', {
				data: {
					userid: userId,
					articleid: articleId,
					subtype: '1',
					cid: cid,
				},
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(data) {
					console.log("收藏成功：：" + data.status);
					if(data.status == "200") {
						mui.toast("已收藏成功");
						document.getElementById('collection_click').src = "images/collection_on.png";
					} else {
						mui.toast('收藏失败...状态吗：(' + data.status + ')');
					}
				},
				error: function(xhr, type, errorThrown) {
					console.log('收藏接口访问失败：：：：' + xhr.status);
					mui.toast("服务器异常");
				}
			});
		}

		var canceCollection = function(userId, articleId) {
				mui.ajax(Common.domain + '/fuwu/api/favorite.php', {
					data: {
						userid: userId,
						articleid: articleId,
						action: 'cancel',
					},
					dataType: 'json', //服务器返回json格式数据
					type: 'post', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；
					success: function(data) {
						console.log(JSON.stringify(data));
						if(data.status == "200") {
							mui.toast("你以取消收藏");
							document.getElementById('collection_click').src = "images/collection_off.png";
						} else {
							mui.toast('取消收藏失败...状态吗：(' + data.status + ')');
						}
					},
					error: function(xhr, type, errorThrown) {
						console.log('收藏接口访问失败：：：：' + xhr.status);
					}
				});
			}
			/**
			 * 判断是收藏还是取消，0表示取消收藏，不为0表示收藏文章
			 */
		var collection;
		document.getElementById('collection_click').onclick = function() {
			/**
			 *	判断用户是或否登陆 
			 */
			if(Common.getisLogin() != 1) {
				mui.openWindow({
					id: 'login_new',
					url: 'mine/login_new.html',
					styles: {
						popGesture: 'close',
					},
					createNew: false //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
				});
			} else {
				// 个推cid
				var igeCid = plus.push.getClientInfo().clientid;
				console.log('igeCid::::' + igeCid);
				var userId = Common.getUserid();
				if(document.getElementById('collection_click').src.match("on_on")) {
					canceCollection(userId, articleId, igeCid);
				} else {
					clickCollection(userId, articleId, igeCid);
				}
			}
		}

		/**
		 * 发送评论请求
		 * @param {Object} articleId
		 */
		var sendComment = function(userId, articleId, commentContent) {
			var waiting = Common.showWaiting();
			console.log(userId, articleId, commentContent);
			mui.ajax(Common.domain + '/fuwu/api/add_comment.php', {
				data: {
					userid: userId,
					articleid: articleId,
					content: commentContent
				},
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(data) {
					Common.closeWaiting(waiting);
					if(data.status == 200) {
						mui.toast('评论已成功...');
					} else {
						mui.toast('评论失败...状态码(' + data.status + ')');
					}

				},
				error: function(xhr, type, errorThrown) {
					Common.closeWaiting(waiting);
					mui.toast('服务器异常...错误描述：' + type);
				}
			});
		};

		/**
		 *	点击喜欢 
		 */
		document.getElementById("like_click").addEventListener("click", function() {
			/**
			 *	判断用户是或否登陆 
			 */
			if(Common.getisLogin() != 1) {
				mui.openWindow({
					id: 'login_new',
					url: 'mine/login_new.html',
					styles: {
						popGesture: 'close',
					},
					createNew: false //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
				});
			} else {
				sendLike(articleId);
			}
		});
		/**
		 *	点击喜欢 
		 */
		document.getElementById("like_num").addEventListener("click", function() {
			/**
			 *	判断用户是或否登陆 
			 */
			if(Common.getisLogin() != 1) {
				mui.openWindow({
					id: 'login_new',
					url: 'mine/login_new.html',
					styles: {
						popGesture: 'close',
					},
					createNew: false //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
				});
			} else {
				sendLike(articleId);
			}
		});
		/**
		 * 隐藏键盘
		 */
		document.getElementById("inputeFooterid").addEventListener("click", function() {
			document.getElementById("contentId").blur();
			document.getElementById("footerbackgrod").hidden = false;
			document.getElementById("inputeFooterid").hidden = true;
		});

		/**
		 * 发送点赞请求
		 * @param {Object} userId 用户id
		 * @param {Object} articleId 文章id
		 */
		var sendLike = function(articleId) {
			var waiting = Common.showWaiting();
			mui.ajax(Common.domain + '/fuwu/api/addValue.php', {
				data: {
					action: 'like',
					id: articleId
				},
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(data) {
					Common.closeWaiting(waiting);
					if(data.status == 200) {
						document.getElementById("like_num").innerText = data.result.likes;
						mui.toast('点赞已成功...');
					} else {
						mui.toast('点赞未成功...状态码(' + data.status + ')');
					}
				},
				error: function(xhr, type, errorThrown) {
					Common.closeWaiting(waiting);
					mui.toast('服务器异常...错误描述：' + type);
				}
			});
		};

		/**
		 * 	推荐列表跳转
		 */
		mui('#list').on('tap', 'a', function() {
			var id = 'informationDetails.html';
			var href = 'informationDetails.html';
			var articleid = this.getAttribute('id');
			var articleurl = this.getAttribute('deburl');
			mui.openWindow({
				id: articleid,
				url: href,
				styles: {
					popGesture: 'close',
				},
				extras: {
					articleid: articleid,
					articleurl: articleurl
				},
				createNew: true
			});
		});

		/**
		 *	跳转评论列表 
		 */
		document.getElementById("comment_list").addEventListener("click", function() {
			mui.openWindow({
				id: 'comment.html',
				url: 'comment.html',
				styles: {
					popGesture: 'close',
				},
				extras: {
					articleid: articleId
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
		/**
		 *	跳转评论列表 
		 */
		document.getElementById("comment_num").addEventListener("click", function() {
			mui.openWindow({
				id: 'comment.html',
				url: 'comment.html',
				styles: {
					popGesture: 'close',
				},
				extras: {
					articleid: articleId
				},
				createNew: true, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			});
		});

		/**
		 *	提交评论内容 
		 */
		mui('#shuru').on('tap', 'button', function() {
			/**
			 *	判断用户是或否登陆 
			 */
			if(Common.getisLogin() != 1) {
				document.getElementById("contentId").blur();
				document.getElementById("footerbackgrod").hidden = false;
				document.getElementById("inputeFooterid").hidden = true;
				mui.openWindow({
					id: 'login_new',
					url: 'mine/login_new.html',
					styles: {
						popGesture: 'close',
					},
					createNew: false //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
				});

			} else {
				document.getElementById("contentId").blur();
				document.getElementById("footerbackgrod").hidden = false;
				document.getElementById("inputeFooterid").hidden = true;
				var content = document.getElementById("contentId").value;
				var userId = Common.getUserid();
				if(content.length == 0) {
					mui.toast('请输入评论内容...');
				} else {
					sendComment(userId, articleId, content);
				}

			}
		});
	});
	
	/**
	 * 当DOM准备就绪时，指定一个函数来执行。
	 */
	mui.ready(function() {
		/**
		 * 点击评论
		 */
		
		document.getElementById("xie").addEventListener("click", function() {
			document.getElementById("footerbackgrod").hidden = true;
			document.getElementById("inputeFooterid").hidden = false;
			document.getElementById("contentId").focus();
		});
		

	});
}(mui, document)
);
