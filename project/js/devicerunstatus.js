/**
* 设备运行状态
* author : Cohen.Lee
* date : 2018-09-03
* 
*/

let availableTags = [];
let getDataTimeInterval = 100000;		//设置获取数据的时间间隔
let cacheData = [];
let searchCatagoryResult = [];
let pieColors = ['rgb(249,92,75)','rgb(235,232,93)','rgb(235,162,251)','rgb(165,185,238)','rgb(204,252,251)','rgb(208,150,191)'];

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

//计算图表x轴数据项及样式，传入通过calcCavnasData函数计算设备类型数量对象和x轴刻度样式
function calcCavansColumnStyle(categoryInfo, style){
	let result = [];
	for(item in categoryInfo){
		let elem = {}
		elem.value = item;
		elem.textStyle = style;
		result.push(elem);
	}
	return result;
}

//计算设备运行状态图的显示数据返回数组，传入x轴的数据项，和通过calcCavnasData函数计算设备类型数量对象
function calcCavansYData(xColumNameData, data){
	let result = [];
	for(let i = 0; i < xColumNameData.length;i++){
		result.push(data[xColumNameData[i]['value']]);
	}
	return result;
}

//设备类型下拉列表内容填充
function optEquipType(categoryInfo, equipmentTypeElem){
	equipmentTypeElem.children().remove();
	for(category in categoryInfo){
		equipmentTypeElem.append('<option value="' + category + '" >'+ category +'</option>')
	}
}

function generateColumnarColor(lowRangeColor, HightRangeColor){
	return new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
			offset: 0,
			color: lowRangeColor
	}, {
			offset: 1,
			color: HightRangeColor
	}]);
}

//柱形图，的每根柱子的颜色
function columnarColor(params){
	//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组					
	var colorList = [
		generateColumnarColor('#D197C0','#F9F2C5'),
		generateColumnarColor('#CDFCF8','#F3DC9E'),
		generateColumnarColor('#A5B9EE','#EDBAEA'),
		generateColumnarColor('#EDA4F9','#F8C9C3'),
		generateColumnarColor('#EBE861','#F7BAE5'),
		generateColumnarColor('#FA5C4B','#F4C05C'),
		generateColumnarColor('#bA534B','#abC05C')
	];
	return colorList[params.dataIndex];
}

function drawBarChart(chartRootElem, xColumNameData, seriesData, columnarColor){
	let option = null;
	//图形显示选项，必须是个对象
	option = {
		grid: {
			left: '10%',
			bottom:'15%',
			top:'10%'
		},
		tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    xAxis: {
	    	splitLine:{
		　　　　show:false
		　　},
	        type: 'category',
	        axisLabel: {	//y轴坐标字样式，rotate设置文字斜着显示
	          	interval:0,
                rotate:35,
                fontSize: 0.29 * rem
            },
            axisTick: {
                alignWithLabel: true
            },
	        data: xColumNameData
	    },
	    yAxis: {
	        type: 'value',
	        axisLabel:{					//y轴坐标样式
	        	color:'white',
	        	fontSize:0.3 * rem,
	        	formatter: function (value, index) {            
                    //使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
                    return value + '天';
                }
	        },
			splitLine:{
		　　　　show:false
		　　}
	    },
	    series: [{
	        data: seriesData,
	        type: 'bar',
			label:{			//标签为在柱状图上面显示的数字	
        		normal:{
        			show:true,
        			position:'top',
        			textStyle: {
			            color: 'white',
			            fontSize:0.5 * rem
			        }
        		}
        	},
	        itemStyle: {
        		normal:{
        			color:columnarColor
    			},
	            //鼠标悬停时：
	            emphasis: {
	                shadowBlur: 10,
	                shadowOffsetX: 0,
	                shadowColor: 'rgba(0, 0, 0, 0.5)'
	            }
			}
	    }]
	};
	if (option && typeof option === "object") {
	    chartRootElem.setOption(option, true);
	}
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
*  渲染数据列表
*/
function renderListData(rootElem, datas){
	let str = "";
	rootElem.children().remove();
	datas.slice(0,16).forEach((item,index)=>{
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

/**
*  渲染页面
*
*/
function renderPage(myBarChart, myPieChart){
	//从后端获取数据
	ajax(baseUrl,"interf03").then(res => {
		let categoryInfo = calcCavnasData(res.data.otherData);
		
		cacheData = res.data.otherData;		//从后端缓存的数据
		let xColumNameData = calcCavansColumnStyle(categoryInfo, {color: 'white'});
		//柱状图数据，按顺序对应设备种类的名称
		let seriesData = calcCavansYData(xColumNameData, categoryInfo);	
		optEquipType(categoryInfo, $('#equipmentTypeName'));

	    availableTags = getEquipmentName(res.data.otherData);
	    $("#equipmentNameAutocomplete").autocomplete({
			source: availableTags
		});
	    
	    drawBarChart(myBarChart,xColumNameData,seriesData,columnarColor);
	    drawPieChart(myPieChart, res.data.chartPieData);
		renderListData($(".tb1 tbody"), res.data.otherData);
	});
}

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
* 绘制饼形图
*  
*/
function drawPieChart(chartRootElem, data){
	let legendData = [];
	let seriesData = [];
	let obj = {};
	obj.data = [];

	for(var i = 0, len = data['title'].length; i < len; i++){
		legendData.push(data['data'][i] + '% ' +  data['title'][i]);
		let dataObj = {};
		dataObj.name = data['data'][i] + '% ' +  data['title'][i];
		dataObj.value = data['data'][i];
		dataObj.itemStyle = {color:pieColors[i]};
		dataObj.label = {fontSize:0.3 * rem};
		dataObj.labelLine = {length:0.7 * rem, length2:0.5 * rem};
		obj.data.push(dataObj);
	}
	
	obj.type = 'pie';
	obj.radius = '75%';
	obj.selectedMode = 'single';
	obj.center = ['50%', '50%'];
	obj.itemStyle = {
        emphasis: {
            shadowBlur: 100,
            shadowOffsetX: 0,
            shadowColor: 'rgba(255, 255, 0, 0.1)'
        }
    }

	seriesData.push(obj);
	let option = null;
	//图形显示选项，必须是个对象
	option = {
		tooltip : {
	        trigger: 'item',
	        /*formatter: "{a} <br/>{b} : {c} ({d}%)"*/
    	},
    	legend: {
	        // orient: 'vertical',
	        // top: 'middle',
	        bottom: 10,
	        show:false,
	        data: legendData
	    },
	    series: seriesData
	}

	if (option && typeof option === "object") {
	    chartRootElem.setOption(option, true);
	}
}


$(function(){
	
	setLink($(".header_left .header_back"));
	currentDateObj = $('.timeText');
	timingDate();
	let container = $("#container");
	let containerPie = $('#containerPie');
	let myBarChart = echarts.init(container.get(0));
	let myPieChart = echarts.init(containerPie.get(0));
	//类别搜索下拉列表
	$("#equipmentTypeName").on('change',(event) => {
		let searchValue = event.target.value;
		if (!searchValue){
			return;
		}
		var r = searchCatagoryData(cacheData, searchValue);
		renderListData($(".tb1 tbody"), r);
	})
	//搜索设备名称事件处理器
	$("#equipmentNameAutocomplete").on('keyup',function(e){
    	var key = e.which;
    	if(key == 13){
    		filterData(e.target.value);
    	}
    });

	renderPage(myBarChart,myPieChart);

	setInterval(function(){
		renderPage(myBarChart,myPieChart);
	}, getDataTimeInterval);
	
});	//jquery ready end;