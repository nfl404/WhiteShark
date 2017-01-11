mui.init({
			swipeBack: true
		});
		mui.plusReady(function() {
			var id = plus.webview.currentWebview().id;
			console.log('info id::::' + id);
			var w = Common.showWaiting();
			mui.ajax('http://192.168.0.112/fuwu/api/article.php', {
				data: {
					id: id,
					action: 'check'
				},
				dataType: 'json', //服务器返回html格式数据
				type: 'post', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(data) {
					document.getElementById("title").innerHTML = data.list[0].title;
					document.getElementById("introduce").innerHTML = data.list[0].introduce;
					Common.closeWaiting(w);
				},
				error: function(xhr, type, errorThrown) {

				}
			});
		});