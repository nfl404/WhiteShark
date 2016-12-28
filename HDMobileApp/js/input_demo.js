	$(".user_cuwu_icon").hide();
			$(".user_succee").hide();
			$("#tel").focus(function(){
				if ($("#tel").val() == "") { 
				$("#tiecuo").html("<p class='user_cuwu'>手机号码不能为空！</p>"); 
				$("#tel").parent().children(".user_cuwu_icon").show();
				$(".user_succee").hide();
				$("#tel").focus(); 
				return false; 
				} 
				if (!$("#tel").val().match( /^1[3458]\d{9}$/)) { 
				$("#tiecuo").html("<p class='user_cuwu'>手机号码格式不正确！请重新输入！</p>"); 
				$("#tel").next(".user_cuwu_icon").show();
				$(".user_succee").hide();
				$("#tel").focus(); 
				return false; 
				} 
				$("#tel").parent().children(".user_cuwu_icon").hide();
				$("#tiecuo").children(".user_cuwu").hide();
				$("#tel").parent().children(".user_succee").show();
				return true; 
			});
