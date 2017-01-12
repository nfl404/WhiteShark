(function($) {
	var network = true;
	if(mui.os.plus) {
		mui.plusReady(function() {
			if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
				network = false;
			}
		});
	}
	var obj;
	//验证码回调函数
	var success = function(response) {
		var dataType = 'json';
		if(dataType === 'json') {
			response = JSON.stringify(response);
			//						alert("验证码response:"+response);
		} else if(dataType === 'xml') {
			response = new XMLSerializer().serializeToString(response).replace(/</g, "&lt;").replace(/>/g, "&gt;");
		}
		obj = eval('(' + response + ')');
		//					if(response)
		console.log("获取验证码：：：：" + JSON.stringify(obj.status));
		if(obj.status == "200") {
			alert("获取验证码成功");
			//						document.getElementById("obtain").onclick=function(){time(this);}
			//						$("#obtain").focus();
			//						document.getElementsByTagName('button')[1].innerHTML = '正在发送';
		} else {
			alert("验证码获取失败");
		}
	};
	//登录回调
	var obj1;
	var successlog = function(response) {
		var dataType = 'json';
		if(dataType === 'json') {
			response = JSON.stringify(response);
			//						alert("response:"+response);
		} else if(dataType === 'xml') {
			response = new XMLSerializer().serializeToString(response).replace(/</g, "&lt;").replace(/>/g, "&gt;");
		}
		obj1 = eval('(' + response + ')');
		//					alert("登录成功"+response);

		if(obj1.status == "200") {
			//						document.getElementsByTagName('button')[1].innerHTML = '正在发送';
			//							window.open ('home_copy.html');
			mui.openWindow({
				id: 'home_copy.html',
				url: 'home_copy.html',
				styles: {
					popGesture: 'close',
				},
				createNew: false //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			});
			//							alert("登录成功")；

		} else {
			alert("验证码已过期，请重新登录");
		}
	};

	//检查 "登录状态/锁屏状态" 结束
	//var loginButton = doc.getElementById('login');
	var loginButton = document.getElementById('login');
	var accountBox = document.getElementById('account');
	//				var passwordBox = document.getElementById('password');
	var obtainBox = document.getElementById("obtain"); //获取验证码按钮
	var phoneBox = document.getElementById('phone') //手机号码
	var code1Box = document.getElementById("code1"); //验证码NUM
	var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
	var flag;
	//alert(flag);

	//验证码倒计时
	var wait = 60;

	function time(o) {
		if(wait == 0) {
			o.removeAttribute("disabled");
			o.value = "免费获取验证码";
			wait = 60;

		} else {
			o.setAttribute("disabled", true);
			o.value = "重新发送(" + wait + ")";
			wait--;
			setTimeout(function() {
					time(o)
				},
				1000)
		}
	}

	obtainBox.addEventListener('tap', function(event) {

		var ajax = function(act, mobile) {
			//利用RunJS的Echo Ajax功能测试
			var url = 'http://192.168.0.112/fuwu/api/login.php';
			//请求方式，默认为Get；
			var type = 'post';
			//预期服务器范围的数据类型
			var dataType = 'json';
			//发送数据
			var data = {
				mobile: mobile,
				action: act,
			};
			$.post(url, data, success, dataType);
		};
		//正则表达式，判断是否为手机号
		flag = reg.test(phoneBox.value);
		if(!flag) {
			alert("请输入正确的手机号");
		} else {
			if(network) {
				ajax('send_code', phoneBox.value);
				document.getElementById("obtain").onclick = function() {
					time(this);
				}
			} else {
				mui.toast("当前网络不给力，请稍后再试");
			}
		}

	});

	loginButton.addEventListener('tap', function(event) {
		//判断是输入框内是否为空
		if(phoneBox.value != "" || obtainBox.value != "") {
			var ajax = function() {
				//						 		alert("login接口  ;;"+url);
				//利用RunJS的Echo Ajax功能测试
				var url = 'http://192.168.0.112/fuwu/api/login.php';
				//请求方式，默认为Get；
				var type = 'post';
				//预期服务器范围的数据类型
				var dataType = 'json';
				//发送数据
				var data = {
					mobile: phoneBox.value.toString(),
					action: "login",
					code: code1Box.value.toString(),
					mac: plus.device.uuid,
				};
				//								beforeSend(json,url);
				$.post(url, data, successlog, dataType);

			};
			if(network) {
				ajax();
			} else {
				mui.toast("当前网络不给力，请稍后再试");
			}
		} else {
			alert("不能为空！");
		}

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

}(mui));