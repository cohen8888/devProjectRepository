let rem = document.documentElement.style.fontSize.substr(0,document.documentElement.style.fontSize.length-2)*1;
{
			let myEchart = echarts.init(document.querySelector(".pie_eachrts1"));
			let opt1 = {
				title:{
					text:"维修",
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
			            center:[2.20*rem,2.20*rem],
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
			            data:[
			                {value:10, name:'故障',itemStyle:{
			                	color:"rgb(233,106,121)"
			                }},
			                {
			                	value:264,
			                	name:'维修',
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
			                	emphasis:{
			                		show:true
			                	},
			                	label:{
			                		color:"rgb(224,230,117)"
			                	}
			                },
			            ]
			        }
			    ]
			};
			myEchart.setOption(opt1);
		}
		{
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
			        itemGap:0.16*rem,
			        itemWidth:0.2*rem,
			        itemHeight:0.2*rem,
			        icon:"circle",
			        x:'center',
			        data:["已排查","排查中","已转工单"],
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
			            center:[2.20*rem,2*rem],
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
			            data:[
			            	{value:4,name:"已转工单",itemStyle:{color:"rgb(174,126,249)"}},
			                {value:1, name:'排查中',itemStyle:{
			                	color:"rgb(233,106,121)"
			                }},
			                {
			                	value:15,
			                	name:'已排查',
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
			                	emphasis:{
			                		show:true
			                	},
			                	label:{
			                		color:"rgb(224,230,117)"
			                	}
			                },
			            ]
			        }
			    ]
			};
			myEchart.setOption(opt2);
		}
		{
			let myChart = echarts.init(document.querySelector(".pie_eachrts3"));
			var app = {};
// 			var dataColumn = res.data[0].data.map((item,index)=>{return item.type});  //图表数据项
// 			var xAxisItem =  res.data.map((item,index)=>{return item.time});   //图表x轴区间及刻度名称
// 			var perilFindData = res.data.map((item,index)=>{return item.data[0].val});    //隐患发现数据
// 			var perilCheckData = res.data.map((item,index)=>{return item.data[1].val});    //隐患排查数据

			// app.title = '安全隐患图';
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
						data : ["班组1","班组2","班组3","班组4"]
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
												position: 'insideTopRight'
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
								name: '',
								type: 'bar',
								stack: '总量',
								label: {
										normal: {
												show: true,
												position: 'insideRight'
										}
								},
								itemStyle:{
									color:'#3b92da'
								},
								data : [13,12,15,18]
						},{
								
								name: '',
								type: 'bar',
								stack: '总量',
								label: {
										normal: {
												show: true,
												position: 'insideRight'
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
			let myChart = echarts.init(document.querySelector(".pie_eachrts4"));
			var app = {};
// 			var dataColumn = res.data[0].data.map((item,index)=>{return item.type});  //图表数据项
// 			var xAxisItem =  res.data.map((item,index)=>{return item.time});   //图表x轴区间及刻度名称
// 			var perilFindData = res.data.map((item,index)=>{return item.data[0].val});    //隐患发现数据
// 			var perilCheckData = res.data.map((item,index)=>{return item.data[1].val});    //隐患排查数据

			// app.title = '安全隐患图';
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
						data : ["运行状态","设备类别","故障信息","备件信息"]
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
													console.log(params)
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
													console.log(params)
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
													console.log(params)
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
			let myChart = echarts.init(document.querySelector(".pie_eachrts5"));
			var app = {};
// 			var dataColumn = res.data[0].data.map((item,index)=>{return item.type});  //图表数据项
// 			var xAxisItem =  res.data.map((item,index)=>{return item.time});   //图表x轴区间及刻度名称
// 			var perilFindData = res.data.map((item,index)=>{return item.data[0].val});    //隐患发现数据
// 			var perilCheckData = res.data.map((item,index)=>{return item.data[1].val});    //隐患排查数据

			// app.title = '安全隐患图';
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
						data : ["监测报告","安全事件","隐患风险","安防检查"]
				},
				yAxis: {
					show:false
// 						splitLine:{
// 								show:false,
// 								lineStyle:{
// 										width:2,
// 										type:'dotted'  //'dotted'虚线 'solid'实线
// 								}
// 						},
// 						axisLabel:{
// 								color:'white',
// 								fontSize:0.3*rem
// 						},
// 						type: 'value'
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
													console.log(params)
													return params.value
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
													console.log(params)
													return params.value
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
													console.log(params)
													return params.value
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
			let myEchart = echarts.init(document.querySelector(".pie_eachrts6"));
				let opt = {
							series: [{
						type:'pie',
						center: [("66%"), 1.5*rem],
						radius:[1*rem,1.25*rem],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: true,
								position: 'center',
								formatter:'现场\n\n27/'+30,
								
							}
						},
						data:[
							{
								value:3,
								name:"今日缺勤",
								itemStyle:{
									color:"#f27432"
								}
							},{
								value:27,
								name:'今日当班',
								itemStyle:{
									color: "#fba97c"
								},
								label:{
									show:true,
									position:"outside",
									left:0,
									formatter:function(params){
										let str = "";
										str += params.name;
										str += "\n";
										str += params.value;
										str += "\n";
										str += 30;
										return str;
									},
									
								},
								labelLine:{
									show:true,
									length:10
									
								}
								
							}
						]
					}]
						};
				myEchart.setOption(opt)
		}