/**
* author : Cohen.Lee
* date : 2018-09-03
* 
*/

$(function(){
	let baseUrl = "http://localhost:3000/api/";
	let rem = document.documentElement.style.fontSize.substr(0,document.documentElement.style.fontSize.length-2)*1;
	var container = $("#container");
	var myChart = echarts.init(container.get(0));
	var app = {};
	var option = null;
	ajax(baseUrl,"eventAlarm").then(res=>{
		console.log(res);
		let str1 = ""
		res.data.tableVal.forEach((item,index)=>{
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
	    legend: {
	    	 textStyle:{
                color:'white',
                fontSize:15
                
            },
            bottom:'0',
	        data:res.data.echartVal.map((item,index)=>{
						return item.type;
					})
	    },
	    grid: {
	        top: 50,
	        bottom: 80
	    },
	    xAxis: [
	        {
	            type: 'category',
	            axisLine: {
	                onZero: false,
	                lineStyle: {
	                    color: colors
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
	    series: dataOpt
	};

	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	}
});
	})//jquery ready end;