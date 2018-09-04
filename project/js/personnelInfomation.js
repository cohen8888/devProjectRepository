{
	let jrxcry_canvas = document.querySelector(".jrxcry_canvas1");
	let myEchart = echarts.init(jrxcry_canvas);
	
	let opt = {
				title:{
					text:"一组",
					textStyle:{
						color:"white",
						fontWeight:100,
						fontSize:25,
						lineHeight:68
					},
					bottom:20,
					x:"center"
				},
			    legend: {
			        orient: 'horizontal',
			        itemGap:16,
			        itemWidth:20,
			        itemHeight:20,
			        icon:"circle",
			        x:'center',
			        data:["总人数","到岗人数"],
			        bottom:68,
			        textStyle:{
			        	color:"#ccc",
			        	fontSize:25,
			        }
			    },
			    series: [
			        {
			            name:'一组',
			            type:'pie',
			            center: ["center", '215px'],
			            radius:["125px","160px"],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center',
			                    formatter:'上班\n\n({c}/30)'
			                },
			                emphasis: {
		                    	show:true,
			                    textStyle: {
			                        fontSize: 30,
			                        fontWeight: 100,
			                        color:"rgb(146,191,215)"
			                    }
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:[
			                {value:4, name:'总人数',itemStyle:{
			                	color:"rgb(215,216,24)"
			                }},
			                {
			                	value:26,
			                	name:'到岗人数',
			                	itemStyle:{
				                	color: "rgb(242,114,49)"
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
	myEchart.setOption(opt)
}
{
	let jrxcry_canvas = document.querySelector(".jrxcry_canvas2");
	let myEchart = echarts.init(jrxcry_canvas);
	
	let opt = {
				title:{
					text:"二组",
					textStyle:{
						color:"white",
						fontWeight:100,
						fontSize:25,
						lineHeight:68
					},
					bottom:20,
					x:"center"
				},
			    legend: {
			        orient: 'horizontal',
			        itemGap:16,
			        itemWidth:20,
			        itemHeight:20,
			        icon:"circle",
			        x:'center',
			        data:["总人数"],
			        bottom:68,
			        textStyle:{
			        	color:"#ccc",
			        	fontSize:25,
			        }
			    },
			    series: [
			        {
			            name:'二组',
			            type:'pie',
			            center: ["center", '215px'],
			            radius:["125px","160px"],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center',
			                    formatter:'休息\n\n({c}/30)'
			                },
			                emphasis: {
		                    	show:true,
			                    textStyle: {
			                        fontSize: 30,
			                        fontWeight: 100,
			                        color:"rgb(146,191,215)"
			                    }
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:[
			                {value:0, name:'总人数',itemStyle:{
			                	color:"rgb(129,206,242)"
			                }}
			                
			            ]
			        }
			    ]
			};
	myEchart.setOption(opt)
}
{
	let jrxcry_canvas = document.querySelector(".jrxcry_canvas3");
	let myEchart = echarts.init(jrxcry_canvas);
	
	let opt = {
				title:{
					text:"三组",
					textStyle:{
						color:"white",
						fontWeight:100,
						fontSize:25,
						lineHeight:68
					},
					bottom:20,
					x:"center"
				},
			    legend: {
			        orient: 'horizontal',
			        itemGap:16,
			        itemWidth:20,
			        itemHeight:20,
			        icon:"circle",
			        x:'center',
			        data:["总人数"],
			        bottom:68,
			        textStyle:{
			        	color:"#ccc",
			        	fontSize:25,
			        }
			    },
			    series: [
			        {
			            name:'三组',
			            type:'pie',
			            center: ["center", '215px'],
			            radius:["125px","160px"],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center',
			                    formatter:'休息\n\n({c}/30)'
			                },
			                emphasis: {
		                    	show:true,
			                    textStyle: {
			                        fontSize: 30,
			                        fontWeight: 100,
			                        color:"rgb(146,191,215)"
			                    }
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:[
			                {value:0, name:'总人数',itemStyle:{
			                	color:"rgb(129,206,242)"
			                }}
			                
			            ]
			        }
			    ]
			};
	myEchart.setOption(opt)
}