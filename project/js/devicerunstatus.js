/**
* author : Cohen.Lee
* date : 2018-09-03
* 
*/


let baseUrl = "http://localhost:3000/api/";
let rem = document.documentElement.style.fontSize.substr(0,document.documentElement.style.fontSize.length-2)*1;

//计算设备类型数量
function calcCavnasData(data){
	let key = {};
	if (typeof data == 'object' && data instanceof Array){
		for(let i = 0; i < data.length;i++){
			if(data[i]['equipmentType'] in key){
				key[data[i]['equipmentType']]++;
			}else{
				key[data[i]['equipmentType']] = 1;
			}
		}
	}
	return key;
}

//计算图表x轴数据项及样式，传入通过calcCavnasData函数计算设备类型数量对象和x轴刻度样式
function calcCavansColumnStyle(categoryInfo, style){
	let result = [];
	for(item in categoryInfo){
		let elem = {}
		elem.value = item;
		elem.textStyle = style;
		result.push(elem);
	}
	return result;
}

//计算设备运行状态图的显示数据返回数组，传入x轴的数据项，和通过calcCavnasData函数计算设备类型数量对象
function calcCavansYData(xColumNameData, data){
	let result = [];
	for(let i = 0; i < xColumNameData.length;i++){
		result.push(data[xColumNameData[i]['value']]);
	}
	return result;
}

//设备类型下拉列表内容填充
function optEquipType(categoryInfo, equipmentTypeElem){
	for(category in categoryInfo){
		equipmentTypeElem.append('<option value="' + category + '" >'+ category +'</option>')
	}
}

function generateColumnarColor(lowRangeColor, HightRangeColor){
	return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			offset: 0,
			color: lowRangeColor
	}, {
			offset: 1,
			color: HightRangeColor
	}]);
}

//柱形图，的每根柱子的颜色
function columnarColor(params){
	//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组					
	var colorList = [
		generateColumnarColor('#D197C0','#F9F2C5'),
		generateColumnarColor('#CDFCF8','#F3DC9E'),
		generateColumnarColor('#A5B9EE','#EDBAEA'),
		generateColumnarColor('#EDA4F9','#F8C9C3'),
		generateColumnarColor('#EBE861','#F7BAE5'),
		generateColumnarColor('#FA5C4B','#F4C05C')
		];
	return colorList[params.dataIndex];
}

	  
$(function(){
	
	//从后端获取数据
	ajax(baseUrl,"devicerunstatus").then(res=>{
		let container = $("#container");
		let myChart = echarts.init(container.get(0));
		let app = {};
		let option = null;
		let categoryInfo = calcCavnasData(res.data);
		let xColumNameData = calcCavansColumnStyle(categoryInfo, {color: 'white'});
		let seriesData = calcCavansYData(xColumNameData, categoryInfo);	//柱状图数据，按顺序对应设备种类的名称
		optEquipType(categoryInfo, $('#equipmentTypeName'));
	    //柱状图的颜色
		

		//图形显示选项，必须是个对象
		option = {

			grid: {
				left: '10%',
				bottom:'8%',
				top:'5%'
			},
		    xAxis: {
		    	splitLine:{
			　　　　show:false
			　　},
		        type: 'category',
		        axisLabel: {	//y轴坐标字样式，rotate设置文字斜着显示
		          	interval:0,
	                rotate:45,
	                fontSize: 0.3 * rem
	            },
		        data: xColumNameData
		    },
		    yAxis: {
		        type: 'value',
		        axisLabel:{					//y轴坐标样式
		        	color:'white',
		        	fontSize:0.3*rem
		        },
				splitLine:{
			　　　　show:false
			　　}
		       
		    },
		    series: [{
		        data: seriesData,
		        type: 'bar',
				label:{			//标签为在柱状图上面显示的数字	
	        		normal:{
	        			show:true,
	        			position:'top',
	        			textStyle: {
				            color: 'white',
				            fontSize:0.4*rem
				         }
	        		}
	        	},
		        itemStyle: {
	        		normal:{
	        			color:columnarColor
	    			},
		            //鼠标悬停时：
		            emphasis: {
		                shadowBlur: 10,
		                shadowOffsetX: 0,
		                shadowColor: 'rgba(0, 0, 0, 0.5)'
		            }
				}
		    }]
	    	
		};


		let str1 = "";
		res.data.slice(0,16).forEach((item,index)=>{
				str1+="<tr>"
				str1+="<td>"+item.codeNum+"</td>";
				str1+="<td>"+item.equipmentName+"</td>";
				str1+="<td>"+item.equipmentType+"</td>";
				str1+="<td>"+item.equipmentCurrentStatus+"</td>";
				str1+="<td>"+item.lastStopDatetime+"</td>";				
				str1+="<td>"+item.thisRuntime+"</td>";
				str1+="<td>"+item.cumulativeRuntime+"</td>";
				str1+="</tr>";
		})
		$(".tb1 tbody").html(str1);
		if (option && typeof option === "object") {
		    myChart.setOption(option, true);
		}
	});
	
});	//jquery ready end;