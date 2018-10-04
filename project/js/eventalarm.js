/**
* author : Cohen.Lee
* date : 2018-09-03
* 
*/
//baseUrl = baseUrl + "interf02";
baseUrl = baseUrl + "/api/eventalarm";
let lineColors = ['#F2DEF2', '#E8D897', '#AAD5B3', '#83F0FE', '#D6B9F2'];
let eventDataCache = [];
let pageSize = 16;
let xColumNameData =['周一', '周二','周三','周四','周五','周六','周日'];	//图形x轴刻度标签值
/**
*
* 事件类型折线图
*/
function generateChart(datas, chartRootElem){
	//图表x轴区间及刻度名称
	var dataOpt = datas.echartVal.map((item,index)=>{
		var obj = {
			 name:item.type,
			 type:"line",
			 data:item.val.map((key,val)=>{
				 return key.val;
			 })
		}
		return obj;
	});
	let option = {
    	color: lineColors,
	    tooltip: {
	        trigger: 'item',
	    },
	    title:{
			x:'left',
			padding: [ 0.5 * rem, 0.2 * rem],
			y:'top',
			text:'单位:天',
			align:'center',
			verticalAlign:'bottom',
			textStyle:{
				color:'#FFF',
				fontSize:0.25*rem
			}
		},
		grid: {
			left: '5%',//距离div左边的距离
			right: '4%',//距离div右边的距离
			bottom: '10%',//距离下面
			containLabel: true
		},
	    legend: {
	    	left:'center',
			padding:[0.1 * rem, 2.9 * rem],
			itemWidth:0.5 * rem,
			itemHeight:0.2 * rem,
			textStyle:{
				color:'white',
				fontSize : 0.3 * rem,
				width:0.3 * rem
			},
			bottom:'0%',
			data:datas.echartVal.map((item,index) => {
				return item.type;
			})
	    },
	    xAxis: [
	        {
	            type: 'category',
	            show: true, 
	            boundaryGap:false,
	            axisLine: {
	                onZero: true,

	                lineStyle: {
	                	color:'white',
	                	type:'solid'
	                }
	            },
	            axisLabel: {  //x轴坐标字样式，rotate设置文字斜着显示
	                interval : 0,
	                rotate : 50,
	                color: 'white',
	                fontSize : 0.4 * rem,
	                align : 'right',
	                formatter: function (value, index) {            
	                    //使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
	                    return value;
	                },
	            },
	            axisPointer: {
	                label: {
	                	fontSize:0.3 * rem,
	                    formatter: function (params) {
	                        return '温度  ' + params.value
	                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
	                    }
	                }
	            },
	            splitLine:{
	                show:true,
	                lineStyle:{
	                    width:1,
	                    type:'dotted'  //'dotted'虚线 'solid'实线
	                }
	            },
	            data: xColumNameData
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            axisLine: {
	                onZero: false,
	                lineStyle: {
	                	color:'white',
	                	type:'dotted'
	                }
	            },
				interval:10,
	            axisLabel:{
	                color:'white',
	                fontSize:0.3 * rem,
	                formatter: '{value}(件)'
	            },
	            splitLine:{
	                show:true,
	                lineStyle:{
	                    width:1,
	                    type:'dotted'  //'dotted'虚线 'solid'实线
	                }
	            }
	            
	        }
	    ],
	    series: dataOpt
	};

	if (option && typeof option === "object") {
	    chartRootElem.setOption(option, true);
	}

}

/**
* 事件告警数据列表
*/
function generateTableList(data, tableElem){
	tableElem.children().remove();		
	let str1 = ""
	let p = data.length > pageSize ? pageSize : data.length;
	data.slice(0, p).forEach((item,index)=>{
			str1+="<tr>"
			str1+="<td>"+(index+1)+"</td>";
			str1+="<td>"+item.alarmType+"</td>";
			str1+="<td>"+item.alarmContent+"</td>";
			str1+="<td>"+item.alarmDatetime+"</td>";
			str1+="<td>"+item.submitUsername+"</td>";				
			str1+="<td>"+item.traceUsername+"</td>";
			str1+="<td>"+item.status+"</td>";
			str1+="</tr>";
	})
	tableElem.html(str1);
}

function generateQryListData(data, selectElem){
	selectElem.children().remove();
	selectElem.append('<option value="default" >事件类型</option>');
	data.forEach((elem, index) => {
		selectElem.append('<option value="'+elem+'" >'+elem+'</option>');
	})
}
/**
* 获取数据去除重复
*/
function ArrayAppointColUnique(colName, arrs){
	var results = [];
    var keys = {};
    for (var i = 0; i < arrs.length; i++) {
        var val = arrs[i][colName];
        if (!keys[val]) {
            keys[val] = true;
            results.push(val);
        }
    }
    return results;
}

$(function(){

	setLink($(".header_left img"));
	currentDateObj = $('.timeText');
	timingDate();

	var container = $("#container");
	var myChart = echarts.init(container.get(0));
	var option = null;
	
	ajax(baseUrl).then(res=>{
		eventDataCache = res.data.tableVal;
		console.log(eventDataCache)
		generateQryListData(ArrayAppointColUnique('alarmType', eventDataCache), $('#eventType'));
		$('#eventType').on('change', (event) => {
			let findEventType = event.target.value;
			let findResult = [];
			console.log(findEventType);
			if (findEventType == 'default'){
				findResult = eventDataCache;
			}else{
				for(let i = 0, len = eventDataCache.length; i < len; i++){
					if (findEventType == eventDataCache[i]['alarmType']){
						findResult.push(eventDataCache[i]);
					}
				}
			}
			generateTableList(findResult, $(".tb1 tbody"));
		})
		generateTableList(res.data.tableVal, $(".tb1 tbody"));
	 	generateChart(res.data, myChart);
	
	});
}); //jquery ready end;



/*
let tmpData = {
	"tableVal":[
	{
		"orderNum":"01",
		"alarmType":"类型一",
		"alarmContent":"内容一",
		"alarmDatetime":"12:23:00",
		"submitUsername":"王天华",
		"traceUsername":"李想",
		"status":"正常"
	},
	{
		"orderNum":"01",
		"alarmType":"类型二",
		"alarmContent":"内容一",
		"alarmDatetime":"12:23:00",
		"submitUsername":"王天华",
		"traceUsername":"李想",
		"status":"正常"
	},
	{
		"orderNum":"01",
		"alarmType":"类型二",
		"alarmContent":"内容一",
		"alarmDatetime":"12:23:00",
		"submitUsername":"王天华",
		"traceUsername":"李天一",
		"status":"正常"
	},
	{
		"orderNum":"01",
		"alarmType":"类型一",
		"alarmContent":"内容一",
		"alarmDatetime":"12:23:00",
		"submitUsername":"王天华",
		"traceUsername":"李天一",
		"status":"正常"
	},{
		"orderNum":"01",
		"alarmType":"类型一",
		"alarmContent":"内容一",
		"alarmDatetime":"12:23:00",
		"submitUsername":"王天华",
		"traceUsername":"张孝廉",
		"status":"正常"
	},
	{
		"orderNum":"01",
		"alarmType":"类型三",
		"alarmContent":"内容一",
		"alarmDatetime":"12:23:00",
		"submitUsername":"王天华",
		"traceUsername":"张孝廉",
		"status":"正常"
	},
	{
		"orderNum":"01",
		"alarmType":"类型三",
		"alarmContent":"内容一",
		"alarmDatetime":"12:23:00",
		"submitUsername":"王天华",
		"traceUsername":"张孝廉",
		"status":"正常"
	},
	{
		"orderNum":"01",
		"alarmType":"类型一",
		"alarmContent":"内容一",
		"alarmDatetime":"12:23:00",
		"submitUsername":"王天华",
		"traceUsername":"张三",
		"status":"正常"
	},
	{
		"orderNum":"01",
		"alarmType":"类型二",
		"alarmContent":"内容一",
		"alarmDatetime":"12:23:00",
		"submitUsername":"王天华",
		"traceUsername":"李天一",
		"status":"正常"
	},
	{
		"orderNum":"03",
		"alarmType":"类型二",
		"alarmContent":"内容一",
		"alarmDatetime":"12:23:00",
		"submitUsername":"王天华",
		"traceUsername":"李天一",
		"status":"正常"
	},
	{
		"orderNum":"01",
		"alarmType":"类型三",
		"alarmContent":"内容一",
		"alarmDatetime":"12:23:00",
		"submitUsername":"王天华",
		"traceUsername":"李天一",
		"status":"正常"
	},
	{
		"orderNum":"01",
		"alarmType":"类型一",
		"alarmContent":"内容一",
		"alarmDatetime":"12:23:00",
		"submitUsername":"王天华",
		"traceUsername":"李天一",
		"status":"正常"
	},
	{
		"orderNum":"01",
		"alarmType":"类型四",
		"alarmContent":"内容一",
		"alarmDatetime":"12:23:00",
		"submitUsername":"王天华",
		"traceUsername":"李天一",
		"status":"正常"
	},
	{
		"orderNum":"01",
		"alarmType":"类型四",
		"alarmContent":"内容一",
		"alarmDatetime":"12:23:00",
		"submitUsername":"王天华",
		"traceUsername":"李天一",
		"status":"正常"
	},
	{
		"orderNum":"01",
		"alarmType":"类型一",
		"alarmContent":"内容一",
		"alarmDatetime":"12:23:00",
		"submitUsername":"王天华",
		"traceUsername":"李天一",
		"status":"正常"
	}
	],
	"echartVal":[
		{
			"type":"类型1",
			"val":[{
				"time":"00:00",
				"val":"21"
			},{
				"time":"02:00",
				"val":"2"
			},{
				"time":"04:00",
				"val":"24"
			},{
				"time":"06:00",
				"val":"4"
			},{
				"time":"08:00",
				"val":"22"
			},{
				"time":"10:00",
				"val":"22"
			},{
				"time":"12:00",
				"val":"6"
			},{
				"time":"14:00",
				"val":"22"
			},{
				"time":"16:00",
				"val":"10"
			},{
				"time":"18:00",
				"val":"22"
			},{
				"time":"20:00",
				"val":"23"
			},{
				"time":"22:00",
				"val":"35"
			},{
				"time":"24:00",
				"val":"22"
			}]
		},
		{
			"type":"类型2",
			"val":[{
				"time":"00:00",
				"val":"1"
			},{
				"time":"02:00",
				"val":"32"
			},{
				"time":"04:00",
				"val":"4"
			},{
				"time":"06:00",
				"val":"7"
			},{
				"time":"08:00",
				"val":"21"
			},{
				"time":"10:00",
				"val":"32"
			},{
				"time":"12:00",
				"val":"32"
			},{
				"time":"14:00",
				"val":"21"
			},{
				"time":"16:00",
				"val":"1"
			},{
				"time":"18:00",
				"val":"3"
			},{
				"time":"20:00",
				"val":"6"
			},{
				"time":"22:00",
				"val":"15"
			},{
				"time":"24:00",
				"val":"32"
			}]
		},
		{
			"type":"类型3",
			"val":[{
				"time":"00:00",
				"val":"0"
			},{
				"time":"02:00",
				"val":"3"
			},{
				"time":"04:00",
				"val":"8"
			},{
				"time":"06:00",
				"val":"10"
			},{
				"time":"08:00",
				"val":"15"
			},{
				"time":"10:00",
				"val":"7"
			},{
				"time":"12:00",
				"val":"8"
			},{
				"time":"14:00",
				"val":"6"
			},{
				"time":"16:00",
				"val":"5"
			},{
				"time":"18:00",
				"val":"3"
			},{
				"time":"20:00",
				"val":"2"
			},{
				"time":"22:00",
				"val":"16"
			},{
				"time":"24:00",
				"val":"1"
			}]
		},
		{
			"type":"类型4",
			"val":[{
				"time":"00:00",
				"val":"11"
			},{
				"time":"02:00",
				"val":"5"
			},{
				"time":"04:00",
				"val":"24"
			},{
				"time":"06:00",
				"val":"32"
			},{
				"time":"08:00",
				"val":"35"
			},{
				"time":"10:00",
				"val":"36"
			},{
				"time":"12:00",
				"val":"27"
			},{
				"time":"14:00",
				"val":"25"
			},{
				"time":"16:00",
				"val":"24"
			},{
				"time":"18:00",
				"val":"22"
			},{
				"time":"20:00",
				"val":"15"
			},{
				"time":"22:00",
				"val":"5"
			},{
				"time":"24:00",
				"val":"1"
			}]
		}
	]
};*/


