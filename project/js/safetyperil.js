baseUrl = baseUrl + "/api/";


$(function(){

	setLink($(".header_left dl"));

	currentDateObj = $('.timeText');
	timingDate();

    var container = $("#container");
    ajax(baseUrl,"safetyperll").then(res => {
    	let str1 = "";
    	res.data.slice(0,4).forEach((item,index)=>{
				str1+="<tr>"
				str1+="<td>"+item.potentialRisk+"</td>";
				str1+="<td>"+item.potentialRiskDate.split(" ")[1]+"</td>";
				str1+="<td>"+item.findUser+"</td>";
				str1+="<td>"+item.group+"</td>";
				str1+="<td>"+item.potentialRiskContent+"</td>";
				str1+="</tr>";
    	})
    	$(".tb1 tbody").html(str1);
    })
		ajax(baseUrl,"safeTyperRes").then(res=>{
			let str1 = "";
			res.data.slice(0,4).forEach((item,index)=>{
				str1+="<tr>"
				str1+="<td>"+item.potentialRisk+"</td>";
				str1+="<td>"+item.checkUser+"</td>";
				str1+="<td>"+item.finishDate.split(" ")[1]+"</td>";
				str1+="<td>"+item.group+"</td>";
				str1+="<td>"+item.status+"</td>";
				str1+="</tr>";
			})
			$(".tb2 tbody").html(str1);
		})
		ajax(baseUrl,"safeEcharts").then(res=>{
			var myChart = echarts.init(container.get(0));
			    var app = {};
			    var dataColumn = res.data[0].data.map((item,index)=>{return item.type});  //图表数据项
			    var xAxisItem =  res.data.map((item,index)=>{return item.time});   //图表x轴区间及刻度名称
			    var perilFindData = res.data.map((item,index)=>{return item.data[0].val});    //隐患发现数据
			    var perilCheckData = res.data.map((item,index)=>{return item.data[1].val});    //隐患排查数据

			    app.title = '安全隐患图';
			    option = null;
			    option = {
			        tooltip : {
			            trigger: 'axis',
			            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			            }
			        },
			        legend: {
			            data: dataColumn,
			            textStyle:{
			                color:'white',
			                fontSize:0.3*rem
			            },
			            padding:[5, 0.5*rem]
			        },
			        grid: {
			            left: '3%',
			            right: '4%',
			            bottom: '3%',
			            containLabel: true,
			            show:true               //显示图表边框
			        },
			        xAxis:  {
			            type: 'category',
			            splitLine:{
			                show:true,
			                lineStyle:{
			                    width:2,
			                    type:'dotted'  //'dotted'虚线 'solid'实线
			                }
			            },
			            axisLabel: {  //y轴坐标字样式，rotate设置文字斜着显示
			                interval:0,
			                rotate:50,
			                color:'white',
			                fontSize:0.3*rem,
			                align:'right',
			                formatter: function (value, index) {            
			                    //使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
			                    return value;
			                },
			            },
			            data : xAxisItem
			        },
			        yAxis: {
			            splitLine:{
			                show:true,
			                lineStyle:{
			                    width:2,
			                    type:'dotted'  //'dotted'虚线 'solid'实线
			                }
			            },
			            axisLabel:{
			                color:'white',
			                fontSize:0.3 * rem,
			                formatter: function (value, index) {            
			                    //使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
			                    return value + '天';
			                },
			            },
			            splitNumber:8,
			            type: 'value'
			        },
			        series: [
			            {
			                name: '隐患发现',
			                type: 'bar',
			                stack: '总量',
			                label: {
			                    normal: {
			                        show: true,
			                        position: 'insideTopRight'
			                    }
			                },
			                data : perilFindData
			            },
			            {
			                name: '隐患排查',
			                type: 'bar',
			                stack: '总量',
			                label: {
			                    normal: {
			                        show: true,
			                        position: 'insideRight'
			                    }
			                },
			                data : perilCheckData
			            }
			           
			        ]
			    };
			    if (option && typeof option === "object") {
			        myChart.setOption(option, true);
			    }
		})
    
});//jquery ready function end;