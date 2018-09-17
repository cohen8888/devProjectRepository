
baseUrl = baseUrl + '/api/';
currentDateObj = null;
let jrxcry_canvas = document.querySelector(".jrxcry_canvas1");
let myEchart = echarts.init(jrxcry_canvas);

function rgb(){
	return "rgb("+rand(255,0)+","+rand(255,0)+","+rand(255,0)+")";
}

function rand(max,min){
	return parseInt(Math.random()*(max-min+1))+min;
}


//jQuery ready start
$(function(){

	setLink($(".header_left dl"));

	currentDateObj = $('.timeText');
	timingDate();
	
	ajax(baseUrl,"sparepartsinformation").then(res=>{
		let str1 = "";
		let str2 = ""
		res.data.slice(0,10).forEach((item,index)=>{
			if(index<=4){
				str1+="<tr>"
				str1+="<td>"+item.workNum+"</td>";
				str1+="<td>"+item.workUser+"</td>";
				str1+="<td>"+item.group+"</td>";
				str1+="<td>"+item.workContent+"</td>";
				str1+="</tr>";
			}else{
				str2+="<tr>"
				str2+="<td>"+item.workNum+"</td>";
				str2+="<td>"+item.workUser+"</td>";
				str2+="<td>"+item.group+"</td>";
				str2+="<td>"+item.workContent+"</td>";
				str2+="</tr>";
			}
		})
		$(".tb1 tbody").html(str1);
		$(".tb2 tbody").html(str2);
	});


	ajax(baseUrl,"spareechart").then(res => {
		let legendData = res.data.map((item,index)=>{
			return item.type;
		});
		let seriesData = res.data.map((item,index)=>{
			return {
				name:item.type,
				type:'pie',
				center: [(12.5+(index*25)+"%"), 2.15*rem],
				radius:[1.25*rem,1.6*rem],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: true,
						position: 'center',
						formatter:'库存\n\n'+item.count
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
								console.log(params);
								let str = "";
								str += params.name;
								str += "\n";
								str += params.value;
								str += "\n";
								str += params.data.info;
								return str;
							},
						},
						labelLine:{
							show:true,
							length:30
							
						}
					}
				]
			}
		})
		let dataLabel = {
			show:true,
			position:"outside"
		}
		let opt = {
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
		myEchart.setOption(opt);
	});

}); //jQuery ready end;