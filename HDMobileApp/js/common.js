/**
 * Common类初始化根对象 
 * @param {Object} root
 * @param {Object} factory
 */
(function(root, factory) {
	if(typeof module !== 'undefined' && typeof exports === 'object') {
		module.exports = factory(root.Common);
	} else if(typeof define === "function" && define.amd) {
		define(["Common"], function(Common) {
			return(root.Common = factory(Common));
		});
	} else {
		root.Common = factory(root.Common);
	}
}
/**
 * Common类构造
 */
(this, function(Common) {
	Common = {
		/**
		 * 版本号
		 */
		version: "1.0.0",
		/**
		 * 域名
		 */
//		domain: "http://192.168.0.112",  //本地环境测试
		domain: "http://139.224.133.135",  //阿里云服务器
		/**
		 * api路径地址
		 */
		api: "",
		/**
		 * 域名
		 */
		hostname: "",
		/**
		 * 路径和文件名
		 */
		pathname: "",
		/**
		 * 	端口号
		 */
		port: "",
		/**
		 * web协议
		 */
		protocol: "",
		/**
		 * 跳转新页面
		 * @param {Object} id
		 * @param {Object} url
		 * @param {Object} extras
		 */
		open: function(id, url, extras) {
			mui.openWindow({
				id: id,
				url: url,
				waiting: {
					autoShow: false
				},
				extras: extras || {}
			});
		},
		/**
		 * 加载正在加载中...提示框
		 * @param {Object} msg
		 */
		showWaiting: function(msg) {
			return plus.nativeUI.showWaiting(msg ? msg : "正在加载中...", {
				loading: {
					icon: "/images/waiting.png"
				},
				padlock: true
			});
		},
		/**
		 * 关闭正在加载中提示框
		 * @param {Object} w
		 */
		closeWaiting: function(w) {
			w.close();
		},
		/**
		 * 修改或存储用户id
		 * @param {Object} value
		 */
		setUserid: function(value) {
		 	plus.storage.setItem("userid",value);
		},
		/**
		 * 读取用户id
		 */
		getUserid: function() {
			return plus.storage.getItem("userid");
		},
		/**
		 * 修改或添加键值(key-value)对数据到应用数据存储中
		 * @param {Object} value
		 * @param {Object} key
		 */
		setValueForKey: function(value, key) {
			plus.storage.setItem(key, value);
		},
		/**
		 * 通过键(key)检索获取应用存储的值
		 * @param {Object} key
		 */
		getValueForKey: function(key) {
			return plus.storage.getItem(key);
		},
		/**
		 * 清除应用所有的键值对存储数据
		 */
		clearAllValue: function() {
			plus.storage.clear();
		},
		/**
		 * 通过key值删除键值对存储的数据
		 */
		removeValueForKey: function(key) {
			plus.storage.removeItem(key);
		},
		/**
		 * 读取所有存储的数据
		 */
		readStorageAll: function() {
			var keyNames=[];
			var values=[];
			var numKeys=plus.storage.getLength();
			for (var i = 0; i < numKeys; i++) {
				keyNames[i] = plus.storage.key(i);
				values[i] = plus.storage.getItem(keyNames[i]);
				console.log('storage共存'+numKeys+'个值,'+'第'+i+'个'+keyNames[i]+'：'+values[i]);
			}
			
		},
		/**
		 * 判断用户是否登录 
		 */
		setisLogin: function(value) {
	 		plus.storage.setItem("islong",value);
		},
		/**
		 * 读取值，如果是1表示登录，如果是0表示未登录
		 */
		getisLogin: function() {
			return plus.storage.getItem("islong");
		},
		/**
		 * 判断用户是否允许推送
		 */
		setisPush: function(value) {
	 		plus.storage.setItem("ispush",value);
		},
		/**
		 * 读取值，如果是1表示允许推送，其它表示不允许
		 */
		getisPush: function() {
			return plus.storage.getItem("ispush");
		}
		
	};
	return Common;
}));