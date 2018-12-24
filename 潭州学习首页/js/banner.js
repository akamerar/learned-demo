//二级菜单
$(".first-bar-con").hover(function(){
	$(this).css({"background-color":"rgba(255,255,255,0.2)"});
	$(this).find(".second-bar").show();
},function(){
	$(this).css({"background-color":"transparent"});
	$(this).find(".second-bar").hide();
});

//banner  btn显示隐藏
$(".banner-btn,.banner-wp .banner-img-wp ul li").hover(function(){
	$(".banner-btn").css({'opacity':'1'});
},function () {
	$(".banner-btn").css({'opacity':'0'});
});

//banner轮播
var time = new Date();	//控制点击频率时长
var obj = $(".banner-img-wp ul li");
var obj_btm = $(".banner-bottom ul li a");
var page = 0 ;	//图片当前页数
var interId = 0 ;	//自动轮播控制暂停
//自动轮播
/* 
var autoPlay = function (){
 	interId = setInterval(function(){
		bannerit(1);
 	},5000);
}();
 */
function autoPlay(){
	interId = setInterval(function(){
		bannerit(1);
	},5000);
};
autoPlay();
//左右按钮控制
$(".banner-btn-left").click(function () {
	if(new Date()-time>500){
		bannerit(0);
	}
	time = new Date();	
});
$(".banner-btn-right").click(function () {
	if(new Date()-time>500){
		bannerit(1);
	}
	time = new Date();	
});
//左右banner按钮函数体
function bannerit(btn_index){	
	if(btn_index==0){
		if(page==0){
			page=obj.length-1;
		}else{
			page--;
		}
	}
	if(btn_index==1){
		if(page==obj.length-1){
			page=0;
		}else{
			page++;
		}
	}
	obj.eq(page).css({"opacity":"1"}).siblings().css({"opacity":"0"});
	obj_btm.eq(page).addClass("banner-now").parent().siblings().find("a").removeClass("banner-now");
	time = new Date();
};
//底部hover控制
$(".banner-bottom ul li a").hover(function(){
	var _index = $(this).parent().index();
	page = _index;
	obj.eq(page).css({"opacity":"1"}).siblings().css({"opacity":"0"});
	$(this).addClass("banner-now").parent().siblings().find("a").removeClass("banner-now");
	clearInterval(interId);
},autoPlay);