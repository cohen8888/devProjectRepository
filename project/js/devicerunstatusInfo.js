/**
* author : Cohen.Lee
* date : 2018-09-03
* 
*/

$(function(){
	let rem = document.documentElement.style.fontSize.substr(0,document.documentElement.style.fontSize.length-2)*1;
	let baseUrl = "http://localhost:3000/api/";
	ajax(baseUrl,"devicerunstatus").then(res=>{
		console.log(res);
		let str1 = "";
		res.data.forEach((item,index)=>{
				str1+="<tr>"
				str1+="<td>"+item.codeNum+"</td>";
				str1+="<td>"+item.equipmentName+"</td>";
				str1+="<td>"+item.equipmentType+"</td>";
				str1+="<td>"+item.equipmentCurrentStatus+"</td>";
				str1+="<td>"+item.lastStopDatetime+"</td>";				
				str1+="<td>"+item.thisRuntime+"</td>";
				str1+="<td>"+item.cumulativeRuntime+"</td>";
				str1+="</tr>";
		})
		$(".tb1 tbody").html(str1);
	})
});	//jquery ready end;