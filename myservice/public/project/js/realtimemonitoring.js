
/****
* module：实时检测
* author：cohen.Lee
* date： 2018-09-15
* 
*/

//初始化变量
////baseUrl = baseUrl + "interf07";
//baseUrl = 'http://39.104.135.24:8081/public/data/realtimemonitoring.json'
baseUrl = baseUrl + "/api/realtimemonitoring";
//环境检测类型
let monitoringTypes = ['环境监测', '设备监测', '本体监测'];
//图形x轴刻度标签值
let xColumNameData =['00:00', '02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','24:00'];
//获取当前值的毫秒数
let changeDataTimeInterval = 5000;	//每20秒，表格刷新一次数据
let timeIntervalGetData = 7200000;	//每间隔两个小时，从后端获取一次数据
//缓存到页面端的数据
let preinstallColors = ['#F2DEF2', '#E8D897', '#AAD5B3', '#83F0FE', '#D6B9F2', '#F29200'];
let warnColor = 'RGB(255, 0, 0)';
let cacheDatas = {};
let pageSize = 5;		//列表页的每页数据数
let timeId = null;		//滚动数据定时器
let dataTimeId = null;	//从后端获取数据定时器
let environmentMonitorPointAvailableTags = [];		//
let equipmentMonitorPointAvailableTags = [];
let noumenonMonitorPointAvailableTags = [];
let chartsObjs = [];								//折线图对象
let tablelists = [];
let monitoringPoints = null;

let cacheEnvironmentTableData = [];
let cacheEquipmentTableData = [];
let cacheNoumenonTableData = [];

/**
* 根据从后端返回的数据，进行页面的列表的渲染
*/
function generateList(elem, datas){

	elem.children().remove();
	if (datas){
		for(var i = 0,len = datas.length > pageSize ? pageSize : datas.length; i < len; i++){
			var tr = $('<tr></tr>');
			tr.append('<td>'+datas[i]['monitoringPoint']+'</td>')
				.append('<td>'+datas[i]['monitorProject']+'</td>')
				.append('<td>'+datas[i]['monitorValue']+'</td>')
				.append('<td>'+datas[i]['upperLimit']+'</td>')
				.append('<td>'+datas[i]['lowerLimit']+'</td>')
				.append('<td>'+datas[i]['status']+'</td>');
				elem.append(tr);
		}
	}else{
		var tr = $('<tr><td>没有数据!</td></tr>');
		elem.append(tr);
	}
}


/**
* 创建图形函数
* @param chartsObj 	类型charts对象， 图对象
* @param lcolors 类型数组，图形上线条的颜色
* @param xAxisItem  类型数组，图形x轴的刻度
* @param legendData 类型数据，每个线条类型名称
* @param series		类型数组，每个类型线条的数据
*/
function initChart(chartsObj, lcolors, xColumNameData, legendData, seriesData, unit){
	let xAxisItems = [];
	let xAxisObj =  {
        type: 'category',
        axisLine: {
            onZero: true,
            lineStyle: {
                color: 'white'
            }
        },
        boundaryGap:false,
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
        position:'bottom'
    }
    let yAxisItems = [
        {
            type: 'value',
            axisLabel:{
                color:'white',
                fontSize:15,
                formatter: '{value}'
            },
            splitLine:{
	            show:true,
	            lineStyle:{
	                width:2,
	                type:'dotted'  //'dotted'虚线 'solid'实线
	            }
	        },
            axisLine: {
	            onZero: true,
	            lineStyle: {
	                color: 'white'
	            }
	        }
        }
    ];

	legendData.forEach((item, index) => {
	 	xAxisObj.data = xColumNameData;
	 	xAxisItems.push(xAxisObj);
	});

	//
    let seriesDataObjs = [];
    seriesData.forEach((item, index) => {
    	let obj = {};
		obj['name'] = legendData[index];
		obj['type'] = 'line';
		obj['data'] = seriesData[index];
		obj['smooth'] = false;
		seriesDataObjs.push(obj);
    });
	let option = {
    	color:lcolors,
    	title:{
			x:'left',
			padding: [5, 0],
			y:'top',
			text:'单\n位\n' + unit,
			align:'center',
			verticalAlign:'middle',
			textStyle:{
				color:'#FFF',
				fontSize:0.25*rem
			}
		},
	    tooltip:{
	        trigger: 'item',
	        formatter:'{a}<br/>{b}<br/>{c}'
	    },
	    legend: {
	    	 textStyle:{
                color:'white',
                fontSize:0.2 * rem   
            },
            bottom:'0',
	        data:legendData,
	    },
	    grid: {
	        top: 10,
	        bottom: 80
	    },
	    xAxis: xAxisItems,
	    yAxis: yAxisItems,
	    series: seriesDataObjs
	};

	if (option && typeof option === "object") {
	    chartsObj.setOption(option, true);
	}
};

/**
* 每间隔timeinterval时间，执行一次callback任务
* 
*/
function renderChartsListFn(charts, tables, datas, catagorys, monitoringPoints){
	generateTableData(datas, monitoringPoints, catagorys);
	for(var i = 0, len = charts.length; i < len; i++){
		//渲染图表
		handlerChartDataAndDrawChart(monitoringPoints[i], catagorys[i], datas, charts[i]);
		//渲染表格
		if (i == 0){
			generateList(tables[i],cacheEnvironmentTableData);
		}else if (i == 1){
			generateList(tables[i],cacheEquipmentTableData);
		}else if (i == 2){
			generateList(tables[i],cacheNoumenonTableData);
		}
		
	}
}

/**
* 返回当前时间的偶数小时整点字符串，若为奇数小时减一小时，如：23:22返回22:00,22:32返回22:00
*/
function currentTimeHourStr(){
	let timeStr = '';
	let currentDate = new Date();
	if (currentDate.getHours() % 2 == 0){
		timeStr = currentDate.getHours() < 10 ? '0' + currentDate.getHours() : currentDate.getHours().toString();
	}else{
		timeStr = currentDate.getHours() < 11 ? '0' + (currentDate.getHours() - 1) : '' + (currentDate.getHours() - 1);
	}
	timeStr = timeStr + ':' + '00';
	return timeStr;
}

/**
* 按照业务处理数据
* 返回画图的数据对象，包括x轴的坐标、数据、是否报警
* @param datas 数据
* @param monitorName 监控类别名
*/
function handlerSeriesData(datas, monitorName, lowerLimit, upperLimit){
	let result = {};
	let timeStr = currentTimeHourStr();
	let count = 0;
	let legend = [];
	let data = [];
	let item = datas.slice().reverse();
	let findOk = false;
	let isWarn = false;
	
	for (let i = 0, len = item.length; i < len; i++){
		if (item[i]['name'] == timeStr){
			findOk = true;
		}
		if (findOk){
			count++;
			legend.push(item[i]['name']);
			data.push(item[i]['value']);
			if (item[i]['value'] < lowerLimit || item[i]['value'] > upperLimit){
				isWarn = true;
			}
		}
		if (count > 11){
			break;
		}
	}
	legend.reverse();
	data.reverse();
	result['legend'] = legend;
	result['data'] = data;
	result.monitorName = monitorName;
	result['isWarn'] = isWarn;
	console.log(result);
	return result;
}





/**
* 注册搜索功能
* @param elem 下拉列表框对象
* @param type 监测类型
* @数据
* @页面显示图的容器节点
* @节点的折现颜色
* @表格数据容器
*/
function registerSearchFn(elem, type, datas, chart, tab){

	elem.on('change',(event) => {
		let key = event.target.value;
		let seriesDatas = [];
		let lineColors = [];
		let legendDatas = [];
		let xColumNameData = [];
		let warningArr = [];
		let unit = '';
		if (key){
			for(let i = 0, len = datas[type].length; i < len; i++){
				if (datas[type][i]['monitorProject'] == key){
					unit = datas[type][i]['unit'];
					let chartData = handlerSeriesData(datas[type][i]['data'], 
						datas[type][i]['monitoringPoint'],
						datas[type][i]['lowerLimit'] , 
						datas[type][i]['upperLimit']);
					
					legendDatas.push(chartData['monitorName']);
					seriesDatas.push(chartData['data']);
					xColumNameData = chartData['legend'];
					warningArr.push(chartData['isWarn']);
				}
			}
		}
		for(let i = 0, len = seriesDatas.length; i < len; i++){
			if (warningArr[i]){
				lineColors.push(warnColor);	
			}else{
				lineColors.push(preinstallColors[i]);
			}
		}
		initChart(chart, lineColors, xColumNameData, legendDatas, seriesDatas,unit);
		monitoringPoints = [$('#environmentMonitorPointSelect').val(), $('#equipmentMonitorPointSelect').val(),$('#noumenonMonitorPointSelect').val()];
		generateTableData(datas, monitoringPoints, monitoringTypes);

		if (event.target.id == 'environmentMonitorPointSelect'){
			generateList(tab, cacheEnvironmentTableData);
		}else if (event.target.id == 'equipmentMonitorPointSelect'){
			generateList(tab, cacheEquipmentTableData);
		}else if (event.target.id == 'noumenonMonitorPointSelect'){
			generateList(tab, cacheNoumenonTableData);
		}

		//
	});
}

function handlerChartDataAndDrawChart(key, type, datas, chart){
	let seriesDatas = [];
	let lineColors = [];
	let legendDatas = [];
	let xColumNameData = [];
	let warningArr = [];
	let unit = '';
	if (key){
		for(let i = 0, len = datas[type].length; i < len; i++){
			if (datas[type][i]['monitorProject'] == key){
				unit = datas[type][i]['unit'];
				let chartData = handlerSeriesData(datas[type][i]['data'], datas[type][i]['monitoringPoint'],datas[type][i]['lowerLimit'] , datas[type][i]['upperLimit']);
				legendDatas.push(chartData['monitorName']);
				seriesDatas.push(chartData['data']);
				xColumNameData = chartData['legend'];
				warningArr.push(chartData['isWarn']);
			}
		}
	}

	for(let i = 0, len = seriesDatas.length; i < len; i++){
		if (warningArr[i]){
			lineColors.push(warnColor);	
		}else{
			lineColors.push(preinstallColors[i]);
		}
	}
	initChart(chart, lineColors, xColumNameData, legendDatas, seriesDatas, unit);
}

/**
*
* 获取后端数据
*/
function getBackendData(chartsObjs, tablelists){

	ajax(baseUrl).then(res => {
		genderAutoData(res.data, monitoringTypes);	//获取监测点模糊搜索数据

		for(var i = 0,len = res.data.length; i < len; i++){
			cacheDatas[res.data[i]['type']] = res.data[i]['data'];
		}
		

		//添加监测点选择数据
		addMonitorSelectData($('#environmentMonitorPointSelect'), environmentMonitorPointAvailableTags);
		addMonitorSelectData($('#equipmentMonitorPointSelect'), equipmentMonitorPointAvailableTags);
		addMonitorSelectData($('#noumenonMonitorPointSelect'), noumenonMonitorPointAvailableTags);

		registerSearchFn($('#environmentMonitorPointSelect'), monitoringTypes[0] ,
			cacheDatas , chartsObjs[0], tablelists[0]);
		registerSearchFn($('#equipmentMonitorPointSelect'), monitoringTypes[1] , 
			cacheDatas, chartsObjs[1],  tablelists[1]);
		registerSearchFn($('#noumenonMonitorPointSelect'),monitoringTypes[2], 
			cacheDatas, chartsObjs[2],  tablelists[2]);

		monitoringPoints = [$('#environmentMonitorPointSelect').val(), $('#equipmentMonitorPointSelect').val(),$('#noumenonMonitorPointSelect').val()];
		renderChartsListFn(chartsObjs, tablelists, cacheDatas, monitoringTypes, monitoringPoints);

		//清楚定时器
		clearInterval(timeId);	//

		//启动定时器
		timeId = setInterval(function(){
			//折线图随着后端数据获取来更新

			for(var i = 0; i < pageSize; i++){
				var elem1 = cacheEnvironmentTableData.shift();
				cacheEnvironmentTableData.push(elem1);
				var elem2 = cacheEquipmentTableData.shift();
				cacheEquipmentTableData.push(elem2);
				var elem3 = cacheNoumenonTableData.shift();
				cacheNoumenonTableData.push(elem3);
			}
			generateList(tablelists[0],cacheEnvironmentTableData);
			generateList(tablelists[1],cacheEquipmentTableData);
			generateList(tablelists[2],cacheNoumenonTableData);
			//renderChartsListFn(chartsObjs, tablelists, cacheDatas, monitoringTypes, monitoringPoints);
		},changeDataTimeInterval);
	});
}



function generateTableData(datas, monitoringPoints, monitoringTypes){
	cacheEnvironmentTableData = [];
	cacheEquipmentTableData = [];
	cacheNoumenonTableData = [];
	let timeStr = currentTimeHourStr();
	for (let i = 0, len = monitoringTypes.length; i < len; i++){
		for(let j = 0, llen = datas[monitoringTypes[i]].length; j < llen; j++){
			if (monitoringPoints[i] == datas[monitoringTypes[i]][j]['monitorProject']){
				//温度监控数据
				let mPointData = datas[monitoringTypes[i]][j]['data'].slice();
				let mPointName = datas[monitoringTypes[i]][j]['monitoringPoint'];
				let mLowerLimit = datas[monitoringTypes[i]][j]['lowerLimit'];
				let mUpperLimit =  datas[monitoringTypes[i]][j]['upperLimit'];
				let mMonitorProject = datas[monitoringTypes[i]][j]['monitorProject'];
				let flag = false;
				let count = 0;
				mPointData.reverse();	//翻转数组，从后开始往前搜索到指定时间数据，往前推24小时

				//处理从当前时间往前推24小时的监控点数据
				for(let k = 0, kLen = mPointData.length; k < kLen; k++){
					if (mPointData[k]['name'] == timeStr){
						flag = true;
					}
					if(flag){
						count++;
						let obj = {};
						obj.monitoringPoint = mPointName;
						obj.monitorProject = mMonitorProject;
						obj.lowerLimit = mLowerLimit;
						obj.upperLimit = mUpperLimit;
						obj.monitorValue = mPointData[k]['value'];
						if ( mPointData[k]['value'] < mLowerLimit ||  mPointData[k]['value'] > mUpperLimit){
							obj.status = '不正常';
						}else{
							obj.status = '正常';
						}
						if (i == 0){
							cacheEnvironmentTableData.push(obj);
						}else if (i == 1){
							cacheEquipmentTableData.push(obj);
						}else if (i == 2){
							cacheNoumenonTableData.push(obj);
						}
					}
					if (count > 11){
						break;
					}
				}
			
			}
		}
	}

}

/**
*  生成模糊查询数据项
*/
function genderAutoData(datas, mTypes){
	//初始化
	environmentMonitorPointAvailableTags = [];
	equipmentMonitorPointAvailableTags = [];
	noumenonMonitorPointAvailableTags = [];
	for(let i = 0, len = datas.length; i < len; i++){
		if (mTypes[0] == datas[i]['type']){
			let key = {};
			for(let j = 0, leng = datas[i]['data'].length; j < leng; j++){
				if (!(datas[i]['data'][j]['monitorProject'] in key)){
					environmentMonitorPointAvailableTags.push(datas[i]['data'][j]['monitorProject']);
					key[datas[i]['data'][j]['monitorProject']] = true;
				}
			}
		}
		if (mTypes[1] == datas[i]['type']){
			let key = {};
			for(let j = 0, leng = datas[i]['data'].length; j < leng; j++){
				if (!(datas[i]['data'][j]['monitorProject'] in key)){
					equipmentMonitorPointAvailableTags.push(datas[i]['data'][j]['monitorProject']);
					key[datas[i]['data'][j]['monitorProject']] = true;
				}
			}
		}
		if (mTypes[2] == datas[i]['type']){
			let key = {};
			for(let j = 0, leng = datas[i]['data'].length; j < leng; j++){
				if (!(datas[i]['data'][j]['monitorProject'] in key)){
					noumenonMonitorPointAvailableTags.push(datas[i]['data'][j]['monitorProject']);
					key[datas[i]['data'][j]['monitorProject']] = true;
				}
			}
		}
	}
}

/**
* 添加监测点的下拉数据
* @selectElem 下拉数据容器
*/
function addMonitorSelectData(selectElem, data){
	if (selectElem){
		selectElem.children().remove();
		if (typeof data == 'object' && data instanceof Array){
			let str = '';
			data.forEach((item, index) => {
				if (index == 0){
					str += '<option selected value="'+item+'"">'+item+'</option>';
				}else{
					str += '<option value="'+item+'"">'+item+'</option>';
				}
			});
			selectElem.append(str);
		}	
	}
}




//jQuery ready function start
$(function(){
	
	setLink($(".header_left img"));
	currentDateObj = $('.timeText');
	timingDate();

	//三个图形根元素
	chartsObjs = [echarts.init($("#container_1").get(0)),
		echarts.init($("#container_2").get(0)),
		echarts.init($("#container_3").get(0))];
	//三个表格根元素
	tablelists= [$("#environmentMonitor tbody"), 
		$("#equipmentMonitor tbody"), 
		$("#noumenonMonitor tbody")];
	
	//从后端获取数据，并启动页面定时器
	getBackendData(chartsObjs, tablelists);
	
	//定时向后端发送请求，获取数据
	dataTimeId = setInterval(function(){		
		//从后端获取数据，并启动页面定时器
		getBackendData(chartsObjs,tablelists)
	},timeIntervalGetData);
	
});		//jQuery ready function end.

