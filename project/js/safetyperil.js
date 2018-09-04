$(function(){
    var container = $("#container");
    console.log(container.get(0));
    var myChart = echarts.init(container.get(0));
    var app = {};
    var dataColumn = ['隐患发现', '隐患排查'];  //图表数据项
    var xAxisItem =  ['00:00', '02:00','04:00','08:00','10:00','12:00','14:00',
        '16:00','18:00','20:00','22:00','24:00'];   //图表x轴区间及刻度名称
    var perilFindData = [32, 30,12, 13, 10, 34, 90, 23, 21, 90, 30, 21];    //隐患发现数据
    var perilCheckData = [12, 12, 11, 34, 90, 30, 10,20, 32, 11, 14, 9];    //隐患排查数据

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
                fontSize:30
            },
            padding:[5, 50]
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
                fontSize:30,
                align:'right',
                formatter: function (value, index) {            
                    //使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
                    return value+"点";
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
                fontSize:30
            },
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
});            //jquery ready function end;