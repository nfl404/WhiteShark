mui.init();
(function($) {
	var network = true;
	if(mui.os.plus) {
			mui.plusReady(function() {
				if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
					network = false;
				}
			});
		}
	var ws;
	mui.plusReady(function plusReady() {
		ws = plus.device.uuid.toString();
		if(network) {
					ajax();
				} else {
					mui.toast("当前网络不给力，请稍后再试");
				}
	});

	var obj;
	//验证码回调函数
	var success = function(response) {
		var dataType = 'json';
		if(dataType === 'json') {
			response = JSON.stringify(response);
		} else if(dataType === 'xml') {
			response = new XMLSerializer().serializeToString(response).replace(/</g, "&lt;").replace(/>/g, "&gt;");
		}
		obj = eval('(' + response + ')');
		if(obj.status == "200"){
//			if(obj.result == "200") {
			document.getElementById("islogin").innerHTML = "已登录";
//			} 
		}else {
				mui.openWindow({
					id: 'login_new.html',
					url: 'mine/login_new.html',
					styles: {
						popGesture: 'close',
					},
					createNew: false //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
				});
				document.getElementById("islogin").innerHTML = "未登录";
			}

	};
	var ajax = function() {
		//利用RunJS的Echo Ajax功能测试
		var url = 'http://192.168.0.112/fuwu/api/is_login.php';
		//请求方式，默认为Get；
		var type = 'post';
		//预期服务器范围的数据类型
		var dataType = 'json';
		//发送数据
		var data = {
			mac: ws,
		};
		$.post(url, data, success, dataType);
	};

	//登录
	document.getElementById("mylogin").addEventListener('tap', function() {

		//					window.open ('mine/login.html');
		if(network) {
					ajax();
				} else {
					mui.toast("当前网络不给力，请稍后再试");
				}

	});
	//版本号
	document.getElementById("myvervice").addEventListener('tap', function() {
		alert("当前版本为1.0");
	});
	//设置
	document.getElementById("mysetting").addEventListener('tap', function() {
		mui.openWindow({
			id: 'setting.html',
			url: 'mine/setting.html',
			styles: {
				popGesture: 'close',
			},
			createNew: false //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		});
	});
	//公告
	document.getElementById("myannouncement").addEventListener('tap', function() {

		alert("公告.........");
	});

	//设置全局beforeSend
	$.ajaxSettings.beforeSend = function(xhr, setting) {
		//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
		console.log('beforeSend:::' + JSON.stringify(setting));
	};
	//设置全局complete
	$.ajaxSettings.complete = function(xhr, status) {
			console.log('complete:::' + status);
		}
		//监听“plusready”事件

}(mui));