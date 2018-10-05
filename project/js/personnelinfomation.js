

//baseUrl = baseUrl + "interf04";
baseUrl = baseUrl + "/api/personnelinfomation";
currentDateObj = null;
let urls = ["http://39.104.135.24:8081/public/video/rcxc.mp4", 
	"http://39.104.135.24:8081/public/video/rcxc.mp4", 
	"http://39.104.135.24:8081/public/videorcxc.mp4"];


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

/**
*
*/
function createChartContainerElem(rootElem, children, styles){
	let result = {};
	if (typeof styles == 'object' && styles instanceof Array){
		for(let i = 0, len = styles.length; i < len; i++){
			children.css(styles[i]);
		}
	}
	rootElem.append(children);
	return children;
}


function initChartOptionObject(datas){
	let sum = 0;
	let legendData = ['到岗人数',  '休息'];
	let workStatus = '';
	if (datas.workCount > 0){
		workStatus = '上班';
	}else{
		workStatus = '休息';
	}
	let workColor = '#F57222';
	let seriesData = [{
		name : '到岗人数',
		value : datas.workCount,
		itemStyle:{
			color:'#D8DA03'
		},label:{
			show:true
		}
	},{
		name : '休息',
		value : datas.memberCount - datas.workCount,
		itemStyle:{
			color: datas.workCount == 0 ? '#7FCEF4' : workColor
		},
		areaStyle: {
            /*color: {
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
            }*/
        }
	}];
	let option = {
		title:{
			text:datas.groupName,
			textStyle:{
				color : "white",
				fontWeight:100,
				fontSize : 0.3 * rem,
				lineHeight : 0.68 * rem
			},
			bottom : 0.4 * rem,
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
				left: 2 * rem,
				top:1.7*rem,
				zlevel:100,
				z:2,
				style:{
					text: workStatus +'\n' + (datas.workCount + '/' + datas.memberCount),
					textAlign:'center',
					fill:'#7FCEF4',
					shadowColor:100,
					width:40,
					height:40,
					fontSize : 0.4 * rem
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
	        bottom : 0,
	        textStyle : {
	        	color : "#ccc",
	        	fontSize : 0.25 * rem,
	        }
	    },series: [{
	        type : 'pie',
	        radius : ["center", 1.8*rem],
	        center : ["center",2.20*rem],
	        avoidLabelOverlap: false,
	        label: {
	            normal: {
	                show: true,
	                position: 'inner',
	                formatter:'{d}%'
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
	console.log(datas.groupName)
	return option;
}


function setCanvas(datas, chartRootElem){
	let canvasBox = document.querySelector(".canvasBox");
	datas.group.forEach((item,index)=>{
		let echartContainer = createChartContainerElem(chartRootElem, 
			$('<div class="canvasItem"></div>'), [{'width': (1 / datas.group.length) * 100 + "%"}]);
		console.log(item);
		let option = initChartOptionObject(item);

		let myEchart = echarts.init(echartContainer.get(0));
		myEchart.setOption(option);
	});
}

function viewpagerVideo(urls, playElem){
    var vLen = urls.length; 
    var curr = 0; 

    playElem.on('ended', function(){
		play();
		console.log(urls[curr]);
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



//jQuery ready function start
$(function(){
	setLink($(".header_left img"));
	//
	currentDateObj = $('.timeText');
	timingDate();
	viewpagerVideo(urls, $('.map'));
	ajax(baseUrl).then(res => {
		//viewpagerVideo(urls, $('.map'));
		info(res.data);
		setCanvas(res.data, $('.canvasBox'));
	});
});	//jQuery ready end;
	

