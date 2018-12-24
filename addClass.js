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