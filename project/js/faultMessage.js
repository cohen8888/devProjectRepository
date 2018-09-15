
$(function(){
	var container = $("#canvasWrap");
	var myChart = echarts.init(container.get(0));
	var app = {};
	var option = null;
	var colors = ['#D8DA03', '#1CD38D', '#00A1E8','#7FCDF6','#EB6976','#F57223'];

	option = {
		title: {
			show:true,
	        text: '设备\n类型',
	        left: 'center',
	        top: 'middle',
	        textStyle:{
	        	fontSize:'40',
	        	fontWeight:'bold',
	        	color:'#A4B4EC',
	        },
	    },
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} <br/>{b}: {c} " 
//	        formatter: "{a} <br/>{b}: {c} ({d}%)" 
	    },
	    color:colors,
	    series: [
	        {	
	        	
	            name:'设备类型',
	            type:'pie',
	            radius: ['45%', '60%'],
	            avoidLabelOverlap: false,
	            selectedMode:'multiple',//选择类型，支持多选
	            markPoint:{
	            	
	            },
	            label: {
	                normal: {
	                    show: true,
	                    position: 'outside',
	                    textStyle: {
	                        fontSize:'25'
	                    }
	                },
	                emphasis: {
	                    show: true,
	                    textStyle: {
	                        fontWeight: 'bold'
	                    }
	                }
	            },
	            
	            labelLine: {
	                normal: {
	                    lineStyle: {
	                        // color: 'rgba(0, 0, 0, 0.3)'
	                    },
	                    smooth: 0.2,
	                    length: 20,
	                    length2: 50
	                }
	            },
	            
	            data:[
	                {value:100, name:'01机电设备',selected:true},
	                {value:100, name:'02照明设备',selected:true},
	                {value:100, name:'03排水设备',selected:true},
	                {value:100, name:'04风机设备',selected:true},
	                {value:100, name:'05监测设备',selected:true},
	                {value:100, name:'06安防设备',selected:true}
	            ]
	        }
	    ]
	};
	if (option && typeof option === "object") {
	    myChart.setOption(option, true);
	}
});	//jquery ready end;