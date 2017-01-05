	mui.init();
		(function($) {
			//$.init();
			$.plusReady(function() {
				var settings = app.getSettings();
				var lockStateButton = document.getElementById("lockState");
				var locker = document.querySelector('.mui-locker');
				lockStateButton.classList[settings.gestures ? 'add' : 'remove']('mui-active')
				lockStateButton.addEventListener('toggle', function(event) {
					var isActive = event.detail.isActive;
					if (isActive) {
//						common.setisPush("1");
						alert("允许推送"+isActive);
						
					}
				}, false);
			});
		}(mui));
	
	
	
		//初始化单页view
		var viewApi = mui('#app').view({
			defaultPage: '#setting'
		});
		//初始化单页的区域滚动
		mui('.mui-scroll-wrapper').scroll();
		//分享操作
		var shares = {};
		
		setTimeout(function () {
//			defaultImg();
			setTimeout(function() {
				initImgPreview();
			}, 300);
		},500);
		
		var view = viewApi.view;
		(function($) {
			//处理view的后退与webview后退
			var oldBack = $.back;
			$.back = function() {
				if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
					viewApi.back();
				} else { //执行webview后退
					oldBack();
				}
			};
			//监听页面切换事件方案1,通过view元素监听所有页面切换事件，目前提供pageBeforeShow|pageShow|pageBeforeBack|pageBack四种事件(before事件为动画开始前触发)
			//第一个参数为事件名称，第二个参数为事件回调，其中e.detail.page为当前页面的html对象
			view.addEventListener('pageBeforeShow', function(e) {
				//				console.log(e.detail.page.id + ' beforeShow');
			});
		})(mui);
		//更换头像
		mui(".mui-table-view-cell").on("tap", "#head", function(e) {
			if(mui.os.plus){
				var a = [{
					title: "拍照"
				}, {
					title: "从手机相册选择"
				}];
				plus.nativeUI.actionSheet({
					title: "修改头像",
					cancel: "取消",
					buttons: a
				}, function(b) {
					switch (b.index) {
						case 0:
							break;
						case 1:
							getImage();
							break;
						case 2:
							galleryImg();
							break;
						default:
							break
					}
				})	
			}
			
		});

		function getImage() {
			var c = plus.camera.getCamera();
			c.captureImage(function(e) {
				plus.io.resolveLocalFileSystemURL(e, function(entry) {
					var s = entry.toLocalURL() + "?version=" + new Date().getTime();
					console.log(s);
					document.getElementById("head-img").src = s;
					document.getElementById("head-img1").src = s;
					document.getElementById("img").src = s;
					//变更大图预览的src
					//目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现
					document.querySelector("#__mui-imageview__group .mui-slider-item img").src = s + "?version=" + new Date().getTime();;;
				}, function(e) {
					console.log("读取拍照文件错误：" + e.message);
				});
			}, function(s) {
				console.log("error" + s);
			}, {
				filename: "_doc/head.jpg"
			})
		}

		function galleryImg() {
			plus.gallery.pick(function(a) {
				plus.io.resolveLocalFileSystemURL(a, function(entry) {
					plus.io.resolveLocalFileSystemURL("_doc/", function(root) {
						root.getFile("head.jpg", {}, function(file) {
							//文件已存在
							file.remove(function() {
								console.log("file remove success");
								entry.copyTo(root, 'head.jpg', function(e) {
										var e = e.fullPath + "?version=" + new Date().getTime();
										document.getElementById("head-img").src = e;
										document.getElementById("head-img1").src = e;
										document.getElementById("img").src = e;
										//变更大图预览的src
										//目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现
										document.querySelector("#__mui-imageview__group .mui-slider-item img").src = e + "?version=" + new Date().getTime();;
									},
									function(e) {
										console.log('copy image fail:' + e.message);
									});
							}, function() {
								console.log("delete image fail:" + e.message);
							});
						}, function() {
							//文件不存在
							entry.copyTo(root, 'head.jpg', function(e) {
									var path = e.fullPath + "?version=" + new Date().getTime();
									document.getElementById("head-img").src = path;
									document.getElementById("head-img1").src = path;
									//变更大图预览的src
									//目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现
									document.querySelector("#__mui-imageview__group .mui-slider-item img").src = path;
								},
								function(e) {
									console.log('copy image fail:' + e.message);
								});
						});
					}, function(e) {
						console.log("get _www folder fail");
					})
				}, function(e) {
					console.log("读取拍照文件错误：" + e.message);
				});
			}, function(a) {}, {
				filter: "image"
			})
		};

//		function defaultImg() {
//			if(mui.os.plus){
//				plus.io.resolveLocalFileSystemURL("_doc/head.jpg", function(entry) {
//					var s = entry.fullPath + "?version=" + new Date().getTime();;
//					document.getElementById("head-img").src = s;
//					document.getElementById("head-img1").src = s;
//				}, function(e) {
//					document.getElementById("head-img").src = '../images/logo.png';
//					document.getElementById("head-img1").src = '../images/logo.png';
//				})
//			}else{
//				document.getElementById("head-img").src = '../images/logo.png';
//				document.getElementById("head-img1").src = '../images/logo.png';
//			}
//			
//		}
		document.getElementById("head-img1").addEventListener('tap', function(e) {
			e.stopPropagation();
		});

		function initImgPreview() {
			var imgs = document.querySelectorAll("img.mui-action-preview");
			imgs = mui.slice.call(imgs);
			if (imgs && imgs.length > 0) {
				var slider = document.createElement("div");
				slider.setAttribute("id", "__mui-imageview__");
				slider.classList.add("mui-slider");
				slider.classList.add("mui-fullscreen");
				slider.style.display = "none";
				slider.addEventListener("tap", function() {
					slider.style.display = "none";
				});
				slider.addEventListener("touchmove", function(event) {
					event.preventDefault();
				})
				var slider_group = document.createElement("div");
				slider_group.setAttribute("id", "__mui-imageview__group");
				slider_group.classList.add("mui-slider-group");
				imgs.forEach(function(value, index, array) {
					//给图片添加点击事件，触发预览显示；
					value.addEventListener('tap', function() {
						slider.style.display = "block";
						_slider.refresh();
						_slider.gotoItem(index, 0);
					})
					var item = document.createElement("div");
					item.classList.add("mui-slider-item");
					var a = document.createElement("a");
					var img = document.createElement("img");
					img.setAttribute("src", value.src);
					a.appendChild(img)
					item.appendChild(a);
					slider_group.appendChild(item);
				});
				slider.appendChild(slider_group);
				document.body.appendChild(slider);
				var _slider = mui(slider).slider();
			}
		}
		
		if(mui.os.stream){
			document.getElementById("check_update").display = "none";
		}