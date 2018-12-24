function searchstr(str,target){
	var a = 0;
	var newStr = '';
	var x = 0;
	do{
		x = str.indexOf(target,a);
		if(x!=-1){
			newStr += x +' ';	
		}
		a = x + 1;
	} while (a!=0);
	return newStr;
}