	let rem = document.documentElement.style.fontSize.substr(0,document.documentElement.style.fontSize.length-2)*1;
	
	$.get("http://localhost:3000/equipment",{
		userStartDate:"2018.09.03 00:00:00",
		userEndDate:"2018.09.03 24:00:00"
	},function(res){
		info(JSON.parse(res).data)
		setCanvas(JSON.parse(res).data)
	})
	function info(opt){
		let str = "";
		opt.users.forEach((item,index)=>{
			str+=`<tr>`;
			str+=`<td>${item.workNum}</td>`;
			str+=`<td>${item.name}</td>`;
			str+=`<td>${item.groupName}</td>`;
			str+=`<td>${item.workContent}</td>`;
			str+=`</tr>`
		})
		$("tbody").html(str);
//		console.log(opt.map)
		$(".map").attr('src',opt.mapUrl);
	}
	function setCanvas(obj){
		let canvasBox = document.querySelector(".canvasBox");
		obj.group.forEach((item,index)=>{
			let canvasItem = document.createElement("div");
			canvasItem.className = "canvasItem";
			canvasBox.appendChild(canvasItem);
			canvasItem.style.width = 1/obj.group.length*100+"%";
			let myEchart = echarts.init(canvasItem);
			let title = {
				text:item.groupName,
				textStyle:{
					color:"white",
					fontWeight:1*rem,
					fontSize:0.25*rem,
					lineHeight:0.68*rem
				},
				bottom:0.68*rem,
				x:"center"
			}
			let legend = {
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
			}
			let series;
			if(item.workCount>0){
				series = [
			        {
			            name:item.groupName,
			            type:'pie',
			            center: ["center", 2.15*rem],
			            radius:[1.25*rem,1.6*rem],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center',
			                    formatter:'总人数\n\n({c}/30)'
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
			                {value:item.memberCount, name:'总人数',itemStyle:{
			                	color:"rgb(215,216,24)"
			                }},
			            ]
			        },{
			            name:item.groupName,
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
			                {value:item.memberCount-item.workCount, name:'未到岗',itemStyle:{
			                	color:"rgb(215,216,24)"
			                }},
			                {
			                	value:item.workCount,
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
			}else{
				series = [
			        {
			            name:item.groupName,
			            type:'pie',
			            center: ["center", 2.15*rem],
			            radius:[1.25*rem,1.6*rem],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center',
			                    formatter:'总人数\n\n({c}/30)'
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
			                {value:item.memberCount, name:'总人数',itemStyle:{
			                	color:"rgb(129,206,242)"
			                }},
			            ]
			        }
			    ]
			}
			myEchart.setOption({title,legend,series})	
		})
	}
//{
//	let jrxcry_canvas = document.querySelector(".jrxcry_canvas1");
//	let myEchart = echarts.init(jrxcry_canvas);
//	
//	let opt = {
//				title:{
//					text:"一组",
//					textStyle:{
//						color:"white",
//						fontWeight:1*rem,
//						fontSize:0.25*rem,
//						lineHeight:0.68*rem
//					},
//					bottom:0.68*rem,
//					x:"center"
//				},
//			    legend: {
//			        orient: 'horizontal',
//			        itemGap:0.16*rem,
//			        itemWidth:0.2*rem,
//			        itemHeight:0.2*rem,
//			        icon:"circle",
//			        x:'center',
//			        data:["总人数","到岗人数"],
//			        bottom:0.2*rem,
//			        textStyle:{
//			        	color:"#ccc",
//			        	fontSize:0.25*rem,
//			        }
//			    },
//			    series: [
//			        {
//			            name:'一组',
//			            type:'pie',
//			            center: ["center", 2.15*rem],
//			            radius:[1.25*rem,1.6*rem],
//			            avoidLabelOverlap: false,
//			            label: {
//			                normal: {
//			                    show: false,
//			                    position: 'center',
//			                    formatter:'上班\n\n({c}/30)'
//			                },
//			                emphasis: {
//		                    	show:true,
//			                    textStyle: {
//			                        fontSize: 0.3*rem,
//			                        fontWeight: 100,
//			                        color:"rgb(146,191,215)"
//			                    }
//			                }
//			            },
//			            labelLine: {
//			                normal: {
//			                    show: false
//			                }
//			            },
//			            data:[
//			                {value:30, name:'总人数',itemStyle:{
//			                	color:"rgb(215,216,24)"
//			                }},
////			                {
////			                	value:26,
////			                	name:'到岗人数',
////			                	itemStyle:{
////				                	color: "rgb(242,114,49)"
////			                	},
////			                	emphasis:{
////			                		show:true
////			                	},
////			                	label:{
////			                		color:"rgb(224,230,117)"
////			                	}
////			                },
//			            ]
//			        },{
//			            name:'一组',
//			            type:'pie',
//			            center: ["center", 2.15*rem],
//			            radius:[1.25*rem,1.6*rem],
//			            avoidLabelOverlap: false,
//			            label: {
//			                normal: {
//			                    show: false,
//			                    position: 'center',
//			                    formatter:'上班\n\n({c}/30)'
//			                },
//			                emphasis: {
//		                    	show:true,
//			                    textStyle: {
//			                        fontSize: 0.3*rem,
//			                        fontWeight: 100,
//			                        color:"rgb(146,191,215)"
//			                    }
//			                }
//			            },
//			            labelLine: {
//			                normal: {
//			                    show: false
//			                }
//			            },
//			            data:[
//			                {value:4, name:'未到岗',itemStyle:{
//			                	color:"rgb(215,216,24)"
//			                }},
//			                {
//			                	value:26,
//			                	name:'到岗人数',
//			                	itemStyle:{
//				                	color: "rgb(242,114,49)"
//			                	},
//			                	emphasis:{
//			                		show:true
//			                	},
//			                	label:{
//			                		color:"rgb(224,230,117)"
//			                	}
//			                },
//			            ]
//			        }
//			    ]
//			};
//	myEchart.setOption(opt)
//}
//{
//	let jrxcry_canvas = document.querySelector(".jrxcry_canvas2");
//	let myEchart = echarts.init(jrxcry_canvas);
//	
//	let opt = {
//				title:{
//					text:"二组",
//					textStyle:{
//						color:"white",
//						fontWeight:100,
//						fontSize:0.25*rem,
//						lineHeight:0.68*rem
//					},
//					bottom:0.68*rem,
//					x:"center"
//				},
//			    legend: {
//			        orient: 'horizontal',
//			        itemGap:0.16*rem,
//			        itemWidth:0.2*rem,
//			        itemHeight:0.2*rem,
//			        icon:"circle",
//			        x:'center',
//			        data:["总人数"],
//			        bottom:0.2*rem,
//			        textStyle:{
//			        	color:"#ccc",
//			        	fontSize:0.25*rem,
//			        }
//			    },
//			    series: [
//			        {
//			            name:'二组',
//			            type:'pie',
//			            center: ["center", 2.15*rem],
//			            radius:[1.25*rem,1.6*rem],
//			            avoidLabelOverlap: false,
//			            label: {
//			                normal: {
//			                    show: false,
//			                    position: 'center',
//			                    formatter:'休息\n\n({c}/30)'
//			                },
//			                emphasis: {
//		                    	show:true,
//			                    textStyle: {
//			                        fontSize: 0.3*rem,
//			                        fontWeight: 100,
//			                        color:"rgb(146,191,215)"
//			                    }
//			                }
//			            },
//			            labelLine: {
//			                normal: {
//			                    show: false
//			                }
//			            },
//			            data:[
//			                {value:0, name:'总人数',itemStyle:{
//			                	color:"rgb(129,206,242)"
//			                }}
//			                
//			            ]
//			        }
//			    ]
//			};
//	myEchart.setOption(opt)
//}
//{
//	let jrxcry_canvas = document.querySelector(".jrxcry_canvas3");
//	let myEchart = echarts.init(jrxcry_canvas);
//	
//	let opt = {
//				title:{
//					text:"三组",
//					textStyle:{
//						color:"white",
//						fontWeight:100,
//						fontSize:0.25*rem,
//						lineHeight:0.68*rem
//					},
//					bottom:0.68*rem,
//					x:"center"
//				},
//			    legend: {
//			        orient: 'horizontal',
//			        itemGap:0.16*rem,
//			        itemWidth:0.2*rem,
//			        itemHeight:0.2*rem,
//			        icon:"circle",
//			        x:'center',
//			        data:["总人数"],
//			        bottom:0.2*rem,
//			        textStyle:{
//			        	color:"#ccc",
//			        	fontSize:0.25*rem,
//			        }
//			    },
//			    series: [
//			        {
//			            name:'三组',
//			            type:'pie',
//			            center: ["center", 2.15*rem],
//			            radius:[1.25*rem,1.6*rem],
//			            avoidLabelOverlap: false,
//			            label: {
//			                normal: {
//			                    show: false,
//			                    position: 'center',
//			                    formatter:'休息\n\n({c}/30)'
//			                },
//			                emphasis: {
//		                    	show:true,
//			                    textStyle: {
//			                        fontSize: 0.3*rem,
//			                        fontWeight: 100,
//			                        color:"rgb(146,191,215)"
//			                    }
//			                }
//			            },
//			            labelLine: {
//			                normal: {
//			                    show: false
//			                }
//			            },
//			            data:[
//			                {value:0, name:'总人数',itemStyle:{
//			                	color:"rgb(129,206,242)"
//			                }}
//			                
//			            ]
//			        }
//			    ]
//			};
//	myEchart.setOption(opt)
//}