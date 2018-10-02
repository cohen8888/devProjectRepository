

//baseUrl = baseUrl + "interf04";
baseUrl = baseUrl + "/api/personnelinfomation";
currentDateObj = null;

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
			series = [{
		            name:item.groupName,
		            type:'pie',
		            center: ["center", 2.15*rem],
		            radius:[1.25*rem,1.6*rem],
		            avoidLabelOverlap: false,
		            label: {
		                normal: {
		                    show: true,
		                    position: 'center',
		                    formatter:'总人数\n\n({c}/30)'
		                },
		                emphasis: {
	                    	show:false,
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
		            data:[{
		                	value : item.memberCount,
		                	name:'总人数',
		                	itemStyle:{
		                		color:"rgb(215,216,24)"
		                }},
		            ]
		        },{
		            name : item.groupName,
		            type:'pie',
		            center: ["center", 2.15*rem],
		            radius:[1.25*rem,1.8*rem],
		            avoidLabelOverlap: false,
		            label: {
		                normal: {
		                    show: false,
		                    position: 'center',
		                    formatter:'上班\n\n({c}/30)'
		                },
		                emphasis: {
	                    	show:false,
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
		                {
		                	value : item.memberCount-item.workCount, 
		                	name:'未到岗',
		                	itemStyle:{
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
		            radius:[1.25*rem, 1.8*rem],
		            avoidLabelOverlap: false,
		            label: {
		                normal: {
		                    show: true,
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
		myEchart.setOption({title,legend,series,avoidLabelOverlap: false});
	})
}

function viewpagerVideo(urls, playElem){
    var vLen = urls.length; 
    var curr = 0; 

    playElem.on('ended', function(){
		play();
	});  
     
    function play() {
        playElem.get(0).src = urls[curr];
        playElem.get(0).load();   
        playElem.get(0).play();  
        curr++;
        if(curr >= vLen){  
            curr = 0; //重新循环播放
        }
    }  
    play();
}

 let urls = ["http://39.104.135.24:8081/public/video/rcxc.mp4", 
	"http://39.104.135.24:8081/public/video/rcxc.mp4", 
	"http://39.104.135.24:8081/public/video/rcxc.mp4"];

//jQuery ready function start
$(function(){
	setLink($(".header_left img"));
	//
	currentDateObj = $('.timeText');
	timingDate();
	
	ajax(baseUrl).then(res => {
		viewpagerVideo(urls, $('.map'));
		info(res.data);
		setCanvas(res.data);
	});
});	//jQuery ready end;
	


