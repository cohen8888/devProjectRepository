let rem = document.documentElement.style.fontSize.substr(0,document.documentElement.style.fontSize.length-2)*1;
const baseUrl = "http://localhost:3000/api/";
function setData(data,opt){
	for( k in data){
		opt[k] = data[k];
	}
	return opt;
}
ajax(baseUrl,"index")
.then(res=>{

{
	const data = res.data.rcxc.maintain;
			let legendData = data.list.map((item,index)=>{return item.name});
			let seriesData = data.list.map((item,index)=>{
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
			let myEchart = echarts.init(document.querySelector(".pie_eachrts1"));
			let opt1 = {
				title:{
					text:data.title,
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
			        itemGap:0.16*rem,
			        itemWidth:0.2*rem,
			        itemHeight:0.2*rem,
			        icon:"circle",
			        x:'center',
			        data:["维修","故障"],
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
			            center:["center",2.20*rem],
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
			myEchart.setOption(opt1);
		}
		{
			const data = res.data.rcxc.malfunction;
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
			                	},
								},
				"checking":{itemStyle:{
			                	color:"rgb(233,106,121)"
			                }
							},
				"workOrder":{
					itemStyle:{color:"rgb(174,126,249)"}
				}
			}
			let legendData = data.list.map((item,index)=>{return item.name});
			let seriesData = data.list.map((item,index)=>{
				return setData(item,colorObj[item.code])
			})
			let myEchart = echarts.init(document.querySelector(".pie_eachrts2"));
			let opt2 = {
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
			myEchart.setOption(opt2);


			let tableData = res.data.rcxc.list;
			let str = "";
			tableData.forEach((item,index)=>{
				str+=`<tr>`;
				str+=`<td>${item.checkLine}</td>`;
				str+=`<td>${item.status}</td>`;
				str+=`<td class=${item.resultCode}>${item.result}</td>`;
				str+=`</tr>`
			})
			$(".tb1 tbody").html(str);

		}
		{
			const data = res.data.bzjx;
			let myChart = echarts.init(document.querySelector(".pie_eachrts3"));
			let pedingArr = [];
			let badwork = [];
			let stopwork = [];
			for(var i = 0 ; i < data.list.length ; i++){
				for(var j = 0 ; j < data.list[i].data.length; j++){
					if(data.list[i].data[j].name == "进行中"){
						pedingArr.push(data.list[i].data[j].value)
					}else if(data.list[i].data[j].name == "故障"){
						badwork.push(data.list[i].data[j].value)
					}else{
						stopwork.push(data.list[i].data[j].value)
					}
				}
			}
			var opt = null;
			opt = {
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
						data : data.list.map((item,index)=>{return item.group})
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
			if (opt && typeof opt === "object") {
					myChart.setOption(opt, true);
			}

			console.log(data.rack)
			const rack = data.rack;
			let lis = `<li>
				<img src="img/绩效1.png"/>
				<p>${rack.first.name}</p>
				<p>工号：${rack.first.workId}</p>
			</li>
			<li>
				<img src="img/绩效2.png"/>
				<p>${rack.second.name}</p>
				<p>工号：${rack.second.workId}</p>
			</li>
			<li>
				<img src="img/绩效3.png"/>
				<p>${rack.third.name}</p>
				<p>工号：${rack.third.workId}</p>
			</li>`
			$(".medal").html(lis);
		}

		{
			const data = res.data.sbzt;
			let myChart = echarts.init(document.querySelector(".pie_eachrts4"));
			var app = {};
			var opt = null;
			opt = {
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
						data :data.list.map((item,index)=>{return item.type})
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
								name: '停工',
								type: 'bar',
								stack: '总量',
								label: {
										normal: {
												show: true,
												position: 'inside',
												formatter:function(params){
													return params.value+"\n"+params.seriesName
												}
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
								data : [15,10,5,10]
						},
						{
								name: '故障',
								type: 'bar',
								stack: '总量',
								label: {
										normal: {
												show: true,
												position: 'inside',
												formatter:function(params){
													return params.value+"\n"+params.seriesName
												}

										}
								},
								itemStyle:{
									color:'#3b92da'
								},
								data : [13,12,15,18]
						},{

								name: '进行中',
								type: 'bar',
								stack: '总量',
								label: {
										normal: {
												show: true,
												position: 'inside',
												formatter:function(params){
													return params.value+"\n"+params.seriesName
												}
										}
								},
								itemStyle:{
									color:'#38dabb'
								},
								data : [13,12,15,18]
						}

				]
			};
			if (opt && typeof opt === "object") {
					myChart.setOption(opt, true);
			}
		}
		{
			const data = res.data.sjgj;
			let color = ['rgb(84,219,187)','rgb(73,144,221)','rgb(85,25,110)','rgb(34,2,45)'];
			let sum = 0;
			data.list.forEach(item=>{
				sum += item.value
			})
			data.list.forEach((item,index)=>{
				console.log(item)
				$(".pie_eachrts5 ul").append($("<li/>").css("width",item.value/sum*100+"%").append($("<div/>").css("background",color[index]).attr("class","kitem")).append($("<p/>").html(item.name).attr("class","titem")));
				
			})
		}
		{
			const data = res.data.ryxx;
			let myEchart = echarts.init(document.querySelector(".pie_eachrts6"));
				let opt = {
							series: [{
						type:'pie',
						center: [("65%"), 1.15*rem],
						radius:[0.65*rem,0.95*rem],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: true,
								position: 'center',
								formatter:'现场\n\n'+data.workCount+'/'+data.workSum,

							}
						},
						data:[
							{
								value:data.workSum - data.workCount,
								name:"今日缺勤",
								itemStyle:{
									color:"#f27432"
								}
							},{
								value:data.workCount,
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
										str += data.workGroup;
										return str;
									},

								},
								labelLine:{
									show:true,
									length:6,
									length2:0.8*rem
								}
								

							}
						]
					}]
						};
				myEchart.setOption(opt)
		}
		{
			const data = res.data.aqyh;
			let tableData = data.list;
			let str = "";
			tableData.forEach((item,index)=>{
				str+=`<tr>`;
				str+=`<td>${item.troubleCode}</td>`;
				str+=`<td>${item.findTime}</td>`;
				str+=`<td>${item.troubleContent}</td>`;
				str+=`<td>${item.findWorker}/${item.findWorkerGroup}</td>`;
				str+=`</tr>`
			})
			$(".tb2 tbody").html(str);
		}
		{
			let data = res.data.ssjk;
				var container = $("#indexMonitoring");
				var myChart = echarts.init(container.get(0));
				var app = {};
				var option = null;
			//	var colors = ['#5793f3', '#d14a61', '#675bba'];
				var colors = ['red', 'yellow', 'blue','green'];

				var xAxisItem =  data.list[0].data.map((item,index)=>{
					return item.time;
				});   //图表x轴区间及刻度名称
				let seriesData = data.list.map(item=>{
					let obj = {};
					obj.type = "line",
					obj.name = item.watchLine;
					obj.data = item.data.map(key=>{return key.value});
					return obj ;
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
			                fontSize:0.15*rem

			            },
			            bottom:0,
				        data:data.list.map(item=>{return item.watchLine})
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
				    myChart.setOption(option, true);
				}
		}
	})
