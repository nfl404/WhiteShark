function () { 
if ($("#tel").val() == "") { 
$("#tiecuo").html("<p class='user_cuwu'>手机号码不能为空！</p>"); 
$("#tel").next(".user_cuwu_icon").show();
$("#tel").focus(); 
return false; 
} 

if (!$("#tel").val().match(/^(((13[0-9]{1})|159|153)+\d{8})$/)) { 
$("#tiecuo").html("<p class='user_cuwu'>手机号码格式不正确！请重新输入！</p>"); 
$("#tel").next(".user_cuwu_icon").show();
$("#tel").focus(); 
return false; 
} 
return true; 
$("#tel").next(".user_succee").show();
} 
