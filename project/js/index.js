baseUrl = baseUrl + "/api/index";

let videoUrls = ['video/video1.mp4',
	'video/video2.mp4',
	'video/video3.mp4',
	'video/video4.mp4'];
//let videoUrls = ['http://localhost:3000/video/rcxc.mp4','http://localhost:3000/video/rcxc.mp4','http://localhost:3000/video/rcxc.mp4','http://localhost:3000/video/rcxc.mp4'];

function setData(data ,opt){
	for( k in data){
		opt[k] = data[k];
	}
	return opt;
}
let giftImageUrls = ['img/绩效1.png', 'img/绩效2.png', 'img/绩效3.png']
let deviceRunStatusChartColors = ['#38DABB','#00D3FE','#3B92DA','#663FA5','#511862'];
let monitoryPointCacheData = [];

/**
* 日常现场图对象1
*/
function generateDailyLive1Chart(chartRootElem, datas){
	let sum = 0;
	let legendData = datas.list.map((item,index)=>{
		sum += Number(item.value);
		return item.name
	});
	let seriesData = datas.list.map((item,index)=>{
		if(item.name === "故障"){
			return setData(item,{
				itemStyle:{
					color:"rgb(233,106,121)"
				},label:{
					show:true
				}
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
		                globalCoord: false //缺省为 false

		            }
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
			show:false,
			formatter: "{a} <br/>{b}: {c} ({d}%)",
			textStyle: {
				fontSize : 0.5 * rem
			}
		},
		graphic:{
			elements:[{
				type:'text',
				left: sum > 99 ? 1.2 * rem : 1.43 * rem,
				top:1.7*rem,
				zlevel:100,
				z:2,
				style:{
					text:sum,
					textAlign:'center',
					fill:'rgb(139,235,152)',
					shadowColor:100,
					width:40,
					height:40,
					fontSize : 1 * rem
				}
			},]
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
	        radius : ["center", 1.45*rem],
	        center : ["center",2.20*rem],
	        avoidLabelOverlap: false,
	        label: {
	            normal: {
	                show: true,
	                position: 'inner',
	                formatter:'{c}\n{d}%'
	            },
	            emphasis: {
	            	show:true,
	                textStyle: {
	                    fontSize: 0.4 * rem,
	                    fontWeight: 700,
	                }
	            }
	        },
	        labelLine: {
	            normal: {
	                show: false,
	                length:0,
	                length:0
	            }
	        },
	        data:seriesData
	    }]
	}
	if (option && typeof option === "object") {
		/*
		//zrender 的方法
		var _zr = chartRootElem.getZr();  
		_zr.add(new echarts.graphic.Text({
			style: {              
				x: _zr.getWidth() / 2,  
				y: _zr.getHeight() / 2.5,  
				color:'#666', 
				text: '公里',  
				textAlign: 'center',   
				textFont : 'bold 20px verdana red'  
			}
		})); */ 
	    chartRootElem.setOption(option, true);
	 }
}

/**
* 日常现场图对象2
*/
function generateDailyLive2Chart(chartRootElem, datas){
	//颜色对象
	let colorObj = {}
	let colorValues = [{itemStyle:{
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
	},{itemStyle:{
        	color:"rgb(233,106,121)"
        }
	},{
		itemStyle:{color:"rgb(174,126,249)"}
	}];
	let sum = 0;
	datas.list.forEach((elem,index) => {
		colorObj[elem['code']] = colorValues[index];
	});

	let legendData = datas.list.map((item,index) => {return item.name});
	let seriesData = datas.list.map((item,index)=>{
		sum += Number(item.value);
		return setData(item, colorObj[item.code]);
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
	    	show:false,
	        trigger: 'item',
	        formatter: "{a} <br/>{b}: {c} ({d}%)"
	    },
	    graphic:{
			elements:[{
				type:'text',
				left: sum > 99 ? 1.2 * rem : 1.43 * rem,
				top:1.7*rem,
				zlevel:100,
				z:2,
				style:{
					text:sum,
					textAlign:'center',
					fill:'rgb(139,235,152)',
					shadowColor:100,
					width:40,
					height:40,
					fontSize : 1 * rem
				}
			},]
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
	            radius: ["center", 1.45*rem],
	            center:["center",2.2*rem],
	            avoidLabelOverlap: false,
				label: {
					    show: true,
					    position: 'inner',
					    color:'white',
					    formatter:'{c}\n{d}%',
	
					emphasis: {
						show:true,
					    textStyle: {
					    	color:'#fff',
					        fontSize: 0.4 * rem,
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
		title:{
			x:'left',
			padding: [0, 10],
			y:'top',
			text:'单位：人',
			align:'center',
			verticalAlign:'middle',
			textStyle:{
				color:'#FFF',
				fontSize:0.25*rem
			}
		},
		xAxis : {
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


	/*let lis = `<li>
		<div id="first"></div>
		<p>${data.first.name}</p>
		<p>工号：${data.first.workId}</p>
	</li>
	<li>
		<img src=""/>
		<p>${data.second.name}</p>
		<p>工号：${data.second.workId}</p>
	</li>
	<li>
		<img src=""/>
		<p>${data.third.name}</p>
		<p>工号：${data.third.workId}</p>
	</li>`
	listRoot.html(lis);*/
}

/**
*设备运行状态
*/
function deviceRunStatusChart(chartRootElem, datas, title){
	let links = [{name:'运行状态',link:'html/devicerunstatusinfo.html'}, 
		{name:'设备类别',link:'html/devicerunstatus.html'},
		{name:'备件信息',link:'html/sparepartsinformation.html'},
		{name:'故障信息',link:'html/faultmessage.html'}
	];
	function getLink(key){
		let link = '';
		for(var i = 0, len = links.length; i < len;i++){
			if (title == links[i]['name']){
				link = links[i]['link'];
				break;
			}
		}
		return link;
	}

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
		title: {
			show:true,
	        text: (title.substring(0,2) + '\n' + title.substring(2)),
	        x:'center',
	        left: 'center',
	        top: 'middle',
	        link:getLink(title),
	        target:'self',
	        textStyle:{
	        	fontSize:0.25 * rem,
	        	fontWeight:'bold',
	        	color:'#A4B4EC',
	        },
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
* 事件告警图
*/
function eventAlarmChart(datas){
	let color = ['#3BD9BB','#3192D2','#63389D','#21042B'];
	let sum = 0;
	datas.list.forEach(item=>{
		sum += item.value
	})
	datas.list.forEach((item,index)=>{
		$(".pie_eachrts5 ul")
		.append($("<li></li>").css("width",item.value/sum*100+"%")
			.append($("<div>"+item.value+"</div>").css("background",color[index]).attr("class","kitem")).
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
	let colors = ['#FFD5D9', '#FFD837', '#92DB85','#D6B9F2'];
	let xAxisItem = ['00:00', '02:00','04:00','06:00','08:00','10:00','12:00','14:00',
        '16:00','18:00','20:00','22:00','24:00'];
	//图表x轴区间及刻度名称
	let seriesData = datas.map(item=>{
		let obj = {};
		obj.type = "line",
		obj.name = item.watchLine;
		obj.data = item.data.map(key=>{return key.value});
		obj['areaStyle'] = {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: '#301B55' // 0% 处的颜色
                }, {
                    offset: 1, color: '#3F2351' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false

            }
        }
		return obj ;
	});

	let option = {
		color: colors,
		title:{
			x:'left',
			padding: [5, 10],
			y:'top',
			text:'单位℃',
			align:'center',
			verticalAlign:'middle',
			textStyle:{
				color:'#FFF',
				fontSize:0.25*rem
			}
		},
	  	tooltip: {
	        trigger: 'item',
	    },
	    legend: {
	    	 textStyle:{
                color:'white',
                fontSize:0.15*rem
            },
            bottom:0,
	        data:datas.map(item=>{return item.watchLine})
	    },
	    grid: {
	        top: 0.10 * rem,
	        bottom: 0.9 * rem
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
	            boundaryGap:false,
	            axisLabel: {  //x轴坐标字样式，rotate设置文字斜着显示
	                interval:0,
	                rotate:50,
	                color:'white',
	                fontSize:0.17*rem,
	                align:'right',
	                formatter: function (value, index) {
	                    //使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
	                    return value;
	                },
	            },
	            axisPointer: {
	                label: {
	                	fontSize:0.15 * rem,
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
	                fontSize:0.2*rem,
	                formatter: '{value}'
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

/**
* 每次从后端获取数据后初始化监控点数据
*
*/
function initMonitoryPoint(qryMonitoryRootElem, data){
	monitoryPointCacheData = data;
	qryMonitoryRootElem.children().remove();
	qryMonitoryRootElem.append('<option value="default" >请选择监控点</option>');
	for(var i = 0, len = data.length; i < len; i++){
		qryMonitoryRootElem.append('<option value="'+data[i]['watchLine']+'" >'+data[i]['watchLine']+'</option>');
	}
}


function play(urls, playElem) {
    playElem.src = urls;
    playElem.load();   
    playElem.play();
} 
function viewpagerVideo(urls, playElem){
	playElem.addEventListener('ended', function(){
		play(urls, playElem);
	});
	return function(){
	    play(urls, playElem);
	}
}


$(function(){

	currentDateObj = $('.timeText');
	timingDate();
	
	$('video').each((index, elem) => {
			viewpagerVideo(videoUrls[index], elem)();
	});

	ajax(baseUrl).then(res=>{
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

		initMonitoryPoint($('#monitoryPoint') ,res.data.ssjk.list);
		$('#monitoryPoint').on('change', (event) => {
			let key = event.target.value;
			let result = [];
			if (key != null){
				for(var i = 0, len = monitoryPointCacheData.length; i < len ;i++){
					if (key == monitoryPointCacheData[i]['watchLine']){
						result.push(monitoryPointCacheData[i]);
						break;
					}
				}
				realtimeMonitoring(myrealtimeMonitoringChart, result);
			}
		});
		//实时监控
		var myrealtimeMonitoringChart = echarts.init($("#indexMonitoring").get(0));
		realtimeMonitoring(myrealtimeMonitoringChart, res.data.ssjk.list);
		//安全隐患
		safeHiddenTroubleTableList($(".tb2 tbody"), res.data.aqyh);
	});
});