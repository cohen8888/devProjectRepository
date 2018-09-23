/**
* 安全隐患模块
*
*
*/

baseUrl = baseUrl + "/api/";
let changeDataTimeInterval = 3000;								//切换数据时间
let getChartDataTimeInterval = 15000;							//从后端取数据的间隔时间	
let pageSize = 5;												//表格显示最大数据
let chartColumn = ['隐患排查', '隐患发现'];	
let xColumNameData =['00:00', '02:00','04:00','06:00','08:00','10:00',
	'12:00','14:00','16:00','18:00','20:00','22:00','24:00'];	//图形x轴刻度标签值
let timeId1 = null;
let timeId2 = null;
let data1 = null;
let data2 = null;

/**
* 渲染表格数据
*
*/
function renderTableData(elem, datas, cols){
	$("tbody").animate({opacity:1},400);
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
	var perilFindData = datas.map((item,index)=>{return item.data[0].val});    //隐患发现数据
	var perilCheckData = datas.map((item,index)=>{return item.data[1].val});    //隐患排查数据
	option = {
		title:{

			text: '隐患值',
			textStyle:{
				color:'white',
				verticalAlign:'top'
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
	            fontSize:0.4*rem
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
	                return value + '天';
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

function renderTroubleFindChart(chartRootElem, tooltip, ){
	let option = null;
	option = {
		tooltip: {
        	trigger: 'item',
        	formatter: "{a} <br/>{b}: {c} ({d}%)"
    	},
    	legend: {
        	orient: 'vertical',
        	x: 'left',
        	data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    	}

	}
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

function getBackendListData(){
	ajax(baseUrl,"safetyperll").then(res => {
		clearInterval(timeId1);
		clearInterval(timeId2);
    	data1 = res.data;
    	renderTableData($(".tb1 tbody"), data1, 
    		["potentialRisk","potentialRiskDate","findUser","group","potentialRiskContent"]);
    	timeId1 = setInterval(function(){
    		data1 = handlerData(data1, pageSize);
    		renderTableData($(".tb1 tbody"), data1, ["potentialRisk","potentialRiskDate","findUser","group","potentialRiskContent"]);
    	}, changeDataTimeInterval);
    	
    });
	ajax(baseUrl,"safetyperres").then(res=>{
		clearInterval(timeId1);
		clearInterval(timeId2);
		data2 = res.data;
		renderTableData($(".tb2 tbody"), 
				data2,['potentialRisk','checkUser','finishDate','group','status']);
		timeId2 = setInterval(function(){
			data2 = handlerData(data2, pageSize);
			renderTableData($(".tb2 tbody"), 
				data2,['potentialRisk','checkUser','finishDate','group','status']);
    	}, changeDataTimeInterval);
		
	});
}

function getBackendData(myChart){
	getBackendListData();
	ajax(baseUrl,"safeecharts").then(res=>{
		renderCharts(myChart, chartColumn, xColumNameData, res.data);
	});
}

$(function(){

	setLink($(".header_left dl"));
	currentDateObj = $('.timeText');
	timingDate();

    var myChart = echarts.init($("#container").get(0));	//展示图DOM元素
    getBackendListData();
    getBackendData(myChart);
    
    setInterval(function(){
    	clearInterval(timeId1);
    	clearInterval(timeId2);
		$("tbody").animate({opacity:"0"},changeDataTimeInterval,function(){
			getBackendData(myChart);
		})
    	
    },getChartDataTimeInterval);
	    
    
});//jquery ready function end;