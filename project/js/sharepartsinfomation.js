
//baseUrl = baseUrl + 'interf08';
baseUrl = baseUrl + '/api/sparepartsinformation';
currentDateObj = null;


function rgb(){
	return "rgb("+rand(255,0)+","+rand(255,0)+","+rand(255,0)+")";
}

function rand(max, min){
	return parseInt(Math.random()*(max-min+1))+min;
}


/**
* 备件信息图
*/
function sharepartsInfoChart(chartRootElem, datas){
	//图例数据
	let legendData = datas.map((item,index)=>{
		return item.type;
	});
	//图数据
	let seriesData = datas.map((item,index)=>{
		return {
			name:item.type,
			type:'pie',
			center: [(12.5+(index*25)+"%"), 2.45*rem],
			radius:[1.25*rem,1.8*rem],
			avoidLabelOverlap: false,
			label: {
				normal: {
					show: true,
					position: 'center',
					formatter:'库存\n\n'+item.count,
					fontSize: 0.3 * rem
				}
			},
			data:[
				{
					value:item.count-item.haveUse,
					name:"今日未使用",
					itemStyle:{
						color:rgb()
					}
				},{
					value:item.haveUse,
					name:'今日使用',
					info:item.option,
					itemStyle:{
						color: rgb()
					},
					label:{
						show:true,
						position:"outside",
						formatter:function(params){
							let str = "";
							str += params.name;
							str += "\n";
							str += params.value;
							str += "\n";
							str += params.data.info;
							return str;
						},
						fontStyle:0.1 * rem,
							
					},
					labelLine:{
						show:true,
						length:0.1*rem
					}
				}
			]
		}
	});
	let opt = {
		grid: {
			top :'middle',
			left: '5%',//距离div左边的距离
			right: '4%',//距离div右边的距离
			//bottom: '5%',//距离下面
			containLabel: true
		},
		legend: {
			orient: 'horizontal',
			itemGap:0.16*rem,
			itemWidth:0.2*rem,
			itemHeight:0.2*rem,
			icon:"circle",
			x:'center',
			data:legendData,
			bottom:0.2*rem,
			textStyle:{
				color:"#ccc",
				fontSize:0.25*rem,
			}
		},
		series: seriesData
	};
	chartRootElem.setOption(opt);
}


/**
* 备件信息列表
*/
function sharepartsInfoList(tb1, tb2, datas){
	tb1.children().remove();
	tb2.children().remove();
	let str1 = "";
	let str2 = "";
	datas.slice(0,10).forEach((item,index)=>{
		if(index<=4){
			str1+="<tr>"
			str1+="<td>"+item.workNum+"</td>";
			str1+="<td>"+item.workUser+"</td>";
			str1+="<td>"+item.group+"</td>";
			str1+="<td>"+item.workContent+"</td>";
			str1+="<td>"+item.purpose+"</td>";
			str1+="</tr>";
		}else{
			str2+="<tr>"
			str2+="<td>"+item.workNum+"</td>";
			str2+="<td>"+item.workUser+"</td>";
			str2+="<td>"+item.group+"</td>";
			str2+="<td>"+item.workContent+"</td>";
			str2+="<td>"+item.purpose+"</td>";
			str2+="</tr>";
		}
	});
	tb1.html(str1);
	tb2.html(str2);
}


//jQuery ready start
$(function(){

	setLink($(".header_left img"));
	currentDateObj = $('.timeText');
	timingDate();
	
	ajax(baseUrl).then(res => {
		sharepartsInfoList($(".tb1 tbody"), $(".tb2 tbody"), res.data.dataList);
		sharepartsInfoChart(echarts.init($(".jrxcry_canvas1").get(0)),res.data.dataChart);
	});


}); //jQuery ready end;