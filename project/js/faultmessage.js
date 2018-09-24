/**
* author : Cohen.Lee
* date : 2018-09-15
* 
*/
baseUrl = baseUrl + "/api/";

let colors = ['#D8DA03', '#1CD38D', '#00A1E8','#7FCDF6','#EB6976','#F57223'];	//饼形图的颜色

function genarateChart(chartRootElem, datas){

	let option = {
		title: {
			show:true,
	        text: '设备\n类型',
	        x:'center',
	        left: 'center',
	        top: 'middle',
	        textStyle:{
	        	fontSize:0.5 * rem,
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
		    radius : ['40%', '50%'],
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
		            	color:'white',
		            	width:2
		            },
		            length: 30,
		            length2: 50
		        }
		    },
		    data: generateAnnularChartData(datas)
		}]
	};

	if (option && typeof option === "object") {
	    chartRootElem.setOption(option, true);
	}
}



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

/**
* 生成环形图数据
*/
function generateAnnularChartData(data){
	var result = [];
	var key = {};
	for(var i = 0, len = data.length; i < len ; i++){
		if(data[i]['faultEquipment'] in key){
			key[data[i]['faultEquipment']]++;
		}else{
			key[data[i]['faultEquipment']] = 1;
		}
	}
	var j = 1;
	for (k in key){
		var obj = {};
		obj.value = key[k];
		obj.name = (j < 9 ? '0'+j: j) + k;
		obj.selected = true; 
		result.push(obj);
		j++;
	}
	return result;
}


$(function(){

	setLink($(".header_left img"));
	currentDateObj = $('.timeText');
	timingDate();

	//从后端获取数据
	ajax(baseUrl,"faultmessage").then(res => {
		let container = $("#canvasWrap");
		let myChart = echarts.init(container.get(0));
		genarateChart(myChart, res.data);
		//渲染表格数据
		generateTableData($('#faultinfotable'), res.data);
	});

});	//jquery ready end;