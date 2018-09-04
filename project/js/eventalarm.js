/**
* author : Cohen.Lee
* date : 2018-09-03
* 
*/

$(function(){
	var container = $("#container");
	var myChart = echarts.init(container.get(0));
	var app = {};
	var option = null;
	var colors = ['#5793f3', '#d14a61', '#675bba'];

	var xAxisItem =  ['00:00', '02:00','04:00','08:00','10:00','12:00','14:00',
        '16:00','18:00','20:00','22:00','24:00'];   //图表x轴区间及刻度名称

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
                fontSize:30
            },
	        data:['类型1', '类型2','类型3','类型4']
	    },
	    grid: {
	        top: 70,
	        bottom: 50
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
	            axisLabel: {  //y轴坐标字样式，rotate设置文字斜着显示
	                interval:0,
	                rotate:50,
	                color:'white',
	                fontSize:30,
	                align:'right',
	                formatter: function (value, index) {            
	                    //使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
	                    return value+"点";
	                },
	            },
	            axisPointer: {
	                label: {
	                    formatter: function (params) {
	                        return '降水量  ' + params.value
	                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
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
	        },
	        {
	            type: 'category',
	            show:false,
	            axisTick: {
	                alignWithLabel: true
	            },
	            axisLine: {
	                onZero: false,
	                lineStyle: {
	                    color: colors[0]
	                }
	            },
	            axisPointer: {
	                label: {
	                    formatter: function (params) {
	                        return '降水量  ' + params.value
	                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
	                    }
	                }
	            },
	            data:xAxisItem
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            axisLabel:{
	                color:'white',
	                fontSize:30
	            }
	        }
	    ],
	    series: [
	        {
	            name:'类型1',
	            type:'line',
	            xAxisIndex: 1,
	            smooth: false,
	            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
	        },
	        {
	            name:'类型2',
	            type:'line',
	            smooth: false,
	            data: [63.9, 7.9, 4.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 16.4, 10.3, 0.7]
	        },
	        {
	            name:'类型3',
	            type:'line',
	            smooth: false,
	            data: [16.9, 3.9, 1.1, 18.7, 28.3, 49.2, 21.6, 6.6, 5.4, 18.4, 10.3, 0.7]
	        },
	        {
	            name:'类型4',
	            type:'line',
	            smooth: false,
	            data: [23.9, 4.9, 7.1, 8.7, 48.3, 69.2, 31.6, 4.6, 22.4, 19.4, 20.3, 0.4]
	        }
	    ]
	};

	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	}
});	//jquery ready end;