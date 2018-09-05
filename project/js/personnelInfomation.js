	let rem = document.documentElement.style.fontSize.substr(0,document.documentElement.style.fontSize.length-2)*1;
{
	let jrxcry_canvas = document.querySelector(".jrxcry_canvas1");
	let myEchart = echarts.init(jrxcry_canvas);
	
	let opt = {
				title:{
					text:"一组",
					textStyle:{
						color:"white",
						fontWeight:1*rem,
						fontSize:0.25*rem,
						lineHeight:0.68*rem
					},
					bottom:0.68*rem,
					x:"center"
				},
			    legend: {
			        orient: 'horizontal',
			        itemGap:0.16*rem,
			        itemWidth:0.2*rem,
			        itemHeight:0.2*rem,
			        icon:"circle",
			        x:'center',
			        data:["总人数","到岗人数"],
			        bottom:0.2*rem,
			        textStyle:{
			        	color:"#ccc",
			        	fontSize:0.25*rem,
			        }
			    },
			    series: [
			        {
			            name:'一组',
			            type:'pie',
			            center: ["center", 2.15*rem],
			            radius:[1.25*rem,1.6*rem],
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
			                        fontSize: 0.3*rem,
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
						fontSize:0.25*rem,
						lineHeight:0.68*rem
					},
					bottom:0.68*rem,
					x:"center"
				},
			    legend: {
			        orient: 'horizontal',
			        itemGap:0.16*rem,
			        itemWidth:0.2*rem,
			        itemHeight:0.2*rem,
			        icon:"circle",
			        x:'center',
			        data:["总人数"],
			        bottom:0.2*rem,
			        textStyle:{
			        	color:"#ccc",
			        	fontSize:0.25*rem,
			        }
			    },
			    series: [
			        {
			            name:'二组',
			            type:'pie',
			            center: ["center", 2.15*rem],
			            radius:[1.25*rem,1.6*rem],
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
			                        fontSize: 0.3*rem,
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
						fontSize:0.25*rem,
						lineHeight:0.68*rem
					},
					bottom:0.68*rem,
					x:"center"
				},
			    legend: {
			        orient: 'horizontal',
			        itemGap:0.16*rem,
			        itemWidth:0.2*rem,
			        itemHeight:0.2*rem,
			        icon:"circle",
			        x:'center',
			        data:["总人数"],
			        bottom:0.2*rem,
			        textStyle:{
			        	color:"#ccc",
			        	fontSize:0.25*rem,
			        }
			    },
			    series: [
			        {
			            name:'三组',
			            type:'pie',
			            center: ["center", 2.15*rem],
			            radius:[1.25*rem,1.6*rem],
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
			                        fontSize: 0.3*rem,
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