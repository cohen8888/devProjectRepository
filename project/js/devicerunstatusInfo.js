/**
* author : Cohen.Lee
* date : 2018-09-03
* 
*/

//baseUrl = baseUrl + "interf03";
baseUrl = baseUrl + "/api/devicerunstatus";
let searchCatagoryResult = [];
let availableTags = [];
let cacheData = [];
let pageSize = 16;
let isFisrt = true;
let getDataTimeInterval = 100000;		//设置获取数据的时间间隔
/**
*  渲染数据列表
*/
function renderListData(rootElem, datas, eventCallBack){
	let str = "";
	rootElem.children().remove();
	console.log(datas);
	datas.slice(0, pageSize).forEach((item,index)=>{
		str+="<tr>"
		str+="<td>"+item.codeNum+"</td>";
		str+="<td>"+item.equipmentName+"</td>";
		str+="<td>"+item.equipmentType+"</td>";
		str+="<td>"+item.equipmentCurrentStatus+"</td>";
		str+="<td>"+item.lastStopDatetime+"</td>";
		str+="<td>"+item.thisRuntime+"</td>";
		str+="<td>"+item.cumulativeRuntime+"</td>";
		str+="</tr>";
	})
	rootElem.html(str);
	rootElem.on('click', eventCallBack);
}


//设备类型下拉列表内容填充
function optEquipType(categoryInfo, equipmentTypeElem){
	equipmentTypeElem.children().remove();
	equipmentTypeElem.append('<option value="default" >--设备类别--</option>')
	for(category in categoryInfo){
		equipmentTypeElem.append('<option value="' + category + '" >'+ category +'</option>')
	}
}
//计算设备类型数量
function calcCavnasData(data){
	let key = {};
	if (typeof data == 'object' && data instanceof Array){
		for(let i = 0; i < data.length;i++){
			if(data[i]['equipmentType'] in key){
				key[data[i]['equipmentType']]++;
			}else{
				key[data[i]['equipmentType']] = 1;
			}
		}
	}
	return key;
}

/**
*
* 获取设备名称列表
*/
function getEquipmentName(datas){
	var result = [];
	for(var i = 0, len = datas.length; i < len; i++){
		result.push(datas[i]['equipmentName']);
	}
	return result;
}

/**
* 根据关键字过滤数据，按照设备名的关键字进行查询
*/
function filterData(findKey){
	if(!(cacheData == null && findKey == null )){
		let tmpData = [];
		for(var i = 0, len = cacheData.length; i < len; i++){
			if((findKey == cacheData[i]['codeNum']) || findKey == cacheData[i]['equipmentName']){
				tmpData.push(cacheData[i]);
			}
		}
		renderListData($(".tb1 tbody"), tmpData);
	}
}

let eventClick = function(event){
	var e = event || window.event;
	var target = e.target || window.event.srcElement;
	e.stopPropagation();
	var data = $(target).parent().children();
	if (isFisrt){
		//填充数据
		var ps = $('#rundev1').children();
		ps.eq(0).html(data.eq(0).html() + '&nbsp;' + data.eq(1).html() + '&nbsp;[' + data.eq(2).html() + ']');
		ps.eq(2).html(data.eq(5).html());
		ps.eq(4).html(data.eq(6).html());
		ps.eq(5).html(data.eq(4).html());
		isFisrt = false
	}else{
		var ps = $('#rundev2').children();
		ps.eq(0).html(data.eq(0).html() + '&nbsp;' + data.eq(1).html() + '&nbsp;[' + data.eq(2).html() + ']');
		ps.eq(2).html(data.eq(5).html());
		ps.eq(4).html(data.eq(6).html());
		ps.eq(5).html(data.eq(4).html());
		isFisrt = true;
	}
};


/**
*	搜索类别数据
*/
function searchCatagoryData(datas, key){
	let result = [];
	datas.forEach((item, index) => {
		if (item['equipmentType'] == key){
				result.push(item);
		}
	});
	return result;
}

/**
*
* 渲染页面
*/
function renderPage(){
	ajax(baseUrl).then(res => {
		cacheData = res.data.otherData;		//从后端缓存的数据
		let categoryInfo = calcCavnasData(res.data.otherData);
		optEquipType(categoryInfo, $('#equipmentNameSelect'));
		availableTags = getEquipmentName(res.data.otherData);
		availableTags = getEquipmentName(res.data.otherData);
	    $("#equipment").autocomplete({
			source: availableTags
		});

	    //类别搜索下拉列表
		$("#equipmentNameSelect").on('change',(event) => {
			let searchValue = event.target.value;
			if (!searchValue){
				return;
			}
			if (searchValue == 'default'){
				renderListData($(".tb1 tbody"), cacheData, eventClick);
			}else{
				var r = searchCatagoryData(cacheData, searchValue);
				renderListData($(".tb1 tbody"), r, eventClick);
			}
			
		})
		//搜索设备名称事件处理器
		$("#equipment").on('keyup',function(e){
	    	var key = e.which;
	    	if(key == 13){
	    		filterData(e.target.value);
	    	}
	    });

		let str1 = "";
		renderListData($(".tb1 tbody"), res.data.otherData, eventClick);
	});
}

$(function(){
	setLink($(".header_left img"));
	currentDateObj = $('.timeText');
	timingDate();


	renderPage();

	setInterval(function(){
		renderPage();
	}, getDataTimeInterval);
});	//jquery ready end;