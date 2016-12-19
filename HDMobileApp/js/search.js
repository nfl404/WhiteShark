$(function(){
    $(".item").click(function(){
        $(".search").val($(this).text());

    });
    $(".search_btn").click(function(){
        if($(".search").val()!=""){
            if($(".history a.item").length<=5){
                $("<a/>").text( $(".search").val()).addClass("item").appendTo($(".history .hot_content"));
            }
        }
        window.location.href="list.html";
    });
    $(".clear").click(function(){
        $(".history a.item").remove();
    });
});