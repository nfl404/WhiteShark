$(function() {
	$(".item").click(function() {
		$(".search").val($(this).text());

	});
	$(".search_btn").click(function() {
		if($(".search").val() != "") {
			var keyWorld =  $(".search").val();
			mui.openWindow({
				url: 'searchResult.html',
				styles: {
					popGesture: 'close',
				},
				extras: {
					keyWord: keyWorld
				},
				createNew: true //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			});
		} else {
			mui.toast('请输入搜索关键词...');
		}

	});
	$(".clear").click(function() {
		$(".history a.item").remove();
	});
});