/**
* author : Cohen.Lee
* date : 2018-09-15
* 
*/

//baseUrl = baseUrl + "interf06";
baseUrl = baseUrl + "/api/faultmessage";

let colors = ['#D8DA03', '#1CD38D', '#00A1E8','#7FCDF6','#EB6976','#F57223'];	//饼形图的颜色
let cacheData = [];
let cacheAllData = [];
let pageSize = 14;

/**
* 生成图形
*/
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
	rootElem.children().remove();

	for(var i = 0, len = data.length > pageSize ? pageSize: data.length ; i < len ; i++){
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
	console.log(key)
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

function searchByCode(key, datas){
	let result = {};
	datas.forEach((elem, index) => {
		if (key == elem.faultCode){
			result = elem;
			break;
		}
	});
	return result;
}

//故障代码下拉列表内容填充
function codeSearchRootElem(codeResult, codeSearchElem){
	codeSearchElem.children().remove();
	codeSearchElem.append('<option value="故障代码" >故障代码</option>');

	for(var i = 0, len = codeResult.length; i < len; i++){
		codeSearchElem.append('<option value="' + codeResult[i] + '" >'+ codeResult[i] +'</option>')
	}
}


$(function(){

	setLink($(".header_left img"));
	currentDateObj = $('.timeText');
	timingDate();

	//从后端获取数据
	ajax(baseUrl).then(res => {
		res.data.forEach((elem, index) => {
			cacheData.push(elem.faultCode);
		});
		cacheAllData = res.data;
		codeSearchRootElem(cacheData, $("#codeSearch"));
		//故障代码搜索下拉列表
		$("#codeSearch").on('change',(event) => {
			let searchValue = event.target.value;
			if (!(searchValue == null || searchValue == '')){
				let d = [];
				if (searchValue == '故障代码'){
					d = cacheAllData;
				}else{
					let result = {};
					for(var i = 0,len = cacheAllData.length; i < len;  i++){
						if (searchValue == cacheAllData[i].faultCode){
							result = cacheAllData[i];
							break;
						}
					}
					d.push(result);
				}
				generateTableData($('#faultinfotable tbody'), d);
			}
		});
		$('#equipmentNameCode').on('keyup', (event) => {
			if (event.which == 13){
				let searchValue = event.target.value;
				let d = [];
				let result = {};
				for(var i = 0,len = cacheAllData.length; i < len;  i++){
					if (searchValue == cacheAllData[i].faultCode || searchValue == cacheAllData[i].faultEquipment){
						result = cacheAllData[i];
						d.push(result);
					}
				}
				generateTableData($('#faultinfotable tbody'), d);
			}
		})

		let container = $("#canvasWrap");
		let myChart = echarts.init(container.get(0));
		genarateChart(myChart, res.data);
		//渲染表格数据
		generateTableData($('#faultinfotable tbody'), res.data);
	});

});	//jquery ready end;