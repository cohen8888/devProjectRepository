/**
* author : Cohen.Lee
* date : 2018-09-03
* 
*/
baseUrl = baseUrl + "/api/";

$(function(){
	setLink($(".header_left img"));

	currentDateObj = $('.timeText');
	timingDate();

	var container = $("#container");
	var myChart = echarts.init(container.get(0));
	var option = null;
	ajax(baseUrl,"eventAlarm").then(res=>{
		console.log(res);
		let str1 = ""
		res.data.tableVal.slice(0,16).forEach((item,index)=>{
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
		$(".tb1 tbody").html(str1);
	
	var colors = ['red', 'yellow', 'blue','green'];

	var xAxisItem =  res.data.echartVal[0].val.map((item,index)=>{
		return item.time;
	});   //图表x轴区间及刻度名称
	var dataOpt = res.data.echartVal.map((item,index)=>{
		var obj = {
			 name:item.type,
			 type:"line",
			 data:item.val.map((key,val)=>{
				 return key.val;
			 })
		}
		return obj;
	})
	option = {
    	color: colors,
	    tooltip: {
	        trigger: 'none',
	        axisPointer: {
	            type: 'cross'
	        }
	    },
		grid: {
			left: '5%',//距离div左边的距离
			right: '4%',//距离div右边的距离
			bottom: '5%',//距离下面
			containLabel: true
		},
	    legend: {
			padding:[2, 20],
			itemWidth:0.4 * rem,
			itemHeight:0.2 * rem,
			textStyle:{
				color:'white',
				fontSize : 0.3 * rem,
				width:0.3 * rem
			},
			bottom:'0',
			data:res.data.echartVal.map((item,index) => {
				return item.type;
			})
	    },
	    xAxis: [
	        {
	        	
	            type: 'category',
	            axisLine: {
	                onZero: false,
	                lineStyle: {
	                	color:'white',
	                	type:'dotted'
	                }
	            },
	            axisLabel: {  //x轴坐标字样式，rotate设置文字斜着显示
	                interval : 0,
	                rotate : 50,
	                color: 'white',
	                fontSize : 0.2 * rem,
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
	                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '')+'℃';
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
	            data: xAxisItem
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
	            axisLabel:{
	                color:'white',
	                fontSize:0.3 * rem,
	                formatter: '{value} ℃'
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
	    myChart.setOption(option, true);
	}
});
	})//jquery ready end;