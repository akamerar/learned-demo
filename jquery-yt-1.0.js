/*
	@version : jquery-yt-1.0.js
	@author : 四川农业大学 杨桐
	@声明：学习交流使用 非商业用途
	@phone：18728190518
*/
!function (){
	window.$ = $;
	//接口函数
	function $(para){
		var typeP = (typeof para).toLowerCase();
		//当参数是字符串或object时
		if(typeP=='string'||typeP=='object'){
			return new Init(para);
		}
	};
	//JQ对象的构造函数
	function Init(para){
		/*创建jq对象this*/
		this.init(para);
	};
	Init.prototype = {
		//init 通过参数找js对象 返回一个存储JS对象的数组
		init:function(para){
			var tp = (typeof para).toLowerCase();
			if(tp=='string'){
				var arrPara = para.split(' ');
				var arrParaL = arrPara.length;
				var arr = document;
				for(var i=0;i<arrParaL;i++){
					arr = search(arr,arrPara[i]);
				}
			}
			//如果创建jq对象时是object
			else if(tp=='object'){
				if(para.length!=undefined){
					for(var i=0;i<para.length;i++){
						arr.push(para[i]);
					}
				}else{
					arr.push(para);
				}
			}
			function search(obj,target){
				var obj = obj;
				var arr = [];
				var target = target;
				var tf = target.charAt(0);
				switch (tf) {
					case '.':
					    arr = getArr('.',arr,target,obj);
						break;
					case '#':
						arr = getArr('#',arr,target,obj);
					default:
					    arr = getArr('',arr,target,obj);
						break;
				}
				return arr;
			}
			function getArr(str,arr,target,obj){
				if( str == '.' ){
					target = target.replace(/\./,'');
				}else if( str == '#'){
					target = target.replace(/#/,'');
					obj = document.getElementById(target);
					arr.push(obj);
					return arr;
				}
				var newObj = [];
			  	var newObjL = 0;
			  	if(obj==document){
			  		if(str=='.'){
			  			newObj = getElementsByClass(target,obj);
			  		}else{
						newObj = obj.getElementsByTagName(target);
			  		}
			   		newObjL = newObj.length;
			  		for(var i=0;i<newObjL;i++){
						arr.push(newObj[i]);
			  		}
			  	}else{
			  		var objL = obj.length;
			  		for(var i=0;i<objL;i++){
			  			if(str=='.'){
			  				newObj = getElementsByClass(target,obj[i]);
			  			}else{
			  				newObj = obj[i].getElementsByTagName(target);
			  			}
			  			newObjL = newObj.length;
			  			for(var j=0;j<newObjL;j++){
			  				arr.push(newObj[j]);
			  			}
			  		}
			  	}
			  	return arr;
			}
			//getclass
			function getElementsByClass(classname,parent){
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
			//去重
			for(var i=0;i<arr.length;i++){
				for(var j=arr.length;j>i;j--){
					if(arr[j]==arr[i]){
						arr.splice(j,1);
					}
				}
			};
			var l = arr.length;
			for(var i=0;i<l;i++){
				this[i] = arr[i];
			}
			this.length = l;
		},
		//css
		css:function(){
			//不定参
			var arg = arguments;
			//如果是两个参数
			if(arg.length==2){
				this.each(function(){
					this.style[arg[0]] = arg[1];
				});			
				return this;
			}
			//如果是一个参数
			else if(arg.length==1){
				var typeO = (typeof arg[0]).toLowerCase();
				//如果是json
				if(typeO=='object'){
					this.each(function(){
						for(var key in arg[0]){
							this.style[key] = arg[0][key];
						}
					});
					return this;
				}else{
				//如果是字符串
					return this[0].currentStyle?this[0].currentStyle[arg[0]]:getComputedStyle(this[0])[arg[0]];
				}
			}
		},
		//eq
		eq:function(index){
			//通过选中的js对象从而返回一个Jq对象
			return $(this[index]);
		},
		//返回jq对象中js对象的个数
		size:function(){
			return this.length;
		},
		//返回第index个js对象
		get:function(index){
			return this[index];
		},
		//对jq对象中的每个js对象进行操作
		each:function(fn){
			for(var i=0;i<this.length;i++){
				fn.call(this[i],i);
			}
			// return this;
		},
		//改变或返回jq对象中js对象的innerHTML值
		html:function(str){
			if(str){
				this.each(function(){
					this.innerHTML = str;
				});		
				return this;
			}else{
				return this[0].innerHTML;
			}
		},
		//改变或返回jq对象中js对象的innerText值
		text:function(str){
			if(str){
				this.each(function(){
					this.innerText = str;
				});
				return this;
			}else{
				var str = '';
				this.each(function(){
					str += this.innerText;
				});		
				return str;
			}
		},
		//attr
		attr:function(){
			var arg = arguments;
			if(arg.length==1){
				var typeP = (typeof arg[0]).toLowerCase();
				if(typeP=='object'){
					this.each(function(){
						for(var key in arg[0]){
							this.setAttribute(key,arg[0][key]);
						}
					});
					return this;
				}else if(typeP=='string'){
					return this[0].getAttribute(arg[0]);
				}
			}else if(arg.length==2){
				this.each(function(){
					this.setAttribute(arg[0], arg[1]);
				});
				return this;
			}
		},
		//removeAttr
		removeAttr:function(para){
			this.each(function(){
				this.removeAttribute(para);
			});
			return this;
		},
		//prop
		prop:function(){
			var arg = arguments;
			if(arg.length==1){
				var typeP = (typeof arg[0]).toLowerCase();
				if(typeP=='object'){
					this.each(function(){
						for(var key in arg[0]){
							if(key.toLowerCase()=='class'){
								key='className';
							}
							this[key] = arg[0][key];
						}
					});
					return this;
				}else if(typeP=='string'){
					if(arg[0].toLowerCase()=='class'){
						arg[0]='className';
					}
					return this[0][arg[0]];
				}
			}else if(arg.length==2){
				if(arg[0].toLowerCase()=='class'){
					arg[0]='className';
				}
				this.each(function(){
					this[arg[0]] = arg[1];
				});
				return this;
			}
		},
		//removeProp
		removeProp:function(para){
			this.removeAttr(para);
			return this;
		},
		//addClass
		addClass:function(para){
			var typeP = typeof para;
			if(typeP.toLowerCase() == 'string'&& para.length!=0){
				var arrPara = para.split(' ');
				var arrParaL = arrPara.length;
				this.each(function(){
					thisClass = this.className;
					for(var i=0;i<arrParaL;i++){
						if(thisClass==''){
							this.className = arrPara[i];
						}else{
							var arrClass = thisClass.split(' ');
							var al = arrClass.length;
							var offon = true;//控制添加开关
							for(var j=0;j<al;j++){
								if(arrPara[i]==arrClass[j]){
									offon = false;
									break;
								}
							}
							if(offon){
								this.className += ' ' + arrPara[i];
							}
						}
					}
				});
			}
			return this;
		},
		//removeClass
		removeClass:function(para){
			var typeP = typeof para;
			if(typeP.toLowerCase()=='string'&&para.length!=0){
				var arrPara = para.split(' ');
				var arrParaL = arrPara.length;
				this.each(function(){
					var thisClass = this.className;
					var arrClass = thisClass.split(' ');
					var al = arrClass.length;
					for(var i=0;i<arrParaL;i++){
						for(var j=al-1;j>=0;j--){
							if(arrPara[i]==arrClass[j]){
								arrClass.splice(j,1);
							}
						}
					}
					this.className = arrClass.join(' ');	
				});
			}
			return this;
		},
		//toggleClass
		toggleClass:function(para){
			var typeP = typeof para;
			if(typeP.toLowerCase()=='string'&&para.length!=0){
				var arrPara = para.split(' ');
				var arrParaL = arrPara.length;
				this.each(function(){
					var thisClass = this.className;
					var arrClass = thisClass.split(' ');
					var al = arrClass.length;
					/*正则实现*/
					for(var i=0;i<arrParaL;i++){
						var reg = new RegExp('(^|\\s)'+arrPara[i]+'($|\\s)');
						reg.test(thisClass)?$(this).removeClass(arrPara[i]):$(this).addClass(arrPara[i]);
					}
					/*
					for循环实现
					for(var i=0;i<arrParaL;i++){
						var offon = true;
						for(var j=al-1;j>=0;j--){
							if(arrPara[i]==arrClass[j]){
								offon = false;
								arrClass.splice(j,1);
							}
						}
						if(offon){
							arrClass.push(arrPara[i]);
						}
					}
					this.className = arrClass.join(' ');
					*/
				});
			}
			return this;
		},
		//val
		val:function(para){
			if(para){
				this.each(function(){
					this.value = para;
				});
				return this;
			}else{
				return this[0].value;
			}
		},
		//width
		width:function(para){
			if(para){
				this.each(function(){
					this.style.width = para + 'px';
				});
				return this;
			}else{
				return parseFloat(this.css('width'));
			}
		},
		//height
		height:function(para){
			if(para){
				this.each(function(){
					this.style.height = para + 'px';
				});
				return this;
			}else{
				return parseFloat(this.css('height'));
			}
		},
		//innerWidth
		innerWidth:function(para){
			if(para){
				this.each(function(){
					this.style.width = para - parseFloat($(this).css('paddingLeft')) - parseFloat($(this).css('paddingRight')) + 'px';
				});
			}else{
				return this[0].clientWidth;
			}
		},
		//innerHeight
		innerHeight:function(para){
			if(para){
				this.each(function(){
					this.style.height = para - parseFloat($(this).css('paddingTop')) - parseFloat($(this).css('paddingBottom')) + 'px';
				});
			}else{
					return this[0].clientHeight;
			}
		},
		//outerWidth
		outerWidth:function(para){
			if(para){
				this.each(function(){
					this.style.width = para - parseFloat($(this).css('paddingLeft')) - parseFloat($(this).css('paddingRight')) - parseFloat($(this).css('borderLeft')) - parseFloat($(this).css('borderRight')) + 'px';
				});
			}else{
				return this[0].offsetWidth;
			}
		},
		//outerHeight
		outerHeight:function(para){
			if(para){
				this.each(function(){
					this.style.width = para - parseFloat($(this).css('paddingTop')) - parseFloat($(this).css('paddingBottom')) - parseFloat($(this).css('borderTop')) - parseFloat($(this).css('borderBottom')) + 'px';
				});
			}else{
				return this[0].offsetHeight;
			}
		},
		//hasClass
		hasClass:function(para){
			var typeP = typeof para;
			if(typeP.toLowerCase()=='string'&&para.length!=0){
				var arrPara = para.split(' ');
				var arrParaL = arrPara.length;
				var reg = [];
				for(var i=0;i<arrParaL;i++){
					reg[i] = new RegExp('(^|\\s)'+arrPara[i]+'($|\\s)');
				}
				for(var j=0;j<this.length;j++){
					var thisClass = this[j].className;
					var all = 0;
					for(var i=0;i<arrParaL;i++){
						if(reg[i].test(thisClass)){				
							all++;
							console.log(all+' '+arrParaL);
						}
					}
					if(all==arrParaL){
						return true;
					}	
				};
				return false;
			}
		},
		//children  直接子元素
		children:function(para){
			var arr = [];
			if(para){
				var $all = $(para);
				var allL = $all.length;
				this.each(function(){
					for(var i=0;i<allL;i++){
						if($all[i].parentNode==this){
							arr.push($all[i]);
						}
					}
				});
			}else{
				this.each(function(){
					for(var i=0;i<this.children.length;i++){
						arr.push(this.children[i]);
					};
				});
			}
			return $(arr);
		},
		//parent
		parent:function(para){
			var arr = [];
			if(para){
				var $all = $(para);
				var allL = $all.length;
				this.each(function(){
					for(var i=0;i<allL;i++){
						if($all[i]==this.parentNode){
							arr.push($all[i]);
						}
					}
				});
			}else{
				this.each(function(){
					arr.push(this.parentNode);
				});
			}
			//去重
			for(var i=0;i<arr.length;i++){
				for(var j=arr.length;j>i;j--){
					if(arr[j]==arr[i]){
						arr.splice(j,1);
					}
				}
			}
			return $(arr);
		},
		//parents
		parents:function(para){
			var arr = [];
			this.each(function(){
				var obj = this;
				while (obj!=document.documentElement) {
					obj = obj.parentNode;
					arr.push(obj);
				}
			});
			//去重
			for(var i=0;i<arr.length;i++){
				for(var j=arr.length;j>i;j--){
					if(arr[j]==arr[i]){
						arr.splice(j,1);
					}
				}
			}
			if(para){
				var $all = $(para);
				var allL = $all.length;
				var offon = true;
				for(var i=0;i<arr.length;i++){
					for(var j=0;j<allL;j++){
						if(arr[i]==$all[j]){
							arr = []
							arr.push($all[i]);
							offon = false
							break;
						}
					}
				}
				if(offon){
					arr = [];
				}
			}
			return $(arr);
		},
		//find
		find:function(para){
			var arr = [];
			var $all = $(para);
			var allL = $all.length;
			for(var j=0;j<this.length;j++){
				for(var i=0;i<allL;i++){
					if($($all[i]).parents(this[j]).length!=0){
						arr.push($all[i]);
					}
				}
			};
			//去重
			for(var i=0;i<arr.length;i++){
				for(var j=arr.length;j>i;j--){
					if(arr[j]==arr[i]){
						arr.splice(j,1);
					}
				}
			}
			return $(arr);
		},
		//siblings
		siblings:function(para){
			var arr = [];
			this.each(function(){
				var sib = this.parentNode.children;
				var sibL = sib.length;
				for(var i=0;i<sibL;i++){
					if(sib[i]!=this){
						arr.push(sib[i]);
					}
				}
			});
			if(para){
				var newArr = [];
				var $all = $(para);
				var allL = $all.length;
				var arrL = arr.length;
				for(var i=0;i<allL;i++){
					for(var j=0;j<arrL;j++){
						if($all[i]==arr[j]){
							newArr.push(arr[j]);
						}
					}
				}
				arr = newArr;
			}
			//去重
			for(var i=0;i<arr.length;i++){
				for(var j=arr.length;j>i;j--){
					if(arr[j]==arr[i]){
						arr.splice(j,1);
					}
				}
			}
			return $(arr);
		},
	};
}();