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
					}, 1000);

					/**
					 *	文章详情 
					 */
					document.getElementById("article_details").innerHTML = '<iframe src=' + (articleUrl) + ' id="iframepage" name="iframepage" frameBorder=0 scrolling=no width="100%"></iframe>';

					/**
					 * 获取推荐资讯列表请求
					 * @param {Object} articleId  文章id
					 */
					var getInformationList = function(articleId) {
						mui.ajax(Common.domain + '/fuwu/api/check_article.php', {
							data: {
								id: articleId
							},
							dataType: 'json', //服务器返回html格式数据
							type: 'post', //HTTP请求类型
							timeout: 10000, //超时时间设置为10秒；
							success: function(data) {
								console.log(JSON.stringify(data));
								if(data.status == 200) {
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
							},
							error: function(xhr, type, errorThrown) {
								mui.toast('服务器异常...错误描述：' + xhr.status);
							}
						});
					};
					getInformationList(articleId);

					/**
					 * 发送评论请求
					 * @param {Object} articleId
					 */
					var sendComment = function(userId, articleId, commentContent) {
						var waiting = Common.showWaiting();
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
								mui.toast('评论已成功...');
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
						sendLike(articleId);
					});
					document.getElementById("like_num").addEventListener("click", function() {
						sendLike(articleId);
					});
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
							}
						});
					});
					document.getElementById("comment_num").addEventListener("click", function() {
						mui.openWindow({
							id: 'comment.html',
							url: 'comment.html',
							styles: {
								popGesture: 'close',
							},
							extras: {
								articleid: articleId
							}
						});
					});

					/**
					 *	提交评论内容 
					 */
					mui('#shuru').on('tap', 'button', function() {
						document.getElementById("contentId").blur();
						document.getElementById("footerbackgrod").hidden = false;
						document.getElementById("inputeFooterid").hidden = true;
						var content = document.getElementById("contentId").value;
						sendComment(1, articleId, content);
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
						//						var callback = function(){
						//							console.log(11);
						//						}
						//						var mask = mui.createMask(callback);
						//						mask.show()
						document.getElementById("footerbackgrod").hidden = true;
						document.getElementById("inputeFooterid").hidden = false;
						document.getElementById("contentId").focus();
					});
				});
			}(mui, document));