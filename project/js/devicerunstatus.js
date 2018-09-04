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
	var xColumNameData = [{	//设备运行状态种类名称,
	        	value:"机电设备",
	        	textStyle: {
					color: 'white'
				}
	        }, {
	        	value:"照明设备",
	        	textStyle: {
					color: 'white'
				}
	        }, {
	        	value:"排水设备",
	        	textStyle: {
					color: 'white'
				}
	        }, {
	        	value:"风机设备",
	        	textStyle: {
					color: 'white'
				}
	        }, {
	        	value:"检测设备",
	        	textStyle: {
					color: 'white'
				}
	        }, {
	        	value:"安防设备",
	        	textStyle: {
					color: 'white'
				}
	        }];	
	var seriesData = [120, 300, 150, 80, 70, 110];	//柱状图数据，按顺序对应设备种类的名称
	
    //柱状图的颜色
	function columnarColor(params){
		//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组					
		var colorList = [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			offset: 0,
			color: '#99d9ea'
		}, {
			offset: 1,
			color: '#ffa7dc'
		}]),
		'rgb(42,170,227)',
		'rgb(25,46,94)',
		'rgb(195,229,235)',
		'rgb(195,229,235)',
		'rgb(195,229,235)'];
		return colorList[params.dataIndex];
	}
	//图形显示选项，必须是个对象
	option = {
	    xAxis: {
	        type: 'category',
	        axisLabel: {	//y轴坐标字样式，rotate设置文字斜着显示
	          	interval:0,
                rotate:40
            },
	        data: xColumNameData
	    },
	    yAxis: {
	        type: 'value'
	    },
	    series: [{
	        data: seriesData,
	        type: 'bar',
			label:{			//标签为在柱状图上面显示的数字	
        		normal:{
        			show:true,
        			position:'top',
        			textStyle: {
			            color: 'black'
			         }
        		}
        	},
	        itemStyle: {
        		normal:{
        			color:columnarColor
    			},
	            //鼠标悬停时：
	            emphasis: {
	                shadowBlur: 10,
	                shadowOffsetX: 0,
	                shadowColor: 'rgba(0, 0, 0, 0.5)'
	            }
			}
	    }]
    	
	};

	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	}
});	//jquery ready end;