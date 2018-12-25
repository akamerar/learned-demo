//对象 json 时间 模式  时间运动模型
function move( obj , json , time , callback , mode){         // 时间运动框架封装
	mode = mode||'linear';
	var startVal = {},endVal = {};
	for (var key in json) {
		startVal[key] = parseFloat(getAttr(obj,key));
	}
	var startTime = new Date();
	var timer = setInterval(function(){
		var t = new Date() - startTime;
		var d = time;
		for (var key in json) {
			var b = startVal[key];
			var c = parseFloat(json[key]) - startVal[key];
			if(t>=d){
				t=d;
				clearInterval(timer);
			}
			if(isNaN(json[key])){
				obj.style[key] = Tween[mode](t,b,c,d) + 'px';
			}else{
				obj.style[key] = Tween[mode](t,b,c,d);
			}
		}	
		if(t==d&&callback){
			callback.call(obj);
		}
	},13);		
	function getAttr( obj , attr ){
		return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
	} 
}
//t经过了多长时间 b初始值 c总变化量 d总时间
var Tween = {
linear: function (t, b, c, d){  //匀速
	return c*t/d + b;
},
easeIn: function(t, b, c, d){  //加速曲线
	return c*(t/=d)*t + b;
},
easeOut: function(t, b, c, d){  //减速曲线
	return -c *(t/=d)*(t-2) + b;
},
easeBoth: function(t, b, c, d){  //加速减速曲线
	if ((t/=d/2) < 1) {
		return c/2*t*t + b;
	}
	return -c/2 * ((--t)*(t-2) - 1) + b;
},
easeInStrong: function(t, b, c, d){  //加加速曲线
	return c*(t/=d)*t*t*t + b;
},
easeOutStrong: function(t, b, c, d){  //减减速曲线
	return -c * ((t=t/d-1)*t*t*t - 1) + b;
},
easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
	if ((t/=d/2) < 1) {
		return c/2*t*t*t*t + b;
	}
	return -c/2 * ((t-=2)*t*t*t - 2) + b;
},
elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
	if (t === 0) { 
		return b; 
	}
	if ( (t /= d) == 1 ) {
		return b+c; 
	}
	if (!p) {
		p=d*0.3; 
	}
	if (!a || a < Math.abs(c)) {
		a = c; 
		var s = p/4;
	} else {
		var s = p/(2*Math.PI) * Math.asin (c/a);
	}
	return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
},
elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
	if (t === 0) {
		return b;
	}
	if ( (t /= d) == 1 ) {
		return b+c;
	}
	if (!p) {
		p=d*0.3;
	}
	if (!a || a < Math.abs(c)) {
		a = c;
		var s = p / 4;
	} else {
		var s = p/(2*Math.PI) * Math.asin (c/a);
	}
	return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
},    
elasticBoth: function(t, b, c, d, a, p){
	if (t === 0) {
		return b;
	}
	if ( (t /= d/2) == 2 ) {
		return b+c;
	}
	if (!p) {
		p = d*(0.3*1.5);
	}
	if ( !a || a < Math.abs(c) ) {
		a = c; 
		var s = p/4;
	}
	else {
		var s = p/(2*Math.PI) * Math.asin (c/a);
	}
	if (t < 1) {
		return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	}
	return a*Math.pow(2,-10*(t-=1)) * 
			Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
},
backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
	if (typeof s == 'undefined') {
	   s = 1.70158;
	}
	return c*(t/=d)*t*((s+1)*t - s) + b;
},
backOut: function(t, b, c, d, s){
	if (typeof s == 'undefined') {
		s = 3.70158;  //回缩的距离
	}
	return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
}, 
backBoth: function(t, b, c, d, s){
	if (typeof s == 'undefined') {
		s = 1.70158; 
	}
	if ((t /= d/2 ) < 1) {
		return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
	}
	return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
},
bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
	return c - Tween['bounceOut'](d-t, 0, c, d) + b;
},       
bounceOut: function(t, b, c, d){
	if ((t/=d) < (1/2.75)) {
		return c*(7.5625*t*t) + b;
	} else if (t < (2/2.75)) {
		return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
	} else if (t < (2.5/2.75)) {
		return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
	}
	return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
},      
bounceBoth: function(t, b, c, d){
	if (t < d/2) {
		return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
	}
	return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
}
};
//给元素节点移除class 兼容
function removeClass(obj,cname){
	if(obj.className==''){
		return -1;
	}else{
		var arr = obj.className.split(' ');
		var arrCname = cname.split(' ');
		for(var i=arr.length-1;i>=0;i--){
			for(var j=arrCname.length-1;j>=0;j--){
				if(arr[i]==arrCname[j]){
					arr.splice(i,1);
					break;
				}	
			}
			if(i==0||arr.length==0){
				if(arr.length==0){
					obj.className = '';
				}else{
					cname = arr.join(' ');
					obj.className = cname;
					return cname;
				}
			}	
		}
	}
};
//给元素节点添加class 兼容
function addClass(obj,cname){
	if(obj.className==''){
		obj.className = cname;
		return cname;
	}else{
		var arr = obj.className.split(' ');
		var arrCname = cname.split(' ');
		for(var i=0;i<arr.length;i++){
			for(var j=arrCname.length-1;j>=0;j--){
				if(arr[i]==arrCname[j]){
					arrCname.splice(j,1);
				}
			}
			if(i==arr.length-1||arrCname.length==0){
				if(arrCname.length==0){
					return -1;
				}else{
					cname = arrCname.join(' ');
					obj.className += ' '+cname;
					return cname;
				}
			}
		}
	}
};
//通过classname获取元素节点 兼容ie
function getElementByClass(classname,parent){
	parent=parent||document;
	if(document.getElementsByClassName){
		return parent.getElementsByClassName(classname);
	}else{
		var all = parent.getElementsByTagName('*');
		var arr =[];
		var arr1 = [];
		for(var i = 0 ; i < all.length ; i++){
			arr1 = all[i].className.split(' ');
			for(var j=0;j<arr1.length;j++){
				if(arr1[j]==classname){
					arr.push(all[i]);
				};
			};
		};
		return arr;
	}
}
//返回第一个元素子节点 兼容ie
function firstC(obj){
	return obj.firstElementChild!==undefined?obj.firstElementChild:obj.firstChild;
};

//返回同级下一个元素节点 兼容ie
function nextS(obj){
	return obj.nextElementSibling!==undefined?obj.nextElementSibling:obj.nextSibling;
};

//元素同级所有不包含自己 兼容ie
function siblings(obj){
	var parentC = obj.parentNode.children;
	var arr = [];
	for(var i=0;i<parentC.length;i++){
		if(obj!=parentC[i]){
			arr.push(parentC[i]);
		}
	};
	return arr;
};
//获取当前浏览器页面宽度
function getDocumentWidth(){
	var val = document.documentElement.clientWidth||window.innerWidth;
	return val;
};
//获取当前浏览器页面高度
function getDocumentHeight(){
	var val = document.documentElement.clientHeight||window.innerHeight;
	return val;
};
//获取当前页面滚动高度
function getScrollHeight(){
	var val = document.documentElement.scrollTop||document.body.scrollTop;
	return val;
};
//获取当前页面滚动宽度
function getScrollWidth(){
	var val = document.documentElement.scrollLeft||document.body.scrollLeft;
	return val;
};
//元素到文档body/浏览器窗口的距离
function getOffsetBody(obj){
	var top = 0;
	var left = 0;
	while (obj!=document.body) {
		top += obj.offsetTop;
		left += obj.offsetLeft;
		obj=obj.offsetParent;
	};
	return {
		top:top,
		left:left
	};
};
//元素到页面距离（加上滚动条）
function getOffsetPage(obj){
	var scrollTop = getScrollHeight();
	var scrollLeft = getScrollWidth();
	return {
		top:getOffsetBody(obj).top-scrollTop,
		left:getOffsetBody(obj).left-scrollLeft
	};
};

//添加绑定事件
function bind(obj,eventName,eventFn,booleans){
	//三目表示
	booleans = booleans||false;
	if(obj.attachEvent){
		obj.bindFn?obj.bindFn.push({bool:eventFn}):obj.bindFn=[{bool:eventFn}];
		obj.bindFn[obj.bindFn.length-1].fn=function(){
			eventFn.call(obj);
		};
		obj.attachEvent('on'+eventName,obj.bindFn[obj.bindFn.length-1].fn);
	}else{
		obj.addEventListener(eventName, eventFn, booleans);
	}
	
	/*
	if(obj.attachEvent){
		//ie内部
		obj.attachEvent('on'+eventName,function(){
			eventFn.call(obj);
		});
	}else{
		//其他浏览器
		obj.addEventListener(eventName, eventFn, false);
	}
	*/
};
//解绑事件
function unbind(obj,eventName,eventFn,booleans){
	booleans = booleans||false;
	if(obj.attachEvent){
		for (var i = 0; i < obj.bindFn.length; i++) {
			if(eventFn==obj.bindFn[i].bool){
				eventFn=obj.bindFn[i].fn;
			}
		};
		obj.detachEvent('on'+eventName,eventFn);
	}else{
		obj.removeEventListener(eventName,eventFn,booleans);
	}
};

/*ajax封装
	@调用方法
	ajax({
		method:'get',
		url:'xxx.text',
		data:{
			user:yangtong,
			age:20,
			...
		},
		aysn:true,
		success:function(responseText){},
		error:function(status){}
	});
*/
function ajax(mJson){
	var method = mJson.method || 'get';
	var url = mJson.url;
	var data = '';
	var aysn = mJson.aysn || true;
	var success = mJson.success;
	var error = mJson.error;

	if(mJson.data){
		var arr = [];
		for (var key in mJson.data) {
			arr.push(key+'='+mJson.data[key]);
		}
		data = arr.join('&');
	}

	if(data&&method.toLowerCase()=='get'){
		url += '?' + data;
	}

	var xhr = new XMLHttpRequest();
	xhr.open(method,url,aysn);
	xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
	xhr.send(data);
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4){
			if(xhr.status>=200&&xhr.status<300){
				success && success(xhr.responseText);
			}else{
				error && error(xhr.status);
			}
		}
	};
}
//克隆对象(不能对函数生效)
function Clone(obj){
	for(var key in obj){
		this[key] = typeof obj[key] == 'object'?new Clone(obj[key]):obj[key];
	};
}