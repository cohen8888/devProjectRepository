/**
*  日常现场
*
*/

baseUrl = baseUrl + "/api/";
currentDateObj = null;

/**
* 渲染维修列表
* @rootElem 要渲染的容器
* @data 后端获取的数据
* @attrs 表格列名
*
*/
function renderTableData(rootElem, data, attrs){
	for(var i = 0, len = data.length; i < len; i++){
		var tr = $('<tr></tr>');
		for(var j = 0, aLen = attrs.length ; j < aLen ; j++){
			tr.append($('<td>'+ data[i][attrs[j]] + '</td>'));
		}
		rootElem.append(tr);
	}
}

/**
* 
*
*/
function viewpagerVideo(urls, playElem){
    var vLen = urls.length; 
    var curr = 0; 
    var video = $('.map');

    playElem.on('ended', function(){
		play();
	});  
     
    function play() {
    	console.log(playElem.get(0))
        playElem.get(0).src = urls[curr];
        playElem.get(0).load();   
        playElem.get(0).play();  
        curr++;
        if(curr >= vLen){  
            curr = 0; //重新循环播放
        }
    }  
    play();
}

//jQuery ready function start
$(function(){

	setLink($(".header_left img"));

	currentDateObj = $('.timeText');
	timingDate();

	$.get(baseUrl + "dailylive", (res) => {
		let data = JSON.parse(res).data;

		console.log(data)
		viewpagerVideo(data.mapUrls, $('.map'));

		renderTableData($('.section_left_top table') 
			,data.data.maintain.data
			,['workOrderCode'
			,'workStation'
			,'maintenanceContent'
			,'craft'
			,'maintenaceMan'
			,'group'
			,'maintenanceState'
			,'maintenanceDatetime'
		]);
		renderTableData($('.section_left_bottom table') 
			,data.data.fault.data
			,["faultNum"
			,"faultCode"
			,"faultDescription"
			,"reportDatetime"
			,"state"
			,"checkMan"
			,"group"
		]);
	});

});	//jQuery ready function end;



