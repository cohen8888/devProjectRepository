/**
* author : Cohen.Lee
* date : 2018-09-03
* 
*/

baseUrl = baseUrl + "/api/";

/**
* 生成表格数据
*
*/
function generateTableData(rootElem, data, eventCallBack){
	for(var i = 0, len = data.length; i < len; i++){
		var tr = $('<tr></tr>');
		tr.attr("data-mydata", data[i]);
		tr.append('<td>'+data[i]['codeNum']+'</td>')
		  .append('<td>'+data[i]['equipmentName']+'</td>')
		  .append('<td>'+data[i]['equipmentType']+'</td>')
		  .append('<td>'+data[i]['equipmentCurrentStatus']+'</td>')
		  .append('<td>'+data[i]['lastStopDatetime']+'</td>')
		  .append('<td>'+data[i]['thisRuntime']+'</td>')
		  .append('<td>'+data[i]['cumulativeRuntime']+'</td>');
		rootElem.append(tr);
	}
	rootElem.on('click', eventCallBack);
}


$(function(){
	setLink($(".header_left img"));
	currentDateObj = $('.timeText');
	timingDate();
	ajax(baseUrl,"devicerunstatus").then(res => {
		let str1 = "";
		generateTableData($(".tb1 tbody"), res.data.otherData, function(event){
			var e = event || window.event;
			var target = e.target || window.event.srcElement;
			e.stopPropagation();
			var data = $(target).parent().children();
			//填充数据
			var ps = $('#rundev1').children();
			ps.eq(0).html(data.eq(0).html() + '&nbsp;' + data.eq(1).html() + '&nbsp;[' + data.eq(2).html() + ']');
			ps.eq(2).html(data.eq(5).html());
			ps.eq(4).html(data.eq(6).html());
			ps.eq(5).html(data.eq(4).html());

			var ps = $('#rundev2').children();
			ps.eq(0).html(data.eq(0).html() + '&nbsp;' + data.eq(1).html() + '&nbsp;[' + data.eq(2).html() + ']');
			ps.eq(2).html(data.eq(5).html());
			ps.eq(4).html(data.eq(6).html());
			ps.eq(5).html(data.eq(4).html());
		});
	})
});	//jquery ready end;