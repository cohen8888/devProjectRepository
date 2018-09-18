
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
let xColumNameData =['00:00', '02:00','04:00','08:00','10:00',
	'12:00','14:00','16:00','18:00','20:00','22:00','24:00'];
//获取当前值的毫秒数
let changeDataTimeInterval = 5000;
let timeIntervalGetData = 20000;
//缓存到页面端的数据
let cacheDatas = {};
let cacheInitDatas = {};
let pageSize = 2;
let timeId = null;
let dataTimeId = null;


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
function generateMonitorLineColor(lineNumber){
	let result = [];
	for (var i = 0; i < lineNumber.length; i++){
		var r = Math.floor(Math.random()*256);
		var g = Math.floor(Math.random()*256);
		var b = Math.floor(Math.random()*256);

		result.push('rgb('+r+','+g+','+b+')');
	}
	return result;
}




/**
* 创建图形函数
* @param chartsObj 	类型charts对象， 图对象
* @param lineColors 类型数组，图形上线条的颜色
* @param xAxisItem  类型数组，图形x轴的刻度
* @param legendData 类型数据，每个线条类型名称
* @param series		类型数组，每个类型线条的数据
*/
function initChart(chartsObj, lineColors, xAxisItem, legendData, seriesData){
	let option = null;
	option = {
    	color:lineColors,
	    tooltip:{
	        trigger: 'none',
	        axisPointer: {
	            type: 'cross'
	        }
	    },
	    legend: {
	    	 textStyle:{
                color:'white',
                fontSize:15
                
            },
            bottom:'0',
	        data:legendData
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
	                    color: lineColors
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

//jQuery ready function start
$(function(){
	
	setLink($(".header_left dl"));
	currentDateObj = $('.timeText');
	timingDate();

	let chartsObjs = [echarts.init($("#container_1").get(0)),
		echarts.init($("#container_2").get(0)),
		echarts.init($("#container_3").get(0))];

	let tablelists = [$("#environmentMonitor tbody"), 
		$("#equipmentMonitor tbody"), 
		$("#noumenonMonitor tbody")];
	
	//定时向后端发送请求，获取数据
	dataTimeId = setInterval(function(){
		console.log('重新获取数据');		
		//从后端获取数据，并启动页面定时器
		ajax(baseUrl,"realtimemonitoring").then(res => {
			console.log(res.data);
			for(var i = 0,len = res.data.length; i < len; i++){
				cacheDatas[res.data[i]['type']] = res.data[i]['data'];
			}
			console.log(cacheDatas);
			//cacheInitDatas = cacheDatas;	//存储从后端获取的数据
			clearInterval(timeId);
			timeId = setInterval(function(){
				console.log('重新刷新数据')
				renderChartsListFn(chartsObjs, tablelists, cacheDatas, monitoringTypes);
				for(key in cacheDatas){
					for(var i = 0; i < pageSize; i++){
						cacheDatas[key].shift();
					}
				}
				console.log(cacheDatas);
			},changeDataTimeInterval);
		});
	},timeIntervalGetData);
	
});		//jQuery ready function end.

