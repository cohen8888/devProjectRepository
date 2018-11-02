(function(doc,win){
	let docEle = doc.documentElement;
	let width = docEle.clientWidth;
	docEle.style.fontSize = 100*(width/3200)+"px";
})(document,window);
