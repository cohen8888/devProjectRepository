
/****
* module：实时检测
* author：cohen.Lee
* date： 2018-09-15
* 
*/
let baseUrl = "http://localhost:3000/api/";

/**
* 生成检测图数据函数
* 
*/
function generateMonitorDataObj(categoryName, data, lineType){
	let result = [];
	for (var i = 0; i < data.length; i++){
		if (data[i]['monitoringType'] == categoryName){
			let obj = {};
			obj.name = data[i]['monitoringPoint'];
			obj.type = lineType;
			obj.data = data[i].data;
			result.push(obj);
		}
	}
	return result;
}

/**
*
*  生成检测点名称，返回数据
*/
function generateMonitorLegendData(generateMonitorDataObj){
	let result = [];
	for (var i = 0; i < generateMonitorDataObj.length; i++){
		result.push(generateMonitorDataObj[i]['name']);
	}
	return result;
}



/**
* 生成检测点的颜色，返回数据
*/
function generateMonitorLineColor(generateMonitorLegendData){
	let result = [];
	for (var i = 0; i < generateMonitorDataObj.length; i++){
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
	};												//环境检测图显示选项
	if (option && typeof option === "object") {
	    chartsObj.setOption(option, true);
	}
};


/**
*
* 根据从后端返回的数据，进行页面的列表的渲染
*/
function generateList(elem, data, category){
	for(var i = 0; i < data.length; i++){
		if (category != null && category == data[i]['monitoringType']){
			var tr = $('<tr></tr>');
			tr.append('<td>'+data[i]['monitoringPoint']+'</td>')
				.append('<td>'+data[i]['monitoringType']+'</td>')
				.append('<td>'+data[i]['monitoringValue']+'</td>')
				.append('<td>'+data[i]['upperLimit']+'</td>')
				.append('<td>'+data[i]['lowerLimit']+'</td>')
				.append('<td>'+data[i]['sataus']+'</td>');
				elem.append(tr);
		}	
	}
}

//环境检测类型
let monitoringTypes = ['环境监测', '设备监测', '本体监测'];
//图形x轴刻度标签值
let xColumNameData =['00:00', '02:00','04:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00'];

$(function(){
	
	setLink($(".header_left"));

	let environmentMonitorChart = echarts.init($("#container_1").get(0));		//环境检测echarts图
	let equipmentMonitorChart = echarts.init($("#container_2").get(0));			//设备检测echarts图
	let noumenonMonitorChart = echarts.init($("#container_3").get(0));			//本体检测echarts图
	
	ajax(baseUrl,"realtimemonitoring").then(res=>{
		//获取数据中的检测类型

		//环境检测echarts图
		let environmentMonitorSeriesData = generateMonitorDataObj(monitoringTypes[0], res.data, 'line');
		let environmentMonitorLegendData = generateMonitorLegendData(environmentMonitorSeriesData);
		let environmentLineColors = generateMonitorLineColor(environmentMonitorLegendData);
		initChart(environmentMonitorChart,environmentLineColors,xColumNameData,environmentMonitorLegendData,environmentMonitorSeriesData);
		//设备检测echarts图
		let equipmentMonitorSeriesData = generateMonitorDataObj(monitoringTypes[1], res.data, 'line');
		let equipmentMonitorLegendData = generateMonitorLegendData(equipmentMonitorSeriesData);
		let equipmentLineColors = generateMonitorLineColor(equipmentMonitorLegendData);
		initChart(equipmentMonitorChart,equipmentLineColors,xColumNameData,equipmentMonitorLegendData,equipmentMonitorSeriesData);

		//本体检测echarts图
		let noumenonMonitorSeriesData = generateMonitorDataObj(monitoringTypes[2], res.data, 'line');
		let noumenonMonitorLegendData = generateMonitorLegendData(noumenonMonitorSeriesData);
		let noumenonLineColors = generateMonitorLineColor(noumenonMonitorLegendData);
		initChart(noumenonMonitorChart,noumenonLineColors,xColumNameData,noumenonMonitorLegendData,noumenonMonitorSeriesData);


		//列表数据
		generateList($("#environmentMonitor"), res.data, monitoringTypes[0]);
		generateList($("#equipmentMonitor"), res.data, monitoringTypes[1]);
		generateList($("#noumenonMonitor"), res.data, monitoringTypes[2]);

	});
	
});		//jQuery ready function end.

