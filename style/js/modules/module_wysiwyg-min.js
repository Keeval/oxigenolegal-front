define(["jquery",window.baseStyleJs+"/libraries/jquery.fancybox/source/jquery.fancybox.pack.js"],function(){return{init:function(){$(".gallery").initialize(function(){var i=window.innerWidth?window.innerWidth:$(window).width(),e=40;i<=600?e=20:i<=1300&&(e=30),$(".gallery a").on("click",function(i){i.preventDefault();var e=(new Date).getUTCMilliseconds();$(this).closest(".gallery").find("a").attr("rel","gallery"+e)}).fancybox({padding:0,margin:e,width:"100%",height:"100%",loop:!1,helpers:{title:{type:"float"}}})})}}});