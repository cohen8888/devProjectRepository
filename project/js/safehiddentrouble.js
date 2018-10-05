/**
* 安全隐患模块
* author : cohen.Lee
* 
*/

//baseUrl = baseUrl + "interf05";realtimemonitoring
baseUrl = baseUrl + "/api/safehiddentrouble";

let changeDataTimeInterval = 3000;								//切换数据时间
let getChartDataTimeInterval = 15000;							//从后端取数据的间隔时间	
let pageSize = 5;												//表格显示最大数据
let chartColumn = ['隐患排查', '隐患发现'];


let xColumNameData = ['周一', '周二','周三','周四','周五','周六','周日'];	//图形x轴刻度标签值
let timeId = null;
let getBackendTimeID = null;
let hiddentroubleFindListData = null;							//隐患发现列表缓冲数据
let hiddentroubleCheckListData = null;							//隐患排查列表缓冲数据
let pieColors = ['rgb(70,194,252)','rgb(131,240,145)','rgb(236,232,93)','rgb(253,112,69)'];

function calcXColumNameData(){
	let result = [];
	let currentDate = new Date();
	let day = 1
	for(let i = 0; i < 7; i++){
		currentDate.setDate(currentDate.getDate() - day);
		result.push(currentDate.Format('MM-DD'));
	}
	return result.reverse();
}

/**
* 渲染表格数据
*
*/
function renderTableData(elem, datas, cols){
	$("tbody").animate({opacity : 1}, 400);		//表格数据添加动画
	elem.children().remove();					
	let str = "";
	datas.slice(0, pageSize).forEach((item, index) => {
		str+="<tr>"
		for(var i = 0, len = cols.length; i < len; i++){
			str += "<td>"+item[cols[i]]+"</td>"
		}
		str+="</tr>";
	})
   	elem.html(str);
}


/**
*渲染隐患值图
*/
function renderCharts(chartRootElem, chartColumn, xAxisItem, datas){

	option = null;
	var perilFindData = datas.hiddenTroubleFind;    //隐患发现数据
	var perilCheckData = datas.hiddenTroubleCheck;    //隐患排查数据
	option = {
		title:{
			text: '隐患值\n\n单位：件',
			textStyle:{
				color:'white',
				verticalAlign:'top',
				fontSize:0.2*rem
			}
		},
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        data: chartColumn,
	        textStyle:{
	            color:'white',
	            fontSize:0.3*rem
	        },
	        bottom:0,  				//放在图表底部
	        padding:[5, 0.5*rem]
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '8%',
	        containLabel: true,
	        show:true               //显示图表边框
	    },
	    xAxis:  {
	        type: 'category',
	        splitLine:{
	            show:true,
	            lineStyle:{
	                width:2,
	                type:'dotted'  //'dotted'虚线 'solid'实线
	            }
	        },
	        axisLabel: {  //y轴坐标字样式，rotate设置文字斜着显示
	            interval:0,
	            rotate:50,
	            color:'white',
	            fontSize:0.3*rem,
	            align:'right',
	            formatter: function (value, index) {            
	                //使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
	                return value;
	            },
	        },
	        data : xAxisItem
	    },
	    yAxis: {
	        splitLine:{
	            show:true,
	            lineStyle:{
	                width:2,
	                type:'dotted'  //'dotted'虚线 'solid'实线
	            }
	        },
	        axisLabel:{
	            color:'white',
	            fontSize:0.3 * rem,
	            formatter: function (value, index) {            
	                //使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
	                return value;
	            },
	        },
	        splitNumber:8,
	        type: 'value'
	    },
	    series: [
	    	{
	            name: '隐患排查',
	            type: 'bar',
	            stack: '总量',
	            color: '#1CD38D',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'insideRight'
	                }
	            },
	            data : perilCheckData
	       },
	        {
	            name: '隐患发现',
	            type: 'bar',
	            stack: '总量',
	            color: '#00A0E8',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'insideTopRight'
	                }
	            },
	            data : perilFindData
	        }    
	    ]
	};
	if (option && typeof option === "object") {
	    chartRootElem.setOption(option, true);
	}
}


function renderPieCharts(chartRootElem, datas){
	let legendData = datas.group;
	let seriesData = [];
	let obj = {};
	obj.type = 'pie';
	obj.radius = ['40%', '80%'];
	obj.selectMode = 'single';
	obj.data = [];
	
	obj.name = '';
	for(var i = 0, len = datas['groupProportion'].length; i < len; i++){
		let tmp = {};
		tmp.name = legendData[i];
		tmp.value = Number(datas['groupProportion'][i]);
		tmp.itemStyle ={color : pieColors[i],borderColor:'rgb(21,26,92,0.1)',borderWidth:10}
		tmp.labelLine = {length:0.5 * rem, length2:0.4 * rem};
		tmp.label = {
			align : 'center',
			normal : {
				fontSize : 0.3 * rem,
				formatter: [
					'{b}',
					'{c}件'
				].join('\n')
			}
		};
		obj.data.push(tmp);
	}
	seriesData.push(obj);
	let option = {
		title:{
			x:'left',
			padding: [10, 20],
			y:'top',
			text:'月隐患排查量（'+ (new Date().getMonth() + 1)+'月）',
			align:'center',
			verticalAlign:'middle',
			textStyle:{
				color:'#FFF',
				fontSize:0.25*rem
			}
		},
	    tooltip: {
	        trigger: 'item',
	        formatter: "{b}: {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        x: 'left',
	        show:false,
	        data:legendData
	    },
	    series:seriesData
	};

	if (option && typeof option === "object") {
	    chartRootElem.setOption(option, true);
	}
}

/**
*
* 处理数据
*/
function handlerData(data, pageSize){
	pageSize = pageSize >= data.length ? data.length : pageSize;
	var tmp = data.slice(0, pageSize);
	data.splice(0, pageSize);
	for(var i = 0, len = tmp.length; i < len; i++){
		data.push(tmp[i]);
	}
	return data;
}

/**
* 获取后端返回数据，1.表格数据缓存到本地；2.绘制图
*/
function getBackendData(myChart, myChartPie){
	clearInterval(timeId);
	ajax(baseUrl).then(res => {
		hiddentroubleFindListData = res.data.hiddenTroubleFindListData;
		hiddentroubleCheckListData = res.data.hiddenTroubleCheckListData;

    	renderTableData($(".tb1 tbody"), hiddentroubleFindListData, 
    		["potentialRisk","potentialRiskDate","findUser","group","potentialRiskContent"]);
    	renderTableData($(".tb2 tbody"), 
				hiddentroubleCheckListData,['potentialRisk','checkUser','finishDate','group','status']);
    	timeId = setInterval(function(){
    		hiddentroubleFindListData = handlerData(hiddentroubleFindListData, pageSize);
    		hiddentroubleCheckListData = handlerData(hiddentroubleCheckListData, pageSize);
    		renderTableData($(".tb1 tbody"), hiddentroubleFindListData, ["potentialRisk","potentialRiskDate","findUser","group","potentialRiskContent"]);
    		renderTableData($(".tb2 tbody"), hiddentroubleCheckListData,['potentialRisk','checkUser','finishDate','group','status']);
    	}, changeDataTimeInterval);
    	renderCharts(myChart, chartColumn, xColumNameData, res.data.hiddenTroubleValueData);
    	renderPieCharts(myChartPie,  res.data.hiddenTroubleFindData);
    });
}




//jQuery ready function start
$(function(){
	setLink($(".header_left img"));
	currentDateObj = $('.timeText');
	timingDate();
	xColumNameData = calcXColumNameData();
	var myChart = echarts.init($("#container").get(0));	//柱状图根元素
	var myChartPie = echarts.init($("#containerPie").get(0));	//饼形图根元素

	getBackendData(myChart, myChartPie);

	//定时从后端获取数据
	getBackendTimeID = setInterval(function(){
    	clearInterval(timeId);
		$("tbody").animate({opacity:"0"},changeDataTimeInterval,function(){
			getBackendData(myChart, myChartPie);
		});
    	
    },getChartDataTimeInterval);
}); //jQuery ready function end