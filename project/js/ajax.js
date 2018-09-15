function ajax(baseUrl,file){
	return new Promise((resolve,reject)=>{
		let xhr = new XMLHttpRequest();
		xhr.open("get",baseUrl+file,true);
		xhr.send();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					resolve(JSON.parse(xhr.responseText))
				}else{
					reject(xhr.status);
				}
			}
		}
	})
}