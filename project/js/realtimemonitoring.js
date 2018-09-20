
/****
* module：实时检测
* author：cohen.Lee
* date： 2018-09-15
* 
*/

//初始化变量
baseUrl = baseUrl + "/api/";
currentDateObj = null;
//环境检测类型
let monitoringTypes = ['环境监测', '设备监测', '本体监测'];
//图形x轴刻度标签值
let xColumNameData =['00:00', '02:00','04:00','06:00','08:00','10:00',
	'12:00','14:00','16:00','18:00','20:00','22:00','24:00'];
//获取当前值的毫秒数
let changeDataTimeInterval = 10000;
let timeIntervalGetData = 200000;
//缓存到页面端的数据
let cacheDatas = {};
let cacheInitDatas = {};
let pageSize = 2;		//列表页的每页数据数
let timeId = null;		//滚动数据定时器
let dataTimeId = null;	//从后端获取数据定时器
let environmentMonitorPointAvailableTags = [];		//
let equipmentMonitorPointAvailableTags = [];
let noumenonMonitorPointAvailableTags = [];
let chartsObjs = [];								//折线图对象
let tablelists = [];

/**
* 生成检测点
*/
function genLengedData(datas){
	let result = [];
	if (typeof datas == 'object' && datas instanceof Array){
		for(var i = 0, len = datas.length > pageSize ? pageSize : datas.length ; i < len ;i++){
			result.push(datas[i]['monitoringPoint'])
		}
	}
	return result;
}



function genSeriesObjects(datas, lengeds){
	var result = [];
	for (var i = 0, len = datas.length > pageSize ? pageSize : datas.length; i < len; i++){
		var obj = {};
		obj['name'] = lengeds[i];
		obj['type'] = 'line';
		obj['data'] = datas[i]['data'];
		obj['smooth'] = false;
		result.push(obj);
	}
	return result;
}

/**
* 根据从后端返回的数据，进行页面的列表的渲染
*/
function generateList(elem, datas, catagory){
	elem.children().remove();
	for(var i = 0,len = datas.length > pageSize ? pageSize : datas.length; i < len; i++){
		var tr = $('<tr></tr>');
		tr.append('<td>'+datas[i]['monitoringPoint']+'</td>')
			.append('<td>'+catagory+'</td>')
			.append('<td>'+datas[i]['monitoringValue']+'</td>')
			.append('<td>'+datas[i]['upperLimit']+'</td>')
			.append('<td>'+datas[i]['lowerLimit']+'</td>')
			.append('<td>'+datas[i]['sataus']+'</td>');
			elem.append(tr);
	}	
}

/**
* 生成检测点的颜色，返回数据
*/
function generateMonitorLineColor(lineData){
	let result = [];
	for (var i = 0; i < lineData.length; i++){
		var current = lineData[i]['monitoringValue'].slice(0,lineData[i]['monitoringValue'].length-2)
		var lowWarning = lineData[i]['lowerLimit'].slice(0,lineData[i]['lowerLimit'].length-2)
		if (current < lowWarning){
			result.push('rgb(255, 0, 0)');
		}else{
			var r = Math.floor(Math.random()*100);
			var g = Math.floor(Math.random()*256);
			var b = Math.floor(Math.random()*256);
		}
		
		result.push('rgb('+r+','+g+','+b+')');
	}
	return result;
}


/**
* 创建图形函数
* @param chartsObj 	类型charts对象， 图对象
* @param lcolors 类型数组，图形上线条的颜色
* @param xAxisItem  类型数组，图形x轴的刻度
* @param legendData 类型数据，每个线条类型名称
* @param series		类型数组，每个类型线条的数据
*/
function initChart(chartsObj, lcolors, xAxisItem, legendData, seriesData){
	let option = null;
	option = {
    	color:lcolors,
	    tooltip:{
	        trigger: 'none',
	        axisPointer: {
	            type: 'cross'
	        }
	    },
	    legend: {
	    	 textStyle:{
                color:'white',
                fontSize:0.1 * rem   
            },
            bottom:'0',
	        data:legendData,
	    },
	    grid: {
	        top: 10,
	        bottom: 80
	    },
	    xAxis: [
	        {
	            type: 'category',
	            axisLine: {
	                onZero: false,
	                lineStyle: {
	                    color: lcolors
	                }
	            },
	            axisLabel: {  //x轴坐标字样式，rotate设置文字斜着显示
	                interval:0,
	                rotate:50,
	                color:'white',
	                fontSize:15,
	                align:'right',
	                formatter: function (value, index) {            
	                    //使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
	                    return value;
	                },
	            },
	            axisPointer: {
	                label: {
	                	fontSize:15,
	                    formatter: function (params) {
	                        return '温度  ' + params.value
	                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '')+'℃';
	                    }
	                }
	            },
	            splitLine:{
	                show:true,
	                lineStyle:{
	                    width:2,
	                    type:'dotted'  //'dotted'虚线 'solid'实线
	                }
	            },
	            data: xAxisItem
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            axisLabel:{
	                color:'white',
	                fontSize:15,
	                formatter: '{value} ℃'
	            }
	        }
	    ],
	    series: seriesData
	};
	if (option && typeof option === "object") {
	    chartsObj.setOption(option, true);
	}
};

/**
* 每间隔timeinterval时间，执行一次callback任务
* 
*/
function renderChartsListFn(charts, tables, datas, catagorys){
	for(var i = 0, len = charts.length; i < len; i++){
		//生成图
		var lineColors = generateMonitorLineColor(datas[catagorys[i]]);
		var lenged = genLengedData(datas[catagorys[i]]);
		var seriesData = genSeriesObjects(datas[catagorys[i]], genLengedData(datas[catagorys[i]]));

		initChart(charts[i],lineColors,xColumNameData,lenged,seriesData);
		generateList(tables[i], datas[catagorys[i]], catagorys[i]);
	}
}

function registerSearchFn(elem, type, datas, chart, lineColor,tab){
	elem.on('keyup',(event) => {
		console.log("aaaa")
		if (event.which == 13){
			let seriesData = [];
			for(key in datas){
				if (key == type){
					for(var j = 0 , jLen = datas[key].length; j < jLen; j++){
						if (datas[key][j]['monitoringPoint'] == event.target.value){
							seriesData = datas[key][j];
							break;
						}
					}
				}
			}
			var obj = {};
			obj['name'] = event.target.value;
			obj['type'] = 'line';
			obj['data'] = seriesData['data'];
			obj['smooth'] = false;
			initChart(chart,lineColor,xColumNameData,[event.target.value],[obj]);
			generateList(tab, [seriesData], type);
		}
	});
}

function fromBackendData(chartsObjs,tablelists){
	ajax(baseUrl,"realtimemonitoring").then(res => {
		genderAutoData(res.data, monitoringTypes);	//获取监测点模糊搜索数据
		$('#environmentMonitorPoint').autocomplete({
			source : environmentMonitorPointAvailableTags
		});
		$('#equipmentMonitorPoint').autocomplete({
			source : equipmentMonitorPointAvailableTags
		});
		$('#noumenonMonitorPoint').autocomplete({
			source : noumenonMonitorPointAvailableTags
		});
		

		for(var i = 0,len = res.data.length; i < len; i++){
			cacheDatas[res.data[i]['type']] = res.data[i]['data'];
		}

		registerSearchFn($('#environmentMonitorPoint'),monitoringTypes[0] ,cacheDatas , chartsObjs[0],['rgb(255,0,0)'],tablelists[0]);
		registerSearchFn($('#equipmentMonitorPoint'),monitoringTypes[1] , cacheDatas, chartsObjs[1],['rgb(255,0,0)'],tablelists[1]);
		registerSearchFn($('#noumenonMonitorPoint'),monitoringTypes[2], cacheDatas, chartsObjs[2],['rgb(255,0,0)'],tablelists[2]);
		renderChartsListFn(chartsObjs, tablelists, cacheDatas, monitoringTypes);
		clearInterval(timeId);	//
		timeId = setInterval(function(){
			renderChartsListFn(chartsObjs, tablelists, cacheDatas, monitoringTypes);

			for(key in cacheDatas){
				for(var i = 0; i < pageSize; i++){
					var elem = cacheDatas[key].shift();
					cacheDatas[key].push(elem);
				}
			}
		},changeDataTimeInterval);
	});
}

/**
*  生成模糊查询数据项
*/
function genderAutoData(datas, mTypes){
	environmentMonitorPointAvailableTags = [];
	equipmentMonitorPointAvailableTags = [];
	noumenonMonitorPointAvailableTags = [];
	for (var i = 0, len = datas.length; i < len; i++){
		if (mTypes[0] == datas[i]['type']){
			for(var j = 0, leng = datas[i]['data'].length; j < leng; j++){
				environmentMonitorPointAvailableTags.push(datas[i]['data'][j]['monitoringPoint']);
			}
		}
		if (mTypes[1] == datas[i]['type']){
			for(var j = 0, leng = datas[i]['data'].length; j < leng; j++){
				equipmentMonitorPointAvailableTags.push(datas[i]['data'][j]['monitoringPoint']);
			}
		}
		if (mTypes[2] == datas[i]['type']){
			for(var j = 0, leng = datas[i]['data'].length; j < leng; j++){
				noumenonMonitorPointAvailableTags.push(datas[i]['data'][j]['monitoringPoint']);
			}
		}
	}
}

//jQuery ready function start
$(function(){
	
	setLink($(".header_left dl"));
	currentDateObj = $('.timeText');
	timingDate();

	chartsObjs = [echarts.init($("#container_1").get(0)),
		echarts.init($("#container_2").get(0)),
		echarts.init($("#container_3").get(0))];

	 tablelists= [$("#environmentMonitor tbody"), 
		$("#equipmentMonitor tbody"), 
		$("#noumenonMonitor tbody")];
	//从后端获取数据，并启动页面定时器
	fromBackendData(chartsObjs,tablelists)

	//定时向后端发送请求，获取数据
	dataTimeId = setInterval(function(){		
		//从后端获取数据，并启动页面定时器
		fromBackendData(chartsObjs,tablelists)
	},timeIntervalGetData);
	
});		//jQuery ready function end.

