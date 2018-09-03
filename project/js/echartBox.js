{
			let myEchart = echarts.init(document.querySelector(".pie_eachrts1"));
			let opt1 = {
				title:{
					text:"维修",
					textStyle:{
						color:"white",
						fontWeight:100,
						fontSize:12
					},
					bottom:0,
					left:72
				},
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    legend: {
			        orient: 'horizontal',
			        itemWidth:8,
			        itemHeight:8,
			        borderRadius:"100%",
			        x: 'left',
			        data:["维修","故障"],
			        bottom:28,
			        left:45,
			        textStyle:{
			        	color:"#ccc",
			        	fontSize:10
			        }
			    },
			    series: [
			        {
			            name:'维修/故障',
			            type:'pie',
			            radius: ['40px', '50px'],
			            center:["88px","80px"],
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
			                        fontSize: 30,
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
						fontSize:12
					},
					bottom:0,
					left:62
				},
			    tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)"
			    },
			    legend: {
			        orient: 'horizontal',
			        itemWidth:8,
			        itemHeight:8,
			        itemGap:5,
			        borderRadius:"100%",
			        x: 'left',
			        data:["已排查","排查中","已转工单"],
			        bottom:28,
			        left:0,
			        textStyle:{
			        	color:"#ccc",
			        	fontSize:10
			        }
			    },
			    series: [
			        {
			            name:'维修/故障',
			            type:'pie',
			            radius: ['40px', '50px'],
			            center:["80px","80px"],
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
			                        fontSize: 30,
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
			let myEchart = echarts.init(document.querySelector(".pie_eachrts3"));
			let opt = {
			    tooltip: {},
			    xAxis: {
	                data: ["班组1","班组2","班组3","班组4"]
	            },
	            yAxis: {
	            },
			    series: [
			        {
			            name:'班组绩效',
			            type:'bar',
			            data:[
			            	{
			            		name:"班组1",
			            		value:75
			                },
			                {
			                	name:"班组2",
			            		value:30
			                },
			                {
			                	name:"班组3",
			            		value:55
			                },
			                {
			                	name:"班组4",
			            		value:95
			                },
			            ]
			        }
			    ]
			};
			myEchart.setOption(opt);
		}