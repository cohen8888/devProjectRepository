
//baseUrl = baseUrl + 'interf08';
baseUrl = baseUrl + '/api/sparepartsinformation';

let pageSize = 2;
let dataCatagorys = ['一班组', '二班组'];
let cacheTB1ListData = [];		//缓存列表数据
let cacheTB2ListData = [];		//缓存列表数据
let getDataTimeInterval = 10000;	//向后端获取数据时间间隔
let changeDataTimeInterval = 5000;	//数据切换时间间隔
let timeId = null;
let colors = ['#FDA878','#FCFE89','#9BFFD9','#A3E5FF'];
let colors1 = ['#F67324','#D8DA03','#1CD38C', '#00A1E7'];

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
		let obj = {};
		obj.name = item.type;
		obj.textStyle = {
			color:colors[index]
		}
		return obj;
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
					value:item.count - item.haveUse,
					name:"今日未使用",
					itemStyle:{
						color:colors[index]
					}
				},{
					value:item.haveUse,
					name:'今日使用',
					info:item.option,
					itemStyle:{
						color: colors1[index]
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
function sharepartsInfoList(tb, datas){
	tb.children().remove();
	let str1 = "";
	datas.slice(0, pageSize).forEach((item,index)=>{
			str1+="<tr>"
			str1+="<td>"+item.sparepartCode+"</td>";
			str1+="<td>"+item.sparepartName+"</td>";
			str1+="<td>"+item.currentInventory+"</td>";
			str1+="<td>"+item.todayReceive+"</td>";
			str1+="<td>"+item.group+"</td>";
			str1+="<td>"+item.purpose+"</td>";
			str1+="</tr>";
	});
	tb.html(str1);
}

function filterData(group, datas){
	let result = [];
	for(let i = 0, len = datas.length; i < len; i++){
		if(datas[i]['group'] == group){
			result.push(datas[i]);
		}
	}
	return result;
}


function getBackendData(chartRootElem){
	ajax(baseUrl).then(res => {
		cacheTB1ListData = filterData(dataCatagorys[0], res.data.dataList);
		cacheTB2ListData = filterData(dataCatagorys[1], res.data.dataList);
		sharepartsInfoList($(".tb1 tbody"), cacheTB1ListData);
		sharepartsInfoList($(".tb2 tbody"), cacheTB2ListData);
		sharepartsInfoChart(chartRootElem, res.data.dataChart);
		//清楚定时器
		clearInterval(timeId);	//
		//启动定时器
		timeId = setInterval(function(){
			//折线图随着后端数据获取来更新

			for(var i = 0; i < pageSize; i++){
				var elem1 = cacheTB1ListData.shift();
				var elem2 = cacheTB2ListData.shift();
				cacheTB1ListData.push(elem1);
				cacheTB2ListData.push(elem2);
			}
			sharepartsInfoList($(".tb1 tbody"), cacheTB1ListData);
			sharepartsInfoList($(".tb2 tbody"), cacheTB2ListData);
		},changeDataTimeInterval);
	});
}

//jQuery ready start
$(function(){

	setLink($(".header_left img"));
	currentDateObj = $('.timeText');
	timingDate();

	let chartRootElem = echarts.init($(".jrxcry_canvas1").get(0));

	getBackendData(chartRootElem);

	setInterval(function(){
		getBackendData(chartRootElem);
	},getDataTimeInterval);

}); //jQuery ready end;