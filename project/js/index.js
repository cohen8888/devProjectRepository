baseUrl = baseUrl + "/api/";
function setData(data,opt){
	for( k in data){
		opt[k] = data[k];
	}
	return opt;
}
let deviceRunStatusChartColors = ['rgb(37,218,190)','rgb(83,28,97)','rgb(52,221,249)','rgb(51,140,221)']

/**
* 日常现场图对象1
*/
function generateDailyLive1Chart(chartRootElem, datas){
	let legendData = datas.list.map((item,index)=>{return item.name});
	let seriesData = datas.list.map((item,index)=>{
		if(item.name === "故障"){
			return setData(item,{
				itemStyle:{
					color:"rgb(233,106,121)"
				},
			})
		}else{
			return setData(item,{
				itemStyle:{
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 1,
						y2: 1,
						colorStops: [{
							offset: 0, color: "rgb(223,230,118)" // 0% 处的颜色
						}, {
							offset: 1, color: "rgb(139,235,152)" // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
					}
				},
				 areaStyle: {
		            color: {
		                type: 'linear',
		                x: 0,
		                y: 0,
		                x2: 0,
		                y2: 1,
		                colorStops: [{
		                    offset: 0, color: 'rgb(101,67,97)' // 0% 处的颜色
		                }, {
		                    offset: 1, color: 'rgb(64,33,86)' // 100% 处的颜色
		                }],
		                globalCoord: false // 缺省为 false

		            }
		        },
				label:{
					color:"rgb(224,230,117)"
				}
			})
		}
	})
	let option = {
		title:{
			text:datas.title,
			textStyle:{
				color : "white",
				fontWeight:100,
				fontSize : 0.3 * rem,
				lineHeight : 0.68 * rem
			},
			bottom : 0.2 * rem,
			x : "center"
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		legend: {
	        orient: 'horizontal',
	        itemGap : 0.16 * rem,
	        itemWidth : 0.2 * rem,
	        itemHeight : 0.2 * rem,
	        icon : "circle",
	        x : 'center',
	        data : legendData,
	        bottom : 0.68 * rem,
	        textStyle : {
	        	color : "#ccc",
	        	fontSize : 0.25 * rem,
	        }
	    },series: [{
	        name : '维修/故障',
	        type : 'pie',
	        radius : ["center", 1.25*rem],
	        center : ["center",2.20*rem],
	        avoidLabelOverlap: false,
	        label: {
	            normal: {
	                show: false,
	                position: 'center',
	                formatter:'{c}'
	            },
	            emphasis: {
	            	show:true,
	                textStyle: {
	                    fontSize: 0.8 * rem,
	                    fontWeight: 700,
	                }
	            }
	        },
	        labelLine: {
	            normal: {
	                show: false
	            }
	        },
	        data:seriesData
	    }]
	}
	if (option && typeof option === "object") {
	    chartRootElem.setOption(option, true);
	}
}

/**
* 日常现场图对象2
*/
function generateDailyLive2Chart(chartRootElem, datas){
	//颜色对象
	let colorObj = {
		"hasCheck":{itemStyle:{
        	color: {
			    type: 'linear',
			    x: 0,
			    y: 0,
			    x2: 1,
			    y2: 1,
			    colorStops: [{
			        offset: 0, color: "rgb(223,230,118)" // 0% 处的颜色
			    }, {
			        offset: 1, color: "rgb(139,235,152)" // 100% 处的颜色
			    }],
			    globalCoord: false // 缺省为 false
				}
    		},
	    	emphasis:{
	    		show:true
	    	},
	    	label:{
    			color:"rgb(224,230,117)"
    		}
		},
		"checking":{itemStyle:{
            	color:"rgb(233,106,121)"
            }
		},
		"workOrder":{
			itemStyle:{color:"rgb(174,126,249)"}
		}
	}
	let legendData = datas.list.map((item,index) => {return item.name});
	let seriesData = datas.list.map((item,index)=>{
		return setData(item,colorObj[item.code]);
	});
	let option = {
		title:{
			text:"故障",
			textStyle:{
				color:"white",
				fontWeight:100,
				fontSize:0.3*rem,
				lineHeight:0.68*rem
			},
			bottom:0.2*rem,
			x:"center"
		},
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} <br/>{b}: {c} ({d}%)"
	    },
	    legend: {
	        orient: 'horizontal',
	        itemGap:2,
	        itemWidth:0.2*rem,
	        itemHeight:0.2*rem,
	        icon:"circle",
	        x:'center',
	        data:legendData,
	        bottom:0.68*rem,
	        textStyle:{
	        	color:"#ccc",
	        	fontSize:0.25*rem,
	        }
	    },
	    series: [
	        {
	            name:'维修/故障',
	            type:'pie',
	            radius: ["center", 1.25*rem],
	            center:["center",2.2*rem],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false,
	                    position: 'center',
	                    formatter:'{c}'
	                },
	                emphasis: {
                    	show:true,
	                    textStyle: {
	                        fontSize: 0.8*rem,
	                        fontWeight: 700,
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            data:seriesData
	        }
	    ]
	};
	if (option && typeof option === "object") {
	    chartRootElem.setOption(option, true);
	}
}

/**
*日常现场列表
*
*/
function generateDailyLiveTableList(chartRootElem, datas){
	let tableData = datas;
	let str = "";
	tableData.forEach((item,index)=>{
		str += `<tr>`;
		str += `<td>${item.checkLine}</td>`;
		str += `<td>${item.status}</td>`;
		str += `<td class=${item.resultCode}>${item.result}</td>`;
		str += `</tr>`;
	})
	chartRootElem.html(str);
}

/**
* 本月班组绩效图
*/
function generateCurrentMonthGroupPerformanceChart(chartRootElem, datas){
	let pedingArr = [];
	let badwork = [];
	let stopwork = [];
	for(var i = 0 ; i < datas.length ; i++){
		for(var j = 0 ; j < datas[i].data.length; j++){
			if(datas[i].data[j].name == "进行中"){
				pedingArr.push(datas[i].data[j].value)
			}else if(datas[i].data[j].name == "故障"){
				badwork.push(datas[i].data[j].value)
			}else{
				stopwork.push(datas[i].data[j].value)
			}
		}
	}
	let opttion = {
		xAxis:  {
			type: 'category',
			splitLine:{
				show:false,
				lineStyle:{
						width:2,
						type:'dotted'  //'dotted'虚线 'solid'实线
				}
			},
			axisLabel: {  //y轴坐标字样式，rotate设置文字斜着显示
				interval:0,
				color:'white',
				fontSize:0.3*rem,
				align:'center',
				formatter: function (value, index) {
						//使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
						return value;
				},
			},
			data : datas.map((item,index)=>{return item.group})
		},
		yAxis: {
				splitLine:{
					show:false,
					lineStyle:{
							width:2,
							type:'dotted'  //'dotted'虚线 'solid'实线
					}
				},
				axisLabel:{
						color:'white',
						fontSize:0.3*rem
				},
				type: 'value'
		},
		series: [
			{
				name: '',
				type: 'bar',
				stack: '总量',
				label: {
					normal: {
							show: true,
							position: 'inside'
					}
				},
				itemStyle:{
					color: new echarts.graphic.LinearGradient(
						0, 0, 0, 1,
						[
							{offset: 0, color: '#653ea2'},
							{offset: 0.5, color: '#392168'},
							// {offset: 1, color: '#ddd'}
						]
					)
				},
				data : pedingArr
			},
			{
				name: '',
				type: 'bar',
				stack: '总量',
				label: {
					normal: {
						show: true,
						position: 'inside'
					}
				},
				itemStyle:{
					color:'#3b92da'
				},
				data : badwork
			},{
				name: '',
				type: 'bar',
				stack: '总量',
				label: {
					normal: {
						show: true,
						position: 'inside'
					}
				},
				itemStyle:{
					color:'#38dabb'
				},
				data : stopwork
			}

		]
	};
	if (opttion && typeof opttion === "object") {
			chartRootElem.setOption(opttion, true);
	}
}

/**
* 人员绩效列表
*/
function personPerformanceList(listRoot, data){
	let lis = `<li>
		<img src="img/绩效1.png"/>
		<p>${data.first.name}</p>
		<p>工号：${data.first.workId}</p>
	</li>
	<li>
		<img src="img/绩效2.png"/>
		<p>${data.second.name}</p>
		<p>工号：${data.second.workId}</p>
	</li>
	<li>
		<img src="img/绩效3.png"/>
		<p>${data.third.name}</p>
		<p>工号：${data.third.workId}</p>
	</li>`
	listRoot.html(lis);
}


/**
*设备运行状态
*/
function deviceRunStatusChart(chartRootElem, datas, title){
	let legendData = [];
	let seriesDataObj = {};
	seriesDataObj.name = title;
	seriesDataObj.type = 'pie';
	seriesDataObj.radius = ['45%','65%'];
	seriesDataObj.selectedMode = 'single';
	seriesDataObj.avoidLabelOverlap = false;
    seriesDataObj.data = [];
    datas.forEach((item, index) => {
		legendData.push(item.name);
		let dataObj = {};
		dataObj.name = item.name;
		dataObj.value = item.value;
		dataObj.label = {
			normal:{
				show:true,
				formatter: '{c}\n{b}',
				fontSize: 0.2 * rem,
				color: 'white',
				align: 'center',
				position: 'inside',
			},
			emphasis: {
			    show: true,
			    textStyle: {
			        fontSize: 0.25 * rem,
			        fontWeight: 'bold'
			    }
			}
		};
		dataObj.itemStyle = {
			color:deviceRunStatusChartColors[index],
        	label : { 
        		show : true,
	            position : 'center'
	        },
			labelLine : { 
				show : true
        	}
		}
		dataObj.labelLine = {
			show: false
		}
		seriesDataObj.data.push(dataObj);
	});
	let option = {
		title : {
			text: title,
	        textStyle: {
	            color: 'white'
	        }
		},
		tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	    	show:false,
	        data: legendData
	    },
	    series:[
	    	seriesDataObj
	    ]
	};

	if (option && typeof option === "object") {
		chartRootElem.setOption(option, true);
	}
}


/**
* 事件告警图,需要修改，与原图不符
*/
function eventAlarmChart(datas){
	let color = ['rgb(84,219,187)','rgb(73,144,221)','rgb(85,25,110)','rgb(34,2,45)'];
	let sum = 0;
	datas.list.forEach(item=>{
		sum += item.value
	})
	datas.list.forEach((item,index)=>{
		$(".pie_eachrts5 ul")
		.append($("<li/>").css("width",item.value/sum*100+"%")
			.append($("<div/>").css("background",color[index]).attr("class","kitem")).
			append($("<p/>").html(item.name).attr("class","titem")));
		
	});
}


/**
* 人学员信息图
*/
function personInfoChart(chartRootElem, datas){
	let option = {
		series: [{
			type:'pie',
			center: [("65%"), 1.15*rem],
			radius:[0.65*rem,0.95*rem],
			avoidLabelOverlap: false,
			label: {
				normal: {
					show: true,
					position: 'center',
					formatter:'现场\n\n' + datas.workCount + '/' + datas.workSum,
				}
			},
			data:[{
				value:datas.workSum - datas.workCount,
				name:"今日缺勤",
				itemStyle:{
					color:"#f27432"
				}
			},{
				value:datas.workCount,
				name:'今日当班',
				itemStyle:{
					color: "#fba97c"
				},
				label:{
					show:true,
					position:"outside",
					formatter:function(params){
						let str = "";
						str += params.name;
						str += "\n";
						str += datas.workGroup;
						return str;
					},

				},
				labelLine:{
					show:true,
					length:6,
					length2:0.8*rem
				}
			}]
		}]
	};
	if (option && typeof option === "object") {
		chartRootElem.setOption(option, true);
	}
}

/**
* 实时监控
*/
function realtimeMonitoring(chartRootElem, datas){
	let colors = ['red', 'yellow', 'blue','green'];
	let xAxisItem = ['00:00', '02:00','04:00','08:00','10:00','12:00','14:00',
        '16:00','18:00','20:00','22:00','24:00'];
	/*var xAxisItem =  datas.list[0].data.map((item,index)=>{
		return item.time;
	});
	console.log(xAxisItem);*/
	//图表x轴区间及刻度名称
	let seriesData = datas.list.map(item=>{
		let obj = {};
		obj.type = "line",
		obj.name = item.watchLine;
		obj.data = item.data.map(key=>{return key.value});
		return obj ;
	});

	let option = {
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
                fontSize:0.15*rem
            },
            bottom:0,
	        data:datas.list.map(item=>{return item.watchLine})
	    },
	    grid: {
	        top: 0.10*rem,
	        bottom: 0.8*rem
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
	                fontSize:0.15*rem,
	                align:'right',
	                formatter: function (value, index) {
	                    //使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
	                    return value;
	                },
	            },
	            axisPointer: {
	                label: {
	                	fontSize:0.15*rem,
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
	                fontSize:0.15*rem,
	                formatter: '{value} ℃'
	            }

	        }
	    ],
	    series:seriesData
	};
	if (option && typeof option === "object") {
		chartRootElem.setOption(option, true);
	}
}
 /**
 *安全隐患
 */
function safeHiddenTroubleTableList(rootElem, datas){
	let tableData = datas.list;
	let str = "";
	tableData.forEach((item,index)=>{
		str+=`<tr>`;
		str+=`<td>${item.troubleCode}</td>`;
		str+=`<td>${item.findTime}</td>`;
		str+=`<td>${item.troubleContent}</td>`;
		str+=`<td>${item.findWorker}/${item.findWorkerGroup}</td>`;
		str+=`</tr>`
	})
	rootElem.html(str);
}

$(function(){
	currentDateObj = $('.timeText');
	timingDate();
	
	ajax(baseUrl,"index").then(res=>{
		//日常现场图1
		let myDaliyLive1Echart = echarts.init($(".pie_eachrts1").get(0));
		generateDailyLive1Chart(myDaliyLive1Echart, res.data.rcxc.maintain);
		//日常现场图2
		let myDaliyLive2Echart = echarts.init($(".pie_eachrts2").get(0));
		generateDailyLive2Chart(myDaliyLive2Echart, res.data.rcxc.malfunction);
		//日常现场列表
		generateDailyLiveTableList($(".tb1 tbody"), res.data.rcxc.list);
		//本月班组绩效
		let myCurrentMonthGroupPerformanceChart = echarts.init($(".pie_eachrts3").get(0));
		generateCurrentMonthGroupPerformanceChart(myCurrentMonthGroupPerformanceChart, res.data.bzjx.list);
		//人员绩效列表
		personPerformanceList($(".medal"), res.data.bzjx.rack);
		//设备运行状态图——需要修改
		$(".pie_deviceRunStatus").each((index, elem) => {
			deviceRunStatusChart(echarts.init(elem), res.data.sbzt.list[index].data,res.data.sbzt.list[index].type);
		});

		//事件告警图
		eventAlarmChart(res.data.sjgj);
		//人员信息图
		let mypersonInfoEchart = echarts.init(document.querySelector(".pie_eachrts6"));
		personInfoChart(mypersonInfoEchart, res.data.ryxx);
		//实时监控
		var myrealtimeMonitoringChart = echarts.init($("#indexMonitoring").get(0));
		realtimeMonitoring(myrealtimeMonitoringChart, res.data.ssjk);
		//安全隐患
		safeHiddenTroubleTableList($(".tb2 tbody"), res.data.aqyh);
	});
});


