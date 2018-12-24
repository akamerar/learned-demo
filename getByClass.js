function getByClass(classname,parent){
	parent=parent||document;
	if(parent.getElementsByClassName){
		return parent.getElementsByClassName(classname);
	}else {
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