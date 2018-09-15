let rem = document.documentElement.style.fontSize.substr(0,document.documentElement.style.fontSize.length-2)*1;
let baseUrl = "http://localhost:3000/api/";
{
	let jrxcry_canvas = document.querySelector(".jrxcry_canvas1");
	let myEchart = echarts.init(jrxcry_canvas);
	ajax(baseUrl,"sparePartsInformation")
	.then(res=>{
		console.log(res);
		let str1 = "";
		let str2 = ""
		res.data.forEach((item,index)=>{
			if(index<=4){
				str1+="<tr>"
				str1+="<td>"+item.workNum+"</td>";
				str1+="<td>"+item.workUser+"</td>";
				str1+="<td>"+item.group+"</td>";
				str1+="<td>"+item.workContent+"</td>";
				str1+="</tr>";
			}else{
				str2+="<tr>"
				str2+="<td>"+item.workNum+"</td>";
				str2+="<td>"+item.workUser+"</td>";
				str2+="<td>"+item.group+"</td>";
				str2+="<td>"+item.workContent+"</td>";
				str2+="</tr>";
			}
		})
		$(".tb1 tbody").html(str1);
		$(".tb2 tbody").html(str2);
		
	})
	let opt = {
			    legend: {
			        orient: 'horizontal',
			        itemGap:0.16*rem,
			        itemWidth:0.2*rem,
			        itemHeight:0.2*rem,
			        icon:"circle",
			        x:'center',
			        data:["A0987 备件一","A0987 备件二","A0987 备件三","A0987 备件四"],
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
			            center: ["12.5%", 2.15*rem],
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
			        },
			        {
			            name:'一组',
			            type:'pie',
			            center: ["37.5%", 2.15*rem],
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
			        },
			        {
			            name:'一组',
			            type:'pie',
			            center: ["62.5%", 2.15*rem],
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
			        },
			        {
			            name:'一组',
			            type:'pie',
			            center: ["87.5%", 2.15*rem],
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