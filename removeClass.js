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