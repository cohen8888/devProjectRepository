/**
* author : Cohen.Lee
* date : 2018-09-15
* 
*/
let baseUrl = "http://localhost:3000/api/";
let rem = document.documentElement.style.fontSize.substr(0,document.documentElement.style.fontSize.length - 2) * 1;
let colors = ['#D8DA03', '#1CD38D', '#00A1E8','#7FCDF6','#EB6976','#F57223'];	//饼形图的颜色
let option = null;
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
		//formatter: "{a} <br/>{b}: {c} ({d}%)" 
    },
	color:colors,
	series: [{	
	    name :'设备类型',
	    type :'pie',
	    radius : ['45%', '60%'],
	    avoidLabelOverlap : false,
	    selectedMode : 'multiple',	//选择类型，支持多选
	    markPoint : {
	    },
	    label : {
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
	    labelLine : {
	        normal : {
	            lineStyle : {
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
	}]
};

/**
* 生成表格数据
* @param rootElem 填充数据的根元素
* @param data 要填充到表格中的数据
*/
function generateTableData(rootElem, data){
	for(var i = 0, len = data.length ; i < len ; i++){
		let tr = $("<tr></tr>");
		tr.append('<td>' + data[i]['faultCode'] + '</td>')
		  .append('<td>' + data[i]['faultEquipment'] + '</td>')
		  .append('<td>' + data[i]['findDatetime'] + '</td>')
		  .append('<td>' + data[i]['currentEquipStatus'] + '</td>');
		rootElem.append(tr);
	}
}


$(function(){

	//从后端获取数据
	ajax(baseUrl,"faultmessage").then(res => {
		console.log(res.data);
		let container = $("#canvasWrap");
		let myChart = echarts.init(container.get(0));


		if (option && typeof option === "object") {
		    myChart.setOption(option, true);
		}

		//渲染表格数据
		generateTableData($('#faultinfotable'), res.data);

	});

});	//jquery ready end;